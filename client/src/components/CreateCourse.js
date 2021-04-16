import React, { useState, useEffect } from 'react';
import Errors from "./Errors";
import axios from "axios";



export default function CreateCourse(props) {

    const {context} = props;
    const [course, setCourse] = useState({
        title: "",
        description: "",
        estimatedTime:"",
        materialsNeeded:"",
        userId: context.authenticatedUser.id
    })
    const [response, setResponse] = useState([])
    const [errors, setErrors] = useState([]);

    //https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/

    // const submit = (e) => {
    //     e.preventDefault();
    //     axios.post(`http://localhost:5000/api/courses/`, {
    //         title: course.title,
    //         description: course.description,
    //         estimatedTime: course.estimatedTime,
    //         materialsNeeded: course.materialsNeeded,
    //         userId: context.authenticatedUser.id
    //     })
    //         .then(response => setResponse(response.data))
    //         .catch(error => console.log('Error fetching and parsing data', error))
    // }

    const handle = (e) => {
        const newCourse = {... course}
        newCourse[e.target.id] = e.target.value
        setCourse(newCourse)
        console.log(newCourse)
    }

    function submit(e) {
        e.preventDefault();
        const {context} = props;
        context.data.createCourse(course, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
            .then((err) => {
                if (err.length) {
                    setErrors(err)
                } else {
                    props.history.push('/');
                }
            })
            .catch(err => {
                console.log(err);
                props.history.push('/error');
            })
    }

    console.log(response)
    console.log(course)

    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <Errors errors={errors} />
            <form onSubmit={(e) => submit(e)}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input onChange={(e) => handle(e)}
                               id="title"
                               name="courseTitle"
                               type="text"
                               defaultValue/>
                        <label htmlFor="courseAuthor">Course Author</label>
                        <input id="courseAuthor"
                               name="courseAuthor"
                               type="text"
                               defaultValue={`${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`}
                               disabled = {true}/>
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea onChange={(e) => handle(e)}
                                  id="description"
                                  name="courseDescription"
                                  defaultValue={""}/>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input onChange={(e) => handle(e)}
                                id="estimatedTime"
                               name="estimatedTime"
                               type="text"
                               defaultValue/>
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea onChange={(e) => handle(e)}
                                    id="materialsNeeded"
                                  name="materialsNeeded"
                                  defaultValue={""}/>
                    </div>
                </div>
                <button className="button"
                        type="submit">Create Course
                </button>
                <button className="button button-secondary"
                        onClick="event.preventDefault(); location.href='index.html';">Cancel
                </button>
            </form>
        </div>
    )
}
