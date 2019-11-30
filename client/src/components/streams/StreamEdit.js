import React from 'react';
import { connect } from 'react-redux';

import { fetchStream, editStream } from '../../actions/stream-actions'

import StreamForm from './StreamForm';
import LoaderDisplay from '../LoaderDisplay';


class StreamEdit extends React.Component {
    componentDidMount() {
        /* 
        We are explicitly fetching the stream here because
        when this component is rendered, it checks the current url in the browser
        The url is in form: /streams/edit/:id
        It then uses the url's id to fetch the appropriate stream to edit from the central redux store

        Note that the streams in the store is intialized by StreamList component
        If a user directly visits this edit url without visiting StreamList (i.e. root url),
        the store would be empty since nothing else loads the streams to the store
        Now when StreamEdit tries to get the stream from store using the id (from mapStateToProps),
        the store would be empty and hence, the stream undefined.

        To avoid this and to make sure StreamEdit is independent of other components,
        we make this component fetch the required data itself.
        Hence, whenever it is mount (i.e., rendered),
        it first puts the required stream to the redux store
        by fetching the stream through fetchStream action creator

        Note that if the stream is already present in the store, it won't create any problem
        since it will be replaced instead of duplicated
        */
        this.props.fetchStream(this.props.match.params.id);
    }

    renderTextInput(formProps) {
        console.log(formProps.value);
        return (
            <div className="field">
                <label>{formProps.label}</label>
                <input {...formProps.input} required />
            </div>
        );
    }

    onFormSubmit = formValues => {
        const streamId = this.props.match.params.id;
        this.props.editStream(streamId, formValues);
    }

    render() {
        const stream = this.props.stream;
        if (!stream) {
            return <LoaderDisplay text="Loading Stream. Please wait..." />
        }
        return (
            <div>
                <h3>Edit Stream</h3>
                <StreamForm
                    buttonText="Edit Stream"
                    onFormSubmit={this.onFormSubmit}
                    initialValues={{ title: stream.title, description: stream.description }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const streamId = ownProps.match.params.id;
    return {
        stream: state.streams[streamId],
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(
    mapStateToProps,
    { fetchStream, editStream }
)(StreamEdit);
