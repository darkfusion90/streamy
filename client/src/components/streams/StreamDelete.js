import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStream, deleteStream } from '../../actions/stream-actions';

import Modal from '../Modal';
import LoaderDisplay from '../LoaderDisplay';
import Error404 from '../http-errors/404';
import history from '../../history';

import cryingIcon from '../../../public/img/crying.svg'
import '../http-errors/ErrorStyling.css';
import streams from '../../apis/streams';
class StreamDelete extends React.Component {
    state = { streamAvailable: null, errorDeleting: null };

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id).then(
            (accepted) => this.setState({ streamAvailable: true }),
            (rejected) => this.setState({ streamAvailable: false }));
    }

    onClickDeleteButton = () => {
        console.log("blah");
        this.props.deleteStream(this.props.match.params.id).then(
            (accepted) => this.navigateToHomePage(),
            (rejected) => this.setState({ errorDeleting: true })
        )
    }

    navigateToHomePage = (who) => {
        console.log('navigate' + who);
        history.push('/');
    }

    renderActions() {
        //Using fragment because a <div> will cause off-styling in the modal
        //because these buttons are supposed to be different elements and under not a single <div>
        //React.Fragment wraps them; but when rendered, the buttons render independently
        return (
            <React.Fragment>
                <button className="ui button negative" onClick={this.onClickDeleteButton}>
                    Delete
                </button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </React.Fragment>
        );
    }

    render() {
        if (this.state.errorDeleting) {
            //TODO: REFACTOR TO MAKE ONE OR MORE COMMMON ERROR PAGES. 
            //THIS IS SIMILAR TO 404 ERROR PAGE AND IS ONLY A TEMPORARY SOLUTION
            return <div className="error-container">
                <img className="error-img" src={cryingIcon}></img>
                <div className="error-message">
                    <p className="error-header">Oops! There was some problem while deleting the stream.</p>
                    <p className="error-content">The stream you tried deleting may have been removed or missing.</p>
                </div>
                <Link to="/" >
                    <button className="ui button primary">Back to Home</button>
                </Link>
            </div>
        }

        if (this.state.streamAvailable !== null && !this.state.streamAvailable) {
            return <Error404 />;
        }

        if (this.props.stream === undefined) {
            return <LoaderDisplay text="Loading. Please Wait..." />;
        }

        return (
            <Modal
                header={`Delete Stream "${this.props.stream.title}"?`}
                content="Are you sure you want to delete this stream?"
                onClickApproveButton={this.onClickApproveButton}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete);
