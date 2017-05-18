import React from 'react';

import AccountsSideList from '../../components/AccountsSideList';
import TransactionsList from '../../components/TransactionsList';

import styles from './styles.scss';

export default class AccountsContainer extends React.Component {
  render() {
    return (
      <section>
        <div className={styles.inRow}>
          <AccountsSideList />
          <TransactionsList />
        </div>
      </section>
    )
  }
}
