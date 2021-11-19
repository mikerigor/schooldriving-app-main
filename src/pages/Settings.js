import React, { useEffect, useContext } from 'react'
import ApiCalendar from 'react-google-calendar-api'
import Layout from '../components/Layout/Layout'
import { CalendarContext } from '../context/CalendarContext'
import config from '../utility/api'
import { IsEmpty } from '../utility/ToolFct'

export default function Settings() {
  const { userInfo, calendarEvents } = useContext(CalendarContext)

  useEffect(() => {
    console.log(userInfo)

    const promise1 = new Promise((resolve, reject) => {
      resolve(1);
    });

    const promise2 = new Promise((resolve, reject) => {
      resolve(2);
    });

    const promise3 = new Promise((resolve, reject) => {
      resolve(3);
    });

    Promise.all([promise1, promise2, promise3]).then((values) => {
      console.log(values)
    })
  })

  const deactivateAccount = () => {
    localStorage.clear()
    ApiCalendar.handleSignoutClick()
    window.location.href = '/'
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
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="basic-form">
                  <form>
                    <div className="form-group">
                      <label>Gmail Account</label>
                      <input type="email" className="form-control" value={userInfo.userEmail} disabled />
                    </div>
                    <button type="button" className="btn btn-default" onClick={deactivateAccount}>Deactivate</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
