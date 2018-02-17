import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, firebase } from 'react-redux-firebase'

import App from 'grommet/components/App'

class Login extends Component {
    render() {
        return(
            <App className="App">
                <h1>LOGIN</h1>
                <button // <GoogleButton/> button can be used instead
                    onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })}
                >Login With Google</button>
                <button // <GoogleButton/> button can be used instead
                    onClick={() => this.props.firebase.logout()}
                >Logout</button>
                <div>
                    <h2>Auth state</h2>
                    {
                        isLoaded(this.props.firebase.profile) 
                        ? <p>this.props.firebase.profile.isEmpty = true</p>
                        : <p>Profile has loaded</p> 
                    }
{/*                     isLoaded(this.props.firebase.auth)
                    ? <span>Loading...</span>
                    : isEmpty(this.props.firebase.auth)
                        ? <span>Not Authed</span>
: <pre>{JSON.stringify(this.props.firebase.auth, null, 2)}</pre> */ }
                </div>
            </App>
        )
    }
}


export default compose(
    firebaseConnect(),
    connect( ({firebase: { auth } }) => (
        { auth }
    ))
)(Login)