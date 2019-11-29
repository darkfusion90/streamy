import React from 'react';

import { connect } from 'react-redux';

import { signIn } from '../../actions/signIn';
import { signOut } from '../../actions/signOut';

class GoogleOAuth extends React.Component {
    componentDidMount() {
        //Loading up the GoogleApi(i.e. GApi) OAuth2 Authentication library
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '752004328242-tjpd38oe3aevkrj3ptfuq9ft8tfc04us.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onClickSignIn = () => {
        this.auth.signIn();
    }

    onClickSignOut = () => {
        this.auth.signOut();
    }

    renderButtonAccordingToSignInStatus() {
        if (this.props.isSignedIn === null) {
            return null;
        }
        else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.onClickSignOut}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }
        else {
            return (
                <button className="ui blue google button" onClick={this.onClickSignIn}>
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }

    }

    render() {
        return (
            <div className="item">
                {this.renderButtonAccordingToSignInStatus()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleOAuth);
