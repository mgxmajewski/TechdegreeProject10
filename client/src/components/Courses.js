import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Courses() {

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


    return (
        <div className="wrap main--grid">

        </div>
    )
}

