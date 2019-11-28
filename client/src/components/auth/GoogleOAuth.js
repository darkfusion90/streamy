import React from 'react';

class GoogleOAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        //Loading up the GoogleApi(i.e. GApi) OAuth2 Authentication library
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '752004328242-tjpd38oe3aevkrj3ptfuq9ft8tfc04us.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
    }

    onClickSignIn = () => {
        this.auth.signIn();
    }

    onClickSignOut = () => {
        this.auth.signOut();
    }

    renderButtonAccordingToSignInStatus() {
        if (this.state.isSignedIn === null) {
            return null;
        }
        else if (this.state.isSignedIn) {
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

export default GoogleOAuth;
