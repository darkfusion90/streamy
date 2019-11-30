import React from 'react';
import { Link } from 'react-router-dom';

import cryingIcon from '../../../../public/img/crying.svg';
import '../ErrorStyling.css';

export default () => {
    return (
        <div className="error-container">
            <img className="error-img" src={cryingIcon}></img>
            <div className="error-message">
                <p className="error-header">Whoopsie! Page Not Found.</p>
                <p className="error-content">Sorry, the page you were looking for doesn't exist.</p>
            </div>
            <Link to="/" >
                <button className="ui button primary">Back to Home</button>
            </Link>
        </div>
    );
}
