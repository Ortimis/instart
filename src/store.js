import { createStore, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from './reducers/index'
import { firebase as fbConfig } from './config'
import firebase from 'firebase'
import 'firebase/firestore' // make sure you add this for firestore
import { reactReduxFirebase, /* getFirebase */ } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'

export default function configureStore (initialState, history) {
  // Initialize Firebase instance
  firebase.initializeApp(fbConfig)
  firebase.firestore() // Initialize Firestore

  const createStoreWithMiddleware = compose(
    reactReduxFirebase(firebase,
      {
        userProfile: 'users',
        useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
        enableLogging: false
      }
    ),
    reduxFirestore(firebase),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)

  const store = createStoreWithMiddleware(rootReducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

/*   store.firebaseAuthIsReady.then(() => {
    console.log('Auth has loaded') // eslint-disable-line no-console
  }) */

  return store
}
