import React from 'react';
import flv from 'flv.js';

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${this.props.streamId}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    render() {
        return <video ref={this.videoRef} style={{ width: "100%" }} controls />
    }
}

export default VideoPlayer;
