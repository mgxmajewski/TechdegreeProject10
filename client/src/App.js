import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import './App.css';
import '../src/styles/global.css'


import NotFound from './components/NotFound';
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import Header from "./components/Header";
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';


const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
    <Router>
        <HeaderWithContext/>
        <Switch>
            <Route exact path="/" component={Courses} />
            <Route path ="/courses/create" component={CreateCourse} />
            <Route exact path ="/courses/:id" component={CourseDetail} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)
