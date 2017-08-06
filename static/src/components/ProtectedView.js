import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import * as actionCreators from '../actions/user'

import WelcomeTiles from './WelcomeTiles'

function mapStateToProps(state) {
  return {
    data: state.user.data,
    token: state.auth.token,
    loaded: state.user.loaded,
    isFetching: state.user.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ProtectedView extends React.Component {
  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const token = this.props.token
    this.props.fetchUserData(token)
  }

  render() {
    return (
      <div>
        {!this.props.loaded
          ? null
          : <div>
              <h1>
                {
                  <FormattedMessage
                    id="home.welcomeBack"
                    values={{userName: this.props.userName}}
                  />
                }
              </h1>
              <WelcomeTiles />
            </div>}
      </div>
    )
  }
}

ProtectedView.propTypes = {
  fetchUserData: React.PropTypes.func,
  loaded: React.PropTypes.bool,
  userName: React.PropTypes.string,
  data: React.PropTypes.any,
  token: React.PropTypes.string
}
