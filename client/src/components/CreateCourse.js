import React, {useState} from 'react';
import Errors from "./Errors";


export default function CreateCourse(props) {

    const {context} = props;
    const [course, setCourse] = useState({
        title: "",
        description: "",
        estimatedTime:"",
        materialsNeeded:"",
        userId: context.authenticatedUser.id
    })
    const [errors, setErrors] = useState([]);

    const handle = (e) => {
        const newCourse = {...course}
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

    function handleCancel(e) {
        e.preventDefault();
        props.history.push('/');
    }


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
                               placeholder="Enter course title"/>
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
                                  placeholder="Enter course title"/>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input onChange={(e) => handle(e)}
                               id="estimatedTime"
                               name="estimatedTime"
                               type="text"
                               placeholder="Enter course estimated time"/>
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea onChange={(e) => handle(e)}
                                  id="materialsNeeded"
                                  name="materialsNeeded"
                                  placeholder="Enter materials needed"/>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}
