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

    event.preventDefault()

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
      <form className="form-inline">
        <input type="text" className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0" name="keyword" value={this.props.keyword} ref={node => (this.searchInput = node)} onChange={(event) => this.change(event)} />
        <div className="form-check form-check-inline">
          <label className="form-check-label mb-2 mb-sm-0 mr-2" htmlFor="search_index_books">
            <input type="radio" name="search_index" className="form-check-input mr-1" id="search_index_books" value="Books" onChange={(event) => this.searchIndexChanged(event, 'Books')} checked={this.props.searchIndex === 'Books'} />
            Books
          </label>
          <label className="form-check-label mb-2 mb-sm-0 mr-2" htmlFor="search_index_kindle_store">
            <input type="radio" name="search_index" className="form-check-input mr-1" id="search_index_kindle_store" value="KindleStore" onChange={(event) => this.searchIndexChanged(event, 'KindleStore')} checked={this.props.searchIndex === 'KindleStore'} />
            KindleStore
          </label>
        </div>
        <button className="btn btn-primary btn-sm" onClick={(event) => this.search(event)}>検索</button>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForm)
