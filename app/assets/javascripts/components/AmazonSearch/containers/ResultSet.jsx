import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as ResultSetActions from '../action_creators/ResultSet.jsx'

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ResultSetActions, dispatch)
  }
}

class ResultSet extends Component {
  select_item(event, asin) {
    this.props.actions.select_item()
  }

  render() {
    return (
      <div>
        { this.props.error_message.length > 0 &&
          <div className="error">
            {this.props.error_message}
          </div>
        }
        { this.props.resultSet.length > 0 &&
          <ul className="items">
          { this.props.resultSet.map(item =>
            <li data-asin={item.asin} key={item.asin} onClick={(event) => this.select_item(event, item.asin)}>
              <img src={item.small_image_url} />
              {item.title}
            </li>
          )}
          </ul>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultSet)
