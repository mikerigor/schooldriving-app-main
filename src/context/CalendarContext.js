import React, {
  useState,
  createContext,
  useEffect
} from 'react';
import ApiCalendar from 'react-google-calendar-api';
import PropTypes from 'prop-types';
import config from '../utility/api';
import { IsEmpty } from '../utility/ToolFct';

export const CalendarContext = createContext();

const CalendarProvider = (props) => {
  const [calendarEvents, setCalendarEvents] = useState()
  const [userInfo, setUserInfo] = useState({
  userName: '',
  userImg: '',
  userEmail: '',
  })
  const { children } = props

  useEffect(() => {
    ApiCalendar.onLoad(() => {
      getUserInfo()
      ApiCalendar.listenSign(getUserInfo);
      getAllEvents()
    });
  }, []);

  const getUserInfo = () => {
    const response = ApiCalendar.getBasicUserProfile()
    if (!IsEmpty(response)) {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({ email: 'emmanagan1995@gmail.com' });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${config.api}users/profile`, requestOptions)
        .then((response1) => response1.text())
        .then((result) => {
          const res = JSON.parse(result)
          setUserInfo({
            userName: response.getName(),
            userImg: response.getImageUrl(),
            userEmail: response.getEmail(),
            userType: res.type,
          })
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  const getAllEvents = (email) => {
    const googleData = ApiCalendar.getBasicUserProfile()

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      googleEmail: googleData.getEmail()
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${config.api}appointments/gmail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const dataArray = []
        result.map((val, key) => {
          const {
            title,
            date,
            startTime,
            endTime
          } = val
          const startDate = new Date(`${date} ${startTime}`).toISOString()
          const endDate = new Date(`${date} ${endTime}`).toISOString()

          dataArray.push({
            apiData: val,
            title,
            startDate,
            endDate
          })
        })

        setCalendarEvents(dataArray)
      })
      .catch((error) => console.log('error', error));
  }

  const payload = {
    calendarEvents,
    getAllEvents,
    getUserInfo,
    userInfo
  };

  return <CalendarContext.Provider value={payload}>{children}</CalendarContext.Provider>;
};

CalendarProvider.defaultProps = {};

CalendarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CalendarProvider;
