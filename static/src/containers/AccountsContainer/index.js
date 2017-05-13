import React from 'react';

import AccountsSideList from '../../components/AccountsSideList';
import TransactionsList from '../../components/TransactionsList';

import styles from './styles.scss';

export const AccountsContainer = () =>
  <section>
    <div className={styles.inRow}>
      <AccountsSideList />
      <TransactionsList />
    </div>
  </section>;
