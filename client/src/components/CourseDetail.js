import React, { useState, useEffect } from 'react';

import axios from "axios";
import { useLocation } from "react-router-dom";

export default function CourseDetail() {

    // Handler for empty/home route
    // const defaultSearch = 'cats'

    // Parse url parameter https://flaviocopes.com/how-to-get-last-item-path-javascript/
    const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
    let urlParam = getLastItem(useLocation().pathname)

    // if (urlParam.length === 0) {
    //     urlParam = defaultSearch
    //     let path = `/${urlParam}`
    // }

    // Add hooks to manage state of component
    const [data, setData] = useState([])
    const [query, setQuery] = useState(urlParam)
    const performSearch = (value) => setQuery(value)

    // Fetch from API using query parameter taken from url
    useEffect( () => {
        axios.get(`http://localhost:5000/api/courses/${query}`)
            .then(response => setData(response.data))
            .catch(error => console.log('Error fetching and parsing data', error))
    }, [query])

    console.log(data)
    console.log(performSearch)

    const title = data.title
    const description = data.description
    const estimatedTime = data.estimatedTime
    const materialsNeeded = data.materialsNeeded
    const firstName = data.firstName
    const lastName = data.lastName

    console.log(firstName)
    console.log(lastName)

    // Listener for changes of location

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="update-course.html">Update Course</a>
                    <a className="button" href="#">Delete Course</a>
                    <a className="button button-secondary" href="index.html">Return to List</a>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{title}</h4>
                            <p>{`By ${firstName} ${lastName}`}</p>
                            <p>{description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>1/2 x 3/4 inch parting strip</li>
                                <li>1 x 2 common pine</li>
                                <li>1 x 4 common pine</li>
                                <li>1 x 10 common pine</li>
                                <li>1/4 inch thick lauan plywood</li>
                                <li>Finishing Nails</li>
                                <li>Sandpaper</li>
                                <li>Wood Glue</li>
                                <li>Wood Filler</li>
                                <li>Minwax Oil Based Polyurethane</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
