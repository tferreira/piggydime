import React from 'react';

import AccountsSideList from '../../components/AccountsSideList';
import TransactionsList from '../../components/TransactionsList';

import styles from './styles.scss';

export default class AccountsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAccount: 0,
    }
  }

  receiveSelectedAccount(accountId) {
    this.setState(
      {selectedAccount: accountId}
    )
  }

  render() {
    return (
      <section>
        <div className={styles.inRow}>
          <AccountsSideList notifyContainer={this.receiveSelectedAccount.bind(this)} />
          <TransactionsList selectedAccount={this.state.selectedAccount} />
        </div>
      </section>
    )
  }
}
