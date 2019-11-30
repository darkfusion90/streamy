import React from 'react';

import { connect } from 'react-redux';

import { createStream } from '../../actions/stream-actions/index';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
    onFormSubmit = formValues => {
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <h3>Create new Stream</h3>
                <StreamForm onFormSubmit={this.onFormSubmit} />
            </div>
        );
    }
}

export default connect(
    null,
    { createStream }
)(StreamCreate);
