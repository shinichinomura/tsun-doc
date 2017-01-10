import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import request from 'superagent'

import * as InputFormActions from '../action_creators/InputForm.jsx'

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(InputFormActions, dispatch)
  }
}

class InputForm extends Component {
  search(event) {
    const success_action = this.props.actions.search
    const failure_action = this.props.actions.error
    const keyword = this.searchInput.value
    const searchIndex = this.props.searchIndex

    request
      .get('/amazon/items/search')
      .query({ keyword, search_index: searchIndex })
      .end(function(error, response){
        if (error) {
          failure_action(keyword, searchIndex, error.message)
        }
        else {
          success_action(keyword, searchIndex, response.body)
        }
      })
  }

  change(event) {
    this.props.actions.change(this.searchInput.value)
  }

  searchIndexChanged(event, searchIndex) {
    this.props.actions.changeSearchIndex(searchIndex)
  }

  render() {
    const { actions } = this.props;

    return (
      <div>
        <div>
          <input type="text" name="keyword" value={this.props.keyword} ref={node => (this.searchInput = node)} onChange={(event) => this.change(event)} />
        </div>
        <div>
          <input type="radio" name="search_index" id="search_index_books" value="Books" onChange={(event) => this.searchIndexChanged(event, 'Books')} checked={this.props.searchIndex === 'Books'} /><label htmlFor="search_index_books">Books</label>
          <input type="radio" name="search_index" id="search_index_kindle_store" value="KindleStore" onChange={(event) => this.searchIndexChanged(event, 'KindleStore')} checked={this.props.searchIndex === 'KindleStore'} /><label htmlFor="search_index_kindle_store">KindleStore</label>
        </div>
        <div>
          <button onClick={(event) => this.search(event)}>検索</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForm)
