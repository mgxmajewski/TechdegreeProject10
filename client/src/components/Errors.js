import React from 'react';

function Errors(props) {
    let errors = props.errors
    errors = errors.map(error => {
        return <li key={errors.indexOf(error)}>{error}</li>
    })

    if (errors.length) {
        return (
            <div className="validation--errors">
                <h3 className="validation--errors">Validation Errors</h3>
                <ul>
                    {errors}
                </ul>
            </div>
        )
    } else {
        return (
            <p></p>
        )
    }

}

export default Errors;
