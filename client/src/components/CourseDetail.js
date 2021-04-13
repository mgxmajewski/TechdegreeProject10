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

    // Listener for changes of location

    return (
        <div className="container">

        </div>
    );
}
