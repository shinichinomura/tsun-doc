import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import request from 'superagent'
import classNames from 'classnames';

import * as AddedDateActions from '../action_creators/AddedDate.jsx'

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AddedDateActions, dispatch)
  }
}

class AddedDate extends Component {
  dateChanged(event) {
    this.props.actions.changeDate(this.dateInput.value);
  }

  dateSelected(event) {
    const id = this.props.userAmazonBook.id
    const added_on = this.dateInput.value
    const selectDateAction = this.props.actions.selectDate;

    request
      .patch(`/api/user/user_amazon_books/${id}`)
      .send({
        authenticity_token: document.getElementsByName('csrf-token')[0]['content'],
        user_amazon_book: {
          added_on
        }
      })
      .end(function(error, response){
        if (error) {
          console.log(error);
        }
        else {
          selectDateAction(added_on)
        }
      })
  }

  dateEditClicked(event) {
    this.props.actions.showInputForm();
  }
  
  render() {
    return (
      <div>
        { this.props.showInputForm ||
            <div>
              登録した日：
              <span>{this.props.date.toString()}</span>
              <i className="fa fa-pencil ml-1" aria-hidden="true" onClick={(event) => this.dateEditClicked()}></i>
            </div>
        }
        { this.props.showInputForm &&
            <form className="form-inline">
              登録した日：
              <input type="text" value={this.props.date} className="form-control form-control-sm" ref={node => (this.dateInput = node)} onChange={(event) => this.dateChanged()} onBlur={(event) => this.dateSelected()} autoFocus />
            </form>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddedDate)
