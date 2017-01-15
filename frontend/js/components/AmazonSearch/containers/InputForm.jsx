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
        <div className="input-group">
          <div className="input-group-btn">
            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.searchIndex == 'Books' ? '紙の本から' : 'Kindleから'}</button>
            <div className="dropdown-menu">
              <span className="dropdown-item" onClick={(event) => this.searchIndexChanged(event, 'KindleStore')}>Kindleから</span>
              <span className="dropdown-item" onClick={(event) => this.searchIndexChanged(event, 'Books')}>紙の本から</span>
            </div>
          </div>
          <input type="text" className="form-control" name="keyword" value={this.props.keyword} ref={node => (this.searchInput = node)} onChange={(event) => this.change(event)} />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button" onClick={(event) => this.search(event)}>検索</button>
          </span>
        </div>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForm)
