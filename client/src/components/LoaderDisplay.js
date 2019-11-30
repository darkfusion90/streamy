import React from 'react';
  
const LoaderDisplay = (props) => {
    return (
        <div className="ui active dimmer">
            <div className="ui active big text loader">{props.text}</div>
        </div>
    );
}

export default LoaderDisplay