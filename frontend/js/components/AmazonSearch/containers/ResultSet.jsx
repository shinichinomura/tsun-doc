import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import request from 'superagent'

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
  select_item(event, asin, title, url, thumbnail_url, number_of_pages, width, height, length) {
    const success_action = this.props.actions.select_item

    request
      .post('/user_amazon_books')
      .send({asin, title, url, thumbnail_url, number_of_pages, width, height, length, authenticity_token: document.getElementsByName('csrf-token')[0]['content']})
      .end(function(error, response){
        console.log(response.body);
        success_action()
      })
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
            <li data-asin={item.asin} key={item.asin} onClick={(event) => this.select_item(event, item.asin, item.title, item.url, item.small_image_url, item.number_of_pages, item.dimensions.width, item.dimensions.height, item.dimensions.length)}>
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
