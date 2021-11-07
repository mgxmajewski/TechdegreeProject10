import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Courses(props) {

    // Create variable to later store courses
    let courseContainers

    // Add hooks to manage state of component
    const [courses, getCourses] = useState([])

    // Fetch from API
    useEffect( () => {
        axios.get(`${process.env.REACT_APP_HOST}:5000/api/courses`)
            .then(response => getCourses(response.data))
            .catch(error => {
                props.push.history('/notfound');
                console.log('Error fetching and parsing data', error)
            })
    }, [])

    // Map courses data to "containers"
    courseContainers = courses.map(courses =>
        <Link className="course--module course--link" key={courses.id} to={`courses/${courses.id}`}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{courses.title}</h3>
        </Link>
    )

    return (
        <div className="wrap main--grid">
            {courseContainers}
            <Link className="course--module course--add--module" to="/courses/create">
            <span className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
            New Course
            </span>
            </Link>
        </div>
    )
}

