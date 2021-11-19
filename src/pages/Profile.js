import React, { useEffect, useContext, useState } from 'react'
import ApiCalendar from 'react-google-calendar-api'
import { Tabs } from 'antd';
import {
  LocationOn,
  Email,
  CenterFocusStrong,
  ExitToApp
} from '@material-ui/icons';
import Layout from '../components/Layout/Layout'
import { CalendarContext } from '../context/CalendarContext'
import config from '../utility/api'
import { IsArrayEmpty, IsEmpty } from '../utility/ToolFct'

export default function Profile() {
  const [studentAppointments, setStudentAppointments] = useState()
  const { userInfo, calendarEvents } = useContext(CalendarContext)

  useEffect(() => {
    fetch(`${config.api}appointments`)
      .then((response) => response.json())
      .then((result) => {
        setStudentAppointments(result)
      })
   })

  const statusIcon = (status) => {
    let classColor;
    switch (status) {
      case 'Open':
        classColor = 'open';
        break;
      case 'In Progress':
        classColor = 'Progress';
        break;
      case 'Cancelled':
        classColor = 'Cancelled';
        break;
      case 'Confirmed':
        classColor = 'Confirmed';
        break;
      default:
        classColor = 'pink'
    }

    return (
      <div
        className={classColor}
        style={{
          background: classColor,
          color: '#fff',
          textAlign: 'center',
          fontSize: 11,
          width: 65,
        }}
      >
        {status}
      </div>
    )
  }

  const deactivateAccount = () => {
    localStorage.clear()
    ApiCalendar.handleSignoutClick()
    window.location.href = '/'
  }
    const { TabPane } = Tabs;

    function callback(key) {
    }

  const deleteForm = (id, googleCalendarId) => {
    // if (!IsEmpty(id) && !IsEmpty(googleCalendarId)) {
    //   const requestOptions = {
    //     method: 'DELETE',
    //     redirect: 'follow'
    //   };

    //   ApiCalendar
    //     .deleteEvent(googleCalendarId)
    //     .then(() => {
    //       fetch(`${config.api}appointments/${id}`, requestOptions)
    //         .then((response) => response.text())
    //         .then(() => {

    //         })
    //         .catch((error) => {

    //         });
    //     }).catch(() => {

    //     });
    // }
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <div className="user-profile text-center">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="user-photo m-b-30">
                        <img
                          className="img-fluid"
                          style={{ width: 150 }}
                          src={`${!IsEmpty(userInfo) && userInfo.userImg}`}
                          alt=""
                        />
                      </div>
                      <div className="user-profile-name">{!IsEmpty(userInfo) && userInfo.userName}</div>
                      <div className="user-job-title">{!IsEmpty(userInfo) && userInfo.userType}</div>
                      <div className="user-job-title">{!IsEmpty(userInfo) && userInfo.userEmail}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <Tabs onChange={callback} type="card">
              <TabPane tab="Open" key="1">
              <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table student-data-table m-t-20" style={{ maxHeight: 150 }}>
                        <thead>
                          <h2 className="titleTableOpen">Open</h2>
                          <tr>
                            <th>Status</th>
                            <th>Title</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            !IsArrayEmpty(calendarEvents)
                              ? calendarEvents.map((val) => {
                                return (
                                  val.apiData.status === 'Open'
                                    ? (
                                      <tr>
                                        <td>
                                          {statusIcon(val.apiData.status)}
                                        </td>
                                        <td><div className="text-ellipsis" style={{ width: 100 }}>{val.apiData.title}</div></td>
                                        <td>{val.apiData.date}</td>
                                      </tr>
                                    ) : ''
                                )
                              }) : (
                                <tr>
                                  <td className="text-center" colSpan={2}>No data available.</td>
                                </tr>
                              )
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>
              </TabPane>
              <TabPane tab="In Progress" key="2">
              <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table student-data-table m-t-20" style={{ maxHeight: 150 }}>
                        <thead>
                          <h2 className="titleTableInProgress">In Progress</h2>
                          <tr>
                            <th>Status</th>
                            <th>Title</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            !IsArrayEmpty(calendarEvents)
                              ? calendarEvents.map((val) => {
                                return (
                                  val.apiData.status === 'In Progress'
                                    ? (
                                      <tr>
                                        <td>
                                          {statusIcon(val.apiData.status)}
                                        </td>
                                        <td><div className="text-ellipsis" style={{ width: 100 }}>{val.apiData.title}</div></td>
                                        <td>{val.apiData.date}</td>
                                      </tr>
                                    ) : ''
                                )
                              }) : (
                                <tr>
                                  <td className="text-center" colSpan={2}>No data available.</td>
                                </tr>
                              )
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>
              </TabPane>
              <TabPane tab="Cancelled" key="3">
              <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table student-data-table m-t-20" style={{ maxHeight: 150 }}>
                        <thead>
                          <h2 className="titleTableCancelled">Cancelled</h2>
                          <tr>
                            <th>Status</th>
                            <th>Title</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            !IsArrayEmpty(calendarEvents)
                              ? calendarEvents.map((val) => {
                                return (
                                  val.apiData.status === 'Cancelled'
                                    ? (
                                      <tr>
                                        <td>
                                          {statusIcon(val.apiData.status)}
                                        </td>
                                        <td><div className="text-ellipsis" style={{ width: 100 }}>{val.apiData.title}</div></td>
                                        <td>{val.apiData.date}</td>
                                      </tr>
                                    ) : ''
                                )
                              }) : (
                                <tr>
                                  <td className="text-center" colSpan={2}>No data available.</td>
                                </tr>
                              )
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>
              </TabPane>
              <TabPane tab="Confirmed" key="4">
              <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table student-data-table m-t-20" style={{ maxHeight: 150 }}>
                        <thead>
                          <h2 className="titleTableConfirmed">Confirmed</h2>
                          <tr>
                            <th>Status</th>
                            <th>Title</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            !IsArrayEmpty(calendarEvents)
                              ? calendarEvents.map((val) => {
                                return (
                                  val.apiData.status === 'Confirmed'
                                    ? (
                                      <tr>
                                        <td>
                                          {statusIcon(val.apiData.status)}
                                        </td>
                                        <td><div className="text-ellipsis" style={{ width: 100 }}>{val.apiData.title}</div></td>
                                        <td>{val.apiData.date}</td>
                                      </tr>
                                    ) : ''
                                )
                              }) : (
                                <tr>
                                  <td className="text-center" colSpan={2}>No data available.</td>
                                </tr>
                              )
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>
              </TabPane>
              <TabPane tab="Students Appointments" key="5">
              <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table student-data-table m-t-20" style={{ maxHeight: 150 }}>
                        <thead>
                          <h2 className="titleTableStudents">Students Appointments</h2>
                          <tr>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            !IsArrayEmpty(studentAppointments)
                              ? studentAppointments.map((val) => {
                                return (
                                  val.instructor === 'Emman Agan'
                                   ? (
                                  <tr>
                                    <td>
                                      {statusIcon(val.status)}
                                    </td>
                                    <td><div className="text-ellipsis" style={{ width: 100 }}>{val.userId}</div></td>
                                    <td>{val.date}</td>
                                  </tr>
                                ) : ''
                                 )
                              }) : (
                                <tr>
                                  <td className="text-center" colSpan={2}>No data available.</td>
                                </tr>
                              )
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>
              </TabPane>
            </Tabs>
          </div>

        </div>
      </div>
    </Layout>
  )
}
