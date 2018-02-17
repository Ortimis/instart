import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../screens/Home'
import Login from '../screens/Login'
import configureStore from '../store'


const initialState = window.__INITIAL_STATE__ || { firebase: { authError: null } }
const store = configureStore(initialState)

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter> 
  </Provider>
)
