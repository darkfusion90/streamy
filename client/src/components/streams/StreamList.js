import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { fetchStreams } from '../../actions/stream-actions'

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdministrativeControls(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link
                        className="ui primary button"
                        to={`/streams/edit/${stream.id}`}
                    >
                        Edit
                    </Link>
                    <Link
                        className="ui negative button"
                        to={`/streams/delete/${stream.id}`}
                    >
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderListOfStreams() {
        //The admin controls will be rendered 'after' all content
        //However, to make sure semantic-ui renders them properly,
        //we place it before all content. The controls are 'floated right'
        //essentially so they will appear at the end (i.e., right)
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdministrativeControls(stream)}
                    <i className="large middle aligned icon camera" />

                    <div className="content">
                        <Link to={`/streams/${stream.id}`}>
                            <h4 style={{ display: 'inline' }}>{stream.title}</h4>
                        </Link>
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            )
        });
    }
    count = 0
    fetchh = async () => {
        console.log("meowww" + this.count++)
        const response = await axios('/ping')
        console.log(response.data)
    }

    renderCreateStreamButton() {
        console.log('rendering button')
        /*<Link to="/streams/new" className="ui button primary">
                        Create New Stream
                    </Link>*/return (<div style={{ textAlign: "right" }}>
            <button onClick={this.fetchh}>Meow</button>
        </div>)
        if (this.props.isSignedIn) {
            return (
                //push the button to right end of the screen
                <div style={{ textAlign: "right" }}>
                    <button onClick={this.fetchh}>Meow</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Streams:</h2>
                <div className="ui celled list">{this.renderListOfStreams()}</div>
                {this.renderCreateStreamButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //Note that streams = {stream_id: stream, stream_id: stream, ...}
    //We are only concerned about the stream (values) and not the stream_id (key) part
    //So we just take the values part that is actually list of streams
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
