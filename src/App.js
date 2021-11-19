import React, {
  useState,
  useEffect,
  useContext,
  Fragment
} from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import './assets/lib/bootstrap.min.css';
import './assets/lib/sidebar.css';
import './assets/lib/style.css';

import './assets/main.scss';
import './assets/skeleton.css';

import 'react-datepicker/src/stylesheets/datepicker.scss'

import Home from './pages/Home';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Instructor from './pages/Instructors';

import CalendarProvider, { CalendarContext } from './context/CalendarContext';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import { IsEmpty } from './utility/ToolFct';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <CalendarProvider>
          {/* <CalendarContext.Consumer>
            {
              (value) => {
                return (
                  IsEmpty(value.userInfo.userEmail) && <Redirect to="/" />
                )
              }
            }
          </CalendarContext.Consumer> */}
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/user" component={Users} />
          <Route path="/profile" component={Profile} />
          <Route path="/instructors" component={Instructor} />
          <Route path="/settings" component={Settings} />
        </CalendarProvider>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
