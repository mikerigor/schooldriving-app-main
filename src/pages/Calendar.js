import React, {
  useEffect,
  Fragment,
  useContext
} from 'react'

import ApiCalendar from 'react-google-calendar-api';

import SchedulerTable from '../components/Scheduler/Scheduler'
import Layout from '../components/Layout/Layout';
import config from '../utility/api';

import { CalendarContext } from '../context/CalendarContext';
import { IsArrayEmpty } from '../utility/ToolFct';

export default function Calendar() {
  // Context
  const { calendarEvents, getAllEvents } = useContext(CalendarContext)

  useEffect(() => {
  });

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
  return (
    <Fragment>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="card">
                <div className="card-title pr">
                  <h4>All Appointments</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table student-data-table m-t-20" style={{ maxHeight: 150 }}>
                      <thead>
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
                                <tr>
                                  <td>
                                    {statusIcon(val.apiData.status)}
                                  </td>
                                  <td><div className="text-ellipsis" style={{ width: 100 }}>{val.apiData.title}</div></td>
                                  <td>{val.apiData.date}</td>
                                </tr>
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
            </div>
            <div className="col-lg-9">
              <div className="card">
                <div className="legendCenter">
                  <ul className="legend">
                    <li>
                      <span className="open" />
                      Open
                    </li>
                    <li>
                      <span className="Progress" />
                      In Progress
                    </li>
                    <li>
                      <span className="Cancelled" />
                      Cancelled
                    </li>
                    <li>
                      <span className="Confirmed" />
                      Confirmed
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <SchedulerTable
                    schedulerData={calendarEvents}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  )
}
