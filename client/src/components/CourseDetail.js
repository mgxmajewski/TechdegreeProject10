import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

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
                    <Link className="button" to={`${course.id}/update`}>Update Course</Link>
                    <Link className="button" href="/">Delete Course</Link>
                    <Link className="button button-secondary" to="/">Return to List</Link>
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
