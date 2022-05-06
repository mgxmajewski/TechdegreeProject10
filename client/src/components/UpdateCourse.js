import React, { useState, useEffect } from 'react';
import Errors from "./Errors";
import axios from "axios";
import {useParams} from "react-router-dom";
import NotFound from "./NotFound";


export default function UpdateCourse(props) {

    // Parse url parameter https://flaviocopes.com/how-to-get-last-item-path-javascript/
    const params = useParams();
    let urlParam = params.id;

    // Add hooks to manage state of component
    const [course, setCourse] = useState([])
    const [authorEmail, setAuthorEmail] = useState('')
    const [authorPass, setAuthorPass] = useState('')
    const [errors, setErrors] = useState([]);
    const [userId, setUserId] = useState(0)

    //Get authenticated user email via context
    const {context} = props;


    // Fetch from API
    useEffect( () => {
        axios.get(`${process.env.REACT_APP_HOST}/api/courses/${urlParam}`)
            .then(course => {
                setCourse(course.data)
                setAuthorEmail(course.data.User.emailAddress)
                setAuthorPass(context.authenticatedUser.password)
                setUserId(course.data.User.id)
            })
            .catch(error => {
                if(error.response.status === 404) {
                    props.history.push('/notfound')
                } else if(error.response.status === 500) {
                    props.history.push('/error');
                }
                console.log('Error fetching and parsing data', error)
            })
    }, [urlParam])
    // console.log(authorPass)

    // Catches if user don't update not his course
    useEffect(() => {
        const {context} = props;
        if (userId && userId !== context.authenticatedUser.id) {
            props.history.push('/forbidden');
        }
    }, [userId, props])

    // Handler to track changes on virtual DOM
    const handle = (e) => {
        const newCourse = {...course}
        newCourse[e.target.id] = e.target.value
        setCourse(newCourse)
        console.log(newCourse)
    }

    // Handler of submission of updated course
    function submit(e) {
        e.preventDefault();
        const {context} = props;
        context.data.updateCourse(urlParam, course, authorEmail, authorPass)
            .then((err) => {
                if (err) {
                    console.log(err)
                    setErrors(err)
                } else {
                    props.history.push(`/courses/${urlParam}`);
                }
            })
            .catch(err => {
                console.log(err);
                props.history.push('/error');
            })
    }

    // Handler for cancel button
    function handleCancel(e) {
        e.preventDefault();
        props.history.push('/courses/' + urlParam);
    }

    // Renders form if course is found
    let form
    if (course) {
        form =
            <form onSubmit={(e) => submit(e)}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input onInput={(e) => handle(e)}
                               id="title"
                               name="courseTitle"
                               type="text"
                               defaultValue={course.title}/>
                        <label htmlFor="courseAuthor">Course Author</label>
                        <input id="courseAuthor"
                               name="courseAuthor"
                               type="text"
                               defaultValue={`${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`}
                               disabled = {true}/>
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea onInput={(e) => handle(e)}
                                  id="description"
                                  name="courseDescription"
                                  defaultValue={course.description}/>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input onChange={(e) => handle(e)}
                               id="estimatedTime"
                               name="estimatedTime"
                               type="text"
                               defaultValue={course.estimatedTime}/>
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea onChange={(e) => handle(e)}
                                  id="materialsNeeded"
                                  name="materialsNeeded"
                                  defaultValue={course.materialsNeeded}/>
                    </div>
                </div>
                <button className="button" type="submit">Update Course </button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
    } else {
        form = <NotFound/>
    }

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            <Errors errors={errors} />
            {form}
        </div>
    )
}
