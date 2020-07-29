import React from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions/stream-actions'

import Error404 from '../http-errors/404';
import LoaderDisplay from '../LoaderDisplay';
import VideoPlayer from '../VideoPlayer';

class StreamShow extends React.Component {
    state = { streamAvailable: null, errorDeleting: null };

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id).then(
            (accepted) => this.setState({ streamAvailable: true }),
            (rejected) => this.setState({ streamAvailable: false }));
    }

    render() {
        const stream = this.props.stream;

        //WARNING! DO NOT USE !this.state.streamAvailabe
        //Reason: streamAvailable is null initially while we fetch the stream from server
        //After the time it is fetched, streamAvailable will be either true or false
        //But until that time streamAvailabe === null and !streamAvailable will hence return true
        //resulting in unwanted 404 error
        if (this.state.streamAvailable === false) {
            return <Error404 />;
        }

        if (stream === undefined) {
            return <LoaderDisplay text="Loading Stream. Please wait..." />;
        }

        return (
            <div style={{ marginBottom: '50px' }}>
                <VideoPlayer streamId={this.props.stream.id} />
                <h1>{stream.title}</h1>
                <h5>{stream.description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const streamId = ownProps.match.params.id;
    return { stream: state.streams[streamId] };
}

export default connect(
    mapStateToProps,
    { fetchStream }
)(StreamShow);
