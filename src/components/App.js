import React from 'react'
import { Provider } from 'react-redux'
import Home from '../screens/Home'
import configureStore from '../store'


const initialState = window.__INITIAL_STATE__ || { firebase: { authError: null } }
const store = configureStore(initialState)

export default () => (
  <Provider store={store}>
    <Home />
  </Provider>
)
