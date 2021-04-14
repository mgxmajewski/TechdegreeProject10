import React, { useState, useEffect } from 'react';

import axios from "axios";
import { useLocation } from "react-router-dom";
import Course from "./Course";

export default function CourseDetail() {

    // Parse url parameter https://flaviocopes.com/how-to-get-last-item-path-javascript/
    const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
    let urlParam = getLastItem(useLocation().pathname)

    // Add hooks to manage state of component
    const [course, setCourse] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Fetch from API
    useEffect( () => {
        setIsLoading(true)
        axios.get(`http://localhost:5000/api/courses/${urlParam}`)
            .then(course => setCourse(course.data))
            .catch(error => console.log('Error fetching and parsing data', error))
            .finally(()=> setIsLoading(false))
    }, [urlParam])

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="update-course.html">Update Course</a>
                    <a className="button" href="update-course.html">Delete Course</a>
                    <a className="button button-secondary" href="index.html">Return to List</a>
                </div>
            </div>
            {
            (isLoading)
                ? <p>isLoading</p>
                : <Course data={course} isLoading={isLoading}/>
            }
        </main>
    );
}
