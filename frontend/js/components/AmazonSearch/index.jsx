import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Root from './containers/index.jsx'
import reducer from './reducers/index.jsx'

let store = createStore(reducer)

const AmazonSearch = () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

export default AmazonSearch
