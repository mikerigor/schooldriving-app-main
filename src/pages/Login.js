import React, {
  useContext,
  useState,
  Fragment,
  useEffect,
  useRef
} from 'react'
import PropTypes from 'prop-types';
import ApiCalendar from 'react-google-calendar-api';
import { withRouter } from 'react-router-dom';
import logo from '../assets/images/google-icon.png'

import config from '../utility/api';
import UserDM from '../utility/dataModel/UserDm';
import { IsArrayEmpty, IsEmpty, validateFields } from '../utility/ToolFct';
import { AuthContext } from '../context/AuthContext';
import { CalendarContext } from '../context/CalendarContext';
import { getDetailsByGmail, registerUser } from '../utility/FetchFct';

import Modal from '../components/Modal/Modal';

function Login(props) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    profileImage: '',
    type: ''
  })
  const [moveToCalendar, setMoveToCalendar] = useState(false);
  const { history } = props
  const { getAllEvents } = useContext(CalendarContext)
  const ModalREF = useRef();

  useEffect(() => {
    ApiCalendar.onLoad(() => {
      ApiCalendar.listenSign(loginGoogleEvent);
      // loginGoogleEvent()
    });
  })

  const submitForm = async () => {
    const register = await registerUser(userInfo)
    if (!IsEmpty(register.isActive)) {
      getAllEvents()
      history.push('/calendar');
    } else {
      alert('Something went wrong.')
    }
  }

  const loginGoogleEvent = async () => {
    const response = await ApiCalendar.getBasicUserProfile()
    if (!IsEmpty(response)) {
      const gmail = response.getEmail();
      const getDetails = await getDetailsByGmail(gmail)

      if (!IsEmpty(getDetails.isActive)) {
        getAllEvents()
        history.push('/calendar');
      } else {
        setUserInfo({
          email: response.getEmail(),
          firstName: response.getGivenName(),
          lastName: response.getFamilyName(),
          profileImage: response.getImageUrl(),
          type: ''
        })
        ModalREF.current.toggleFromParent()
      }
    } else {
      console.log('error')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  return (
    <Fragment>
      <div className="container">
        <div className="twelve columns">
          <form className="loginForm">
            <div className="form">
              <div className="row">
                <div className="twelve column">
                  <img className="google-logo" src={(logo)} alt="google-logo" />
                  <h4>Login</h4>
                  <p>Use your Google Account</p>
                </div>
                <div className="twelve column">
                  <button
                    className="button-danger loginBtn"
                    type="button"
                    onClick={(e) => {
                      ApiCalendar.handleAuthClick();
                      setMoveToCalendar(true)
                      loginGoogleEvent()
                    }}
                  >
                    {moveToCalendar ? '' : 'Sign in to Google'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal ref={ModalREF} hideButton>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h5>We see you are new to the app we will be creating your Profile</h5>

              <select
                className="u-full-width"
                name="type"
                required
                onChange={(e) => handleChange(e)}
              >
                <option disabled selected value="">Please select your role</option>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
              </select>

              <input
                className="button-primary"
                type="button"
                value="Register"
                onClick={() => submitForm()}
              />
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

Login.defaultProps = {
  history: {}
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string),
};

export default withRouter(Login)
