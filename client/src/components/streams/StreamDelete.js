import React from 'react';
import { connect } from 'react-redux';

import { fetchStream, deleteStream } from '../../actions/stream-actions';

import Modal from '../Modal';
import LoaderDisplay from '../LoaderDisplay';
import history from '../../history';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onClickApproveButton = () => {
        if (!this.props.stream) {
            return;
        }
        this.props.deleteStream(this.props.stream.id);
    }

    onClickCancelButton = () => {
        history.push('/');
    }

    render() {

        if (!this.props.stream) {
            return <LoaderDisplay text="Loading. Please Wait..." />;
        }

        //Using fragment because a <div> will cause off-styling in the modal
        //because these buttons are supposed to be different elements and under not a single <div>
        //React.Fragment wraps them; but when rendered, the buttons render independently
        const actions = (
            <React.Fragment>
                <button className="ui button negative" onClick={this.onClickApproveButton}>
                    Delete
                </button>
                <button className="ui button" onClick={this.onClickCancelButton}>
                    Cancel
                </button>
            </React.Fragment>
        )

        return (
            <div>
                Delete Stream
            <Modal
                    header="Delete Stream"
                    content="Are you sure you want to delete this stream?"
                    onClickApproveButton={this.onClickApproveButton}
                    actions={actions}
                />
            </div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete);