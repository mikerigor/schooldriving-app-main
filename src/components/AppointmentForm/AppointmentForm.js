import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useContext,
  createRef
} from 'react'

import PropTypes from 'prop-types';
import ApiCalendar from 'react-google-calendar-api';
import DatePicker from 'react-datepicker'

import config from '../../utility/api';
import AppointmentDM from '../../utility/dataModel/AppointmentDM';
import {
  addDays,
  formatDateYYYYMMDD,
  IsEmpty,
  removeKeyFromObject,
  validateFields
} from '../../utility/ToolFct';

import { CalendarContext } from '../../context/CalendarContext';
import Notification from '../Notification/Notification';
import { AuthContext } from '../../context/AuthContext';
import { getDetailsByGmail, getUserListByType } from '../../utility/FetchFct';

const formatedDate = formatDateYYYYMMDD(new Date())

function AppointmentForm(props, ref) {
  const [instructors, setInstructors] = useState([])
  const [fields, setFields] = useState();
  const { selectedDate, formData, isVisbleFunction } = props
  const { getAllEvents } = useContext(CalendarContext)
  const notification = useRef(null);
  const appointmentFormREF = useRef();

  useEffect(() => {
    setFields({
      ...formData,
      date: selectedDate
    })

    getAllInstructors()
  }, [formData, selectedDate])

  useImperativeHandle((ref), () => ({
    upsertFromParents(res) {
      if (ApiCalendar.sign) {
        res === 'edit' ? submitForm() : deleteForm()
      } else {
        ApiCalendar.handleAuthClick()
      }
    }
  }))

  const getAllInstructors = async () => {
    const instructorsLists = await getUserListByType('Instructor')
    setInstructors(instructorsLists)
  }

  const filterPassedTime = (time) => {
    const currentDate = new Date(`${formatedDate} ${fields.startTime}`);
    const endDate = new Date(time);

    return currentDate.getTime() < endDate.getTime();
  };

  const deleteForm = () => {
    const { _id, googleCalendarId } = fields

    if (!IsEmpty(_id) && !IsEmpty(googleCalendarId)) {
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };

      ApiCalendar
        .deleteEvent(googleCalendarId)
        .then(() => {
          notification.current.success('Delete from Google calendar')
          fetch(`${config.api}appointments/${_id}`, requestOptions)
            .then((response) => response.text())
            .then(() => {
              notification.current.success('Delete from Api')
              getAllEvents()
              isVisbleFunction()
            })
            .catch((error) => console.log('error', error));
        });
    }
  }

  const submitForm = async () => {
    const {
      _id,
    } = fields

    const div = appointmentFormREF.current
    if (!validateFields(div)) {
      return false
    }

    let method = 'POST'
    let url = `${config.api}appointments/`;

    if (!IsEmpty(_id)) {
      method = 'PUT'
      url = `${config.api}appointments/${_id}`
    }
    const googleData = ApiCalendar.getBasicUserProfile()

    const appointMentModel = new AppointmentDM()

    appointMentModel.readFromObj(fields)

    const getDetails = await getDetailsByGmail(appointMentModel.instructor)

    appointMentModel.googleEmail = googleData.getEmail()
    appointMentModel.userId = googleData.getName()

    removeKeyFromObject(appointMentModel, ['_id', 'createdAt'])
    const startDateTime = new Date(`${appointMentModel.date} ${appointMentModel.startTime}`).toISOString();
    const endDateTime = new Date(`${appointMentModel.date} ${appointMentModel.endTime}`).toISOString();

    const eventToGoogle = {
      summary: appointMentModel.title,
      start: {
        dateTime: new Date(startDateTime).toISOString(),
      },
      end: {
        dateTime: new Date(endDateTime).toISOString()
      }
    };

    if (method === 'POST') {
      ApiCalendar.createEvent(eventToGoogle)
        .then((googleRes) => {
          const { result } = googleRes
          const raw = JSON.stringify({
            ...appointMentModel,
            googleCalendarId: result.id
          });
          upsertForm(url, raw, method)
        })
        .catch((error) => {
          notification.current.error(error.result.error.message)
        });
    } else {
      ApiCalendar.updateEvent(eventToGoogle, appointMentModel.googleCalendarId)
        .then((googleRes) => {
          notification.current.success('Update Data to Google calendar')
          const raw = JSON.stringify({
            ...appointMentModel,
          });
          upsertForm(url, raw, method)
        }).catch((error) => {
          notification.current.error(error.result.error.message)
        });
    }

    return true
  }

  const upsertForm = (url, raw, method) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method,
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((res) => {
        // window.location.reload()
        getAllEvents()
        isVisbleFunction()
      })
      .catch((error) => console.log('error', error));
  }

  const timerPickerChange = (e, key) => {
    let getPickerHours = new Date(e).getHours()
    let getPickerMinutes = new Date(e).getMinutes()

    if (getPickerHours < 10) {
      getPickerHours = `0${getPickerHours}`
    }

    if (getPickerMinutes < 10) {
      getPickerMinutes = `0${getPickerMinutes}`
    }

    const HHMM = `${getPickerHours}:${getPickerMinutes}`
    setFields({
      ...fields,
      [key]: HHMM
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'endTime') {
      const startTime = parseInt(fields.startTime.replace(/:/g, ''), 10)
      const endTime = parseInt(value.replace(/:/g, ''), 10)
      if (startTime > endTime) {
        alert('Please select another time.')
      } else {
        setFields({
          ...fields,
          [name]: value
        })
      }
    } else {
      setFields({
        ...fields,
        [name]: value
      })
    }
  }

  return (
    <form
      ref={appointmentFormREF}
    >
      <div className="row">
        <div className="twelve column">
          <h4>Appointment Form</h4>
        </div>
        <Notification ref={notification} />
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>
            Title
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="text"
            name="title"
            defaultValue={formData.title}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>
            Date
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className="u-full-width"
            type="date"
            name="date"
            disabled
            defaultValue={selectedDate}
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>
            Start Time
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <DatePicker
            className="u-full-width"
            selected={!IsEmpty(fields) && (!IsEmpty(fields.startTime) && new Date(`${formatedDate} ${fields.startTime}`))}
            placeholderText="---"
            showTimeSelect
            showTimeSelectOnly
            onChange={(e) => timerPickerChange(e, 'startTime')}
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm  aa"
          />
        </div>
        <div className="six columns">
          <label>
            PU Time
          </label>
          <DatePicker
            className="u-full-width"
            selected={!IsEmpty(fields) && (!IsEmpty(fields.puTime) && new Date(`${formatedDate} ${fields.puTime}`))}
            placeholderText="---"
            showTimeSelect
            showTimeSelectOnly
            onChange={(e) => timerPickerChange(e, 'puTime')}
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm  aa"
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>
            End Time
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <DatePicker
            className="u-full-width"
            selected={!IsEmpty(fields) && (!IsEmpty(fields.endTime) && new Date(`${formatedDate} ${fields.endTime}`))}
            placeholderText="---"
            showTimeSelect
            showTimeSelectOnly
            onChange={(e) => timerPickerChange(e, 'endTime')}
            filterTime={filterPassedTime}
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm  aa"
          />
        </div>
        <div className="six columns">
          <label>
            DO Time
          </label>
          <DatePicker
            className="u-full-width"
            selected={!IsEmpty(fields) && (!IsEmpty(fields.doTime) && new Date(`${formatedDate} ${fields.doTime}`))}
            placeholderText="---"
            showTimeSelect
            showTimeSelectOnly
            onChange={(e) => timerPickerChange(e, 'doTime')}
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm  aa"
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>
            Driver
          </label>
          <input
            className="u-full-width"
            type="text"
            name="driver"
            defaultValue={formData.driver}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="six columns">
          <label>
            Type
          </label>
          <input
            className="u-full-width"
            type="text"
            name="type"
            defaultValue={formData.type}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>
            PU Location
          </label>
          <input
            className="u-full-width"
            type="text"
            name="puLocation"
            defaultValue={formData.puLocation}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="six columns">
          <label>
            Instructor
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            className="u-full-width"
            name="instructor"
            defaultValue={formData.instructor}
            onChange={(e) => handleChange(e)}
            required
          >
            <option disabled selected value="">---</option>
            {
              !IsEmpty(instructors)
              && instructors.map((val, key) => {
                return (
                  <option value={`${val.firstName} ${val.lastName}`}>
                    {val.firstName}
                    {' '}
                    {val.lastName}
                  </option>
                )
              })
            }
          </select>
        {/* s */}
        </div>
      </div>

      <div className="row">
        <div className="six columns">
          <label>
            Vehicle
          </label>
          <input
            className="u-full-width"
            type="text"
            name="vehicle"
            defaultValue={formData.vehicle}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="six columns">
          <label>
            Status
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </label>

          <select
            className="u-full-width"
            name="status"
            defaultValue={formData.status}
            onChange={(e) => handleChange(e)}
            required
          >
            <option disabled selected value="">---</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Confirmed">Confirmed</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label> Instruction 1 </label>
          <input
            className="u-full-width"
            type="text"
            name="instrunctionOne"
            defaultValue={formData.instrunctionOne}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>Instruction 2</label>
          <input
            className="u-full-width"
            type="text"
            name="instructionTwo"
            defaultValue={formData.instructionTwo}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <label>Notes</label>
          <textarea
            className="u-full-width"
            name="notes"
            defaultValue={formData.notes}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      {/*
      <input
        className="button-primary"
        type="button"
        value="Submit"
        onClick={() => submitForm()}
        /> */}
    </form>
  )
}

AppointmentForm.defaultProps = {
  selectedDate: '',
  formData: {},
  isVisbleFunction: ''
}

AppointmentForm.propTypes = {
  selectedDate: PropTypes.string,
  formData: PropTypes.objectOf(PropTypes.string),
  isVisbleFunction: PropTypes.func
};

export default forwardRef(AppointmentForm)
