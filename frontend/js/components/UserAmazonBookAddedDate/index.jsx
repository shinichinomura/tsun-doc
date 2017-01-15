import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Root from './containers/index.jsx'
import reducer from './reducers/index.jsx'

const UserAmazonBookAddedDate = (params) => {
  let store = createStore(reducer, { date: params.user_amazon_book.added_on, showInputForm: false, userAmazonBook: params.user_amazon_book } )
  
  return (
    <Provider store={store}>
      <Root {...params} />
    </Provider>
  )
}

export default UserAmazonBookAddedDate
