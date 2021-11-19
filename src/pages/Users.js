import React, {
  useState,
  useEffect,
} from 'react'

import Layout from '../components/Layout/Layout'
import Modal from '../components/Modal/Modal'
import config from '../utility/api'
import { getUserListByType } from '../utility/FetchFct'
import { IsEmpty } from '../utility/ToolFct'

export default function Users() {
  const [user, setUsers] = useState([])
  const [instructors, setInstructors] = useState([])
  const [students, setStudents] = useState([])
  const [fields, setFields] = useState();

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const getInstructors = await getUserListByType('Instructor')
    const getStudents = await getUserListByType('Student')

    setInstructors(getInstructors)
    setStudents(getStudents)
  }

  const upsertUser = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(fields);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${config.api}users/register`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result)

        if (!IsEmpty(res.error)) {
          alert(res.error)
        } else {
          setFields([])
          fetchUsers()
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields({
      ...fields,
      [name]: value
    })
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <Modal buttonText="Add User">
              <div className="row">
                <div className="col-lg-6">
                  <label>First Name</label>
                  <input
                    className="u-full-width"
                    type="text"
                    name="firstName"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-lg-6">
                  <label>Last Name</label>
                  <input
                    className="u-full-width"
                    type="text"
                    name="lastName"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-lg-6">
                  <label>Type</label>
                  <select
                    className="u-full-width"
                    name="type"
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                    <option value="driver">Driver</option>
                  </select>
                </div>
                <div className="col-lg-12">
                  <label>Email</label>
                  <input
                    className="u-full-width"
                    type="text"
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-lg-12">
                  <label>Password</label>
                  <input
                    className="u-full-width"
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <input
                  className="button-primary"
                  type="button"
                  value="Add User"
                  onClick={(e) => upsertUser()}
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-title pr">
                <h4>Instructors</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table student-data-table m-t-20">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !IsEmpty(instructors)
                        && instructors.map((val, key) => {
                          return (
                            <tr>
                              <td>
                                <img
                                  alt={val.email}
                                  src={val.profileImage}
                                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipartart.com%2Fimages%2Ffacebook-profile-icon-clipart-7.png&f=1&nofb=1' }}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 100
                                  }}
                                />
                                {' '}
                                {val.firstName}
                                {' '}
                                {val.lastName}
                              </td>
                              <td>
                                {val.email}
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-title pr">
                <h4>Students</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table student-data-table m-t-20">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !IsEmpty(students)
                        && students.map((val, key) => {
                          return (
                            <tr>
                              <td>
                                <img
                                  alt={val.email}
                                  src={val.profileImage}
                                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipartart.com%2Fimages%2Ffacebook-profile-icon-clipart-7.png&f=1&nofb=1' }}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 100
                                  }}
                                />
                                {' '}
                                {val.firstName}
                                {' '}
                                {val.lastName}
                              </td>
                              <td>
                                {val.email}
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
