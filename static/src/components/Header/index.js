import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import AppBar from 'material-ui/AppBar'
import LeftNav from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

import * as actionCreators from '../../actions/auth'

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  dispatchNewRoute(route) {
    browserHistory.push(route)
    this.setState({
      open: false
    })
  }

  handleClickOutside() {
    this.setState({
      open: false
    })
  }

  logout(e) {
    e.preventDefault()
    this.props.logoutAndRedirect()
    this.setState({
      open: false
    })
  }

  openNav() {
    this.setState({
      open: true
    })
  }

  render() {
    return (
      <header>
        <LeftNav open={this.state.open}>
          {!this.props.isAuthenticated
            ? <div>
                <MenuItem onClick={() => this.dispatchNewRoute('/login')}>
                  <FormattedMessage id="header.leftnav.login" />
                </MenuItem>
                <MenuItem onClick={() => this.dispatchNewRoute('/register')}>
                  <FormattedMessage id="header.leftnav.register" />
                </MenuItem>
              </div>
            : <div>
                <MenuItem onClick={() => this.dispatchNewRoute('/accounts')}>
                  <FormattedMessage id="header.leftnav.accounts" />
                </MenuItem>
                <MenuItem onClick={() => this.dispatchNewRoute('/recurrence')}>
                  <FormattedMessage id="header.leftnav.recurrence" />
                </MenuItem>
                <Divider />

                <MenuItem onClick={e => this.logout(e)}>
                  <FormattedMessage id="header.leftnav.logout" />
                </MenuItem>
              </div>}
        </LeftNav>
        <AppBar
          title={<FormattedMessage id="header.title" />}
          onLeftIconButtonTouchTap={() => this.openNav()}
          iconElementRight={
            <FlatButton
              label={<FormattedMessage id="header.home" />}
              onClick={() => this.dispatchNewRoute('/')}
            />
          }
        />
      </header>
    )
  }
}

Header.propTypes = {
  logoutAndRedirect: React.PropTypes.func,
  isAuthenticated: React.PropTypes.bool
}
