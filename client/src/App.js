import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import NotFound from './components/NotFound';
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import Header from "./components/Header";
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import UpdateCourse from './components/UpdateCourse';
import UnhandledError from "./components/UnhandledError";
import Forbidden from "./components/Forbidden";

// Add context to components
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

function App() {
    useEffect(() => {
   document.title = "Courses Board"
}, []);
    return (
        <Router>
            <HeaderWithContext/>
            <Switch>
                <Route exact path="/" component={Courses}/>
                <PrivateRoute path="/courses/create" component={CreateCourseWithContext}/>
                <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext}/>
                <Route exact path="/courses/:id" component={CourseDetailWithContext}/>
                <Route path="/signin" component={UserSignInWithContext}/>
                <Route path="/signup" component={UserSignUpWithContext}/>
                <Route path="/signout" component={UserSignOutWithContext}/>
                <Route path="/forbidden" component={Forbidden}/>
                <Route path="/error" component={UnhandledError}/>
                <Route path="/notfound" component={NotFound}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    )
}
export default App;
