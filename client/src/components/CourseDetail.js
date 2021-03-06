import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";

import axios from "axios";
import Course from "./Course";

export default function CourseDetail(props) {

    // Parse url parameter https://flaviocopes.com/how-to-get-last-item-path-javascript/
    const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
    let urlParam = getLastItem(useLocation().pathname)

    // Add hooks to manage state of component
    const [course, setCourse] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [authorEmail, setAuthorEmail] = useState('')
    const [authorPass, setAuthorPass] = useState('')

    //Get authenticated user email via context (to compare credentials)
    const {context} = props;
    let authUserEmail = '';
    if (context.authenticatedUser) {
        authUserEmail = context.authenticatedUser.emailAddress
    }

    // Fetch from API
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_HOST}/api/courses/${urlParam}`)
            .then(course => {
                setCourse(course.data)
                if (context.authenticatedUser) {
                    setAuthorEmail(course.data.User.emailAddress)
                    setAuthorPass(context.authenticatedUser.password)
                }
            })
            .then(() => setIsLoading(false))
            .catch(error => {
                if (error.response.status === 404) {
                    props.history.push('/notfound')
                } else if (error.response.status === 500) {
                    props.history.push('/error');
                }
                console.log('Error fetching and parsing data', error)
            })
    }, [urlParam])

    // Handle deletion of course
    function handleDelete(e) {
        e.preventDefault();
        const {context} = props;
        context.data.deleteCourse(urlParam, authUserEmail, authorPass)
            .then(() => props.history.push('/'))
            .catch(err => {
                console.log(err);
                props.history.push('/error');
            })
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {(authUserEmail === authorEmail && authUserEmail.length) ?
                        <React.Fragment>
                            <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                            <button className="button" onClick={handleDelete}>Delete Course</button>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </React.Fragment>
                    }
                </div>
            </div>
            {
                (isLoading)
                    ? <p className="loader">isLoading...</p>
                    : <Course data={course}/>
            }
        </main>
    );
}
