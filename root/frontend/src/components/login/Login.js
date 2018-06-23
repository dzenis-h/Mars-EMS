import React, {Component} from 'react';
import GoogleLogin from "react-google-login";
import Auth from '../../helper/auth';
import PropTypes from 'prop-types';
import * as config from '../../config/config';
import logo from '../../img/logo.png';

class Login extends Component {

    onSuccess = (googleUser) => {
        const userHasPermission = config.emails.includes(googleUser.profileObj.email);
        if (userHasPermission) {
            Auth.setStorage(googleUser);
            this.props.getLoggedUser(googleUser.profileObj.email);
            this.props.history.push('/home');
        } else {
            Auth.signOut();
            this.props.removeLoggedUser();
            alert('Yo do not have permission to login')
        }
    };

    onFailure = (error) => {
        alert(error)
    };

    componentWillMount() {
        if (this.props.loggedUser != null) {
            this.props.history.push('/home');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loggedUser != null) {
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <div className="container container__login">
                <div className="login__section">
                    <img src={logo} alt="EMS Mars logo" className="login__section__logo"/>
                    <h4>Welcome to Mars EMS! </h4>
                    <p className="no-data">Please sign in with your Google account!</p>
                    <br/><br/>
                    <GoogleLogin
                        buttonText="log in with Google"
                        className="btn-primary btn-login"
                        onSuccess={this.onSuccess}
                        onFailure={this.onFailure}
                        />
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loggedUser: PropTypes.string,
    getLoggedUser: PropTypes.func.isRequired
};

export default Login;
