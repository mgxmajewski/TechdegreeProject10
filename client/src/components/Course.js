import React from 'react';
import ReactMarkdown from 'react-markdown'
import NoDetails from "./NoDetails";

const Course = props => {

    const course = props.data
    let details

    // Retrieve course details if they exist
    if (course) {
        const { title, description, estimatedTime, materialsNeeded } = course
        const { firstName, lastName } = course.User
        let materialsNeededList

        // Send message in case no materials needed
        if (materialsNeeded === null) {
            materialsNeededList = '* No materials needed'
        } else {
            materialsNeededList = materialsNeeded
        }

        // Markup to render depending on fetched course
        details =
            <div className="main--flex">
                <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{title}</h4>
                    <p>{`${firstName} ${lastName}`}</p>
                    <ReactMarkdown source={description}/>
                </div>
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{estimatedTime}</p>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ReactMarkdown source={materialsNeededList}/>
                </div>
            </div>
    } else {
        details = <NoDetails/>
    }

    return (
        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                {details}
            </form>
        </div>
    )
}

export default Course;
