import React, {
  useEffect,
  useState,
  Fragment,
  useContext,
  useRef
} from 'react';
import { Link, NavLink } from 'react-router-dom';
import ApiCalendar from 'react-google-calendar-api';
import PropTypes from 'prop-types';

import './sidebar.style.scss'
import { IsEmpty } from '../../utility/ToolFct';
import { CalendarContext } from '../../context/CalendarContext';

export default function Sidebar(props) {
  const { userInfo } = useContext(CalendarContext)
  const activeStyle = {
    background: 'linear-gradient(to right, #5772FE , #6D85FB)',
    color: '#fff'
  }
  const sidebarREF = useRef();

  useEffect(() => {
    // console.log(userInfo)
  })

  const toggleSideBar = () => {
    if (window.innerWidth < 679) {
      const sidebar = sidebarREF.current
      sidebar.style.display = 'block'
    }
  }

  const closeSidebar = () => {
    if (window.innerWidth < 679) {
      const sidebar = sidebarREF.current
      sidebar.style.display = 'none'
    }
  }

  const logout = () => {
    localStorage.clear()
    ApiCalendar.handleSignoutClick()
    window.location.href = '/'
  }

  return (
    <Fragment>
      <div
        ref={sidebarREF}
        className="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures"
      >
        <button
          className="sidebar-close-btn"
          type="button"
          onClick={() => closeSidebar()}
        >
          X
        </button>

        <div className="nano">
          <div className="nano-content">
            <ul>
              <div className="logo">
                <a href="index.html">
                  <img src="assets/images/logo.png" alt="" />
                  <span>SCHOOL</span>
                </a>
              </div>
              <li>
                <NavLink to="/calendar" className="sidebar-sub-toggle" activeStyle={activeStyle}>
                  <i className="ti-home" />
                  Calendar
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="sidebar-sub-toggle" activeStyle={activeStyle}>
                  <i className="ti-home" />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/user" className="sidebar-sub-toggle" activeStyle={activeStyle}>
                  <i className="ti-home" />
                  User
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="sidebar-sub-toggle" activeStyle={activeStyle}>
                  <i className="ti-home" />
                  Settings
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className="sidebar-sub-toggle"
                  style={{
                    border: 0,
                    color: '#fff'
                  }}
                  onClick={(e) => { logout() }}
                >
                  <i className="ti-home" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="float-left">
                <button
                  className="hamburger sidebar-toggle"
                  onClick={() => toggleSideBar()}
                  type="button"
                >
                  <span className="line" />
                  <span className="line" />
                  <span className="line" />
                </button>
              </div>
              <div className="float-right">
                <div className="dropdown dib">
                  <div className="header-icon" data-toggle="dropdown">
                    {
                      !IsEmpty(userInfo.userName)
                      && (
                        <span className="user-avatar">
                          <img
                            alt="profile"
                            src={`${!IsEmpty(userInfo) && userInfo.userImg}`}
                            style={{ width: 30, height: 30, borderRadius: 30 }}
                          />
                          {' '}
                          {!IsEmpty(userInfo) && userInfo.userName}
                          <i className="ti-angle-down f-s-10" />
                        </span>
                      )
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

// Sidebar.propTypes = {
//   schedulerData: PropTypes.arrayOf(PropTypes.object),
// };

// Sidebar.defaultProps = {
//   schedulerData: []
// }
