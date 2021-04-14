import React from 'react';
import NoDetails from "./NoDetails";

const Course = props => {

    const course = props.data
    let details
    if (course) {
        // details = course.map(picture => <Picture url={`https://live.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}_${pictureSize}.jpg`}
        //                                            key={picture.id}/>)
        console.log(course)
        const title = course.title
        const description = course.description
        const estimatedTime = course.estimatedTime
        const materialsNeeded = course.materialsNeeded
        const firstName = course.User.firstName
        const lastName = course.User.lastName
        let materialsNeededList
        if (materialsNeeded) {
            materialsNeededList = materialsNeeded.replace(/[^\r\n]+/g, '<li>$&</li>');
        } else {
            materialsNeededList = 'No materials needed'
        }
        console.log(title,lastName, firstName, description, estimatedTime, materialsNeededList)
    } else {
        details = <NoDetails/>
    }

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {details}
            </ul>
        </div>
    )
}

export default Course;
