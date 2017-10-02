import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as accountsActions from '../../actions/accounts'
import * as balancesActions from '../../actions/balances'

import AccountsSideList from '../../components/AccountsSideList'
import TransactionsList from '../../components/TransactionsList'

import styles from './styles.scss'

function mapStateToProps(state) {
  return {
    balancesData: state.balances.data,
    accountsData: state.accounts.data,
    token: state.auth.token,
    loaded: state.balances.loaded,
    isFetching: state.balances.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      accounts: bindActionCreators(accountsActions, dispatch),
      balances: bindActionCreators(balancesActions, dispatch)
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AccountsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    const token = this.props.token
    this.props.actions.balances.fetchBalancesData(token)
  }

  render() {
    return (
      <section>
        <div className={styles.inRow}>
          <AccountsSideList
            balances={this.props.balancesData}
            updateBalance={this.fetchData.bind(this)}
          />
          <TransactionsList
            accounts={this.props.accountsData}
            updateBalance={this.fetchData.bind(this)}
          />
        </div>
      </section>
    )
  }
}

AccountsContainer.propTypes = {
  fetchBalancesData: React.PropTypes.func,
  loaded: React.PropTypes.bool,
  balancesData: React.PropTypes.any,
  accountsData: React.PropTypes.any,
  token: React.PropTypes.string
}
