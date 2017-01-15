import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import request from 'superagent'
import classNames from 'classnames';

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
      <div className={classNames('amazon_search-result_set arrow_box', { empty_result_set: this.props.resultSet.length == 0 })}>
        { this.props.error_message.length > 0 &&
            <div className="error">
              {this.props.error_message}
            </div>
        }
        { this.props.resultSet.length > 0 &&
            <div>
              <div className="close-button">
                <i className="fa fa-window-close" aria-hidden="true" onClick={(event) => this.props.actions.closeResultSet()}></i>
              </div>
              <ul className="items list-unstyled">
                { this.props.resultSet.map(item =>
                  <li className="media my-3" data-asin={item.asin} key={item.asin}>
                    <span className="image-container mr-2">
                      <img src={item.small_image_url} />
                    </span>
                    <div className="media-body">
                      <h3><a href={item.url} target="_blank">{item.title}</a></h3>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={(event) => this.select_item(event, item.asin, item.title, item.url, item.small_image_url, item.number_of_pages, item.dimensions.width, item.dimensions.height, item.dimensions.length)}><i className="fa fa-book mr-2" aria-hidden="true"></i>積ん読する</button>
                    </div>
                  </li>
                )}
              </ul>
            </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultSet)
