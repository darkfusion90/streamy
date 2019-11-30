import React from 'react';
import ReactDOM from 'react-dom';

import history from '../history';

class Modal extends React.Component {
    state = {
        isVisible: true,
        isActive: true
    }

    hideModal = () => {
        this.setState({
            isVisible: false,
            isActive: false
        })
    }

    onClickApproveButton = () => {
        this.hideModal();
        this.props.onClickApproveButton();
    }

    onClickCancelButton = () => {
        this.hideModal();
        this.props.onClickCancelButton();
    }

    render() {
        const visible = this.state.isVisible ? "visible" : "";
        const active = this.state.isActive ? "active" : "";

        return ReactDOM.createPortal(
            <div onClick={() => history.push('/')} className={`ui dimmer modals ${visible} ${active}`}>
                <div
                    onClick={e => e.stopPropagation()}
                    className={`ui standard modal ${visible} ${active}`}
                >
                    <div className="header">{this.props.header}</div>
                    <div className="content">
                        <p>{this.props.content}</p>
                    </div>
                    <div className="actions">
                        {this.props.actions}
                    </div>
                </div>
            </div>,
            document.querySelector("#modal")
        )
    }
}

export default Modal;
