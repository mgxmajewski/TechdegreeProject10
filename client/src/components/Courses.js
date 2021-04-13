import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Courses() {

    let courseContainer

    // Add hooks to manage state of component
    const [courses, getCourses] = useState([])

    // Fetch from API
    useEffect( () => {
        getAllCourses()
    }, [])


    const getAllCourses = () => {
        axios.get(`http://localhost:5000/api/courses`)
            .then(response => getCourses(response.data))
            .catch(error => console.log('Error fetching and parsing data', error))
    }


    console.log(courses)

    courseContainer = courses.map(courses => <a className="course--module course--link" key={courses.id}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{courses.title}</h3>
    </a>)

    return (
        <div className="wrap main--grid">
            {courseContainer}
        </div>
    )
}

