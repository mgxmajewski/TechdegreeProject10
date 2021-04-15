import './App.css';
import '../src/styles/global.css'
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import Header from "./components/Header";

import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";


const App = () => (

    <Router>
    <Header/>
        <Switch>
            <Route exact path="/" component={Courses} />
            <Route path ="/courses/create" component={CreateCourse} />
            <Route exact path ="/courses/:id" component={CourseDetail} />
        </Switch>
    </Router>
)

export default App;
