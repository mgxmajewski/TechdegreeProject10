import React from 'react';

function Errors(props) {
    let errors = props.errors;

    if (errors.length) {
        return (
            <div className="validation--errors">
                <h3 className="validation--errors">Validation Errors</h3>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
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
