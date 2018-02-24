import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { withHandlers, pure, compose } from 'recompose'
import { withNotifications } from 'redux-firestore'

import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import App from 'grommet/components/App'

export const Login = ({ emailLogin, googleLogin, onSubmitFail }) => (
    <App className="App">
        <h1>LOGIN</h1>
        <button // <GoogleButton/> button can be used instead
            onClick={googleLogin}
        >Login With Google</button>
        <button // <GoogleButton/> button can be used instead
            onClick={() => this.props.firebase.logout()}
        >Logout</button>
        <div>
            <h2>Auth state</h2>
            Auth is
        </div>
    </App>
)

Login.propTypes = {
    firebase: PropTypes.shape({
      // eslint-disable-line react/no-unused-prop-types
      login: PropTypes.func.isRequired
    }),
    emailLogin: PropTypes.func,
    onSubmitFail: PropTypes.func,
    googleLogin: PropTypes.func
  }

export default compose(
    // UserIsNotAuthenticated, // redirect to list page if logged in
    //pure,
    //withNotifications, // add props.showError
    withHandlers({
        pure,
        withNotifications,

        onSubmitFail: props => (formErrs, dispatch, err) =>
            props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),

        googleLogin: ({ firebase, showError }) => e =>
            firebase
                .login({ provider: 'google', type: 'popup' })
                .catch(err => showError(err.message)),
        emailLogin: ({ firebase }) => creds => firebase.login(creds)
    })
)(Login)

/* export default compose(
    firebaseConnect(),
    connect( ({firebase: { auth } }) => (
        { auth }
    ))
)(Login) */