import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/balances';

import AccountsSideList from '../../components/AccountsSideList';
import TransactionsList from '../../components/TransactionsList';

import styles from './styles.scss';

function mapStateToProps(state) {
  return {
    data: state.balances.data,
    token: state.auth.token,
    loaded: state.balances.loaded,
    isFetching: state.balances.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class AccountsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const token = this.props.token;
    this.props.fetchBalancesData(token);
  }

  render() {
    return (
      <section>
        <div className={styles.inRow}>
          <AccountsSideList balances={this.props.data}/>
          <TransactionsList updateBalance={this.fetchData.bind(this)}/>
        </div>
      </section>
    )
  }
}

AccountsContainer.propTypes = {
  fetchBalancesData: React.PropTypes.func,
  loaded: React.PropTypes.bool,
  data: React.PropTypes.any,
  token: React.PropTypes.string,
};
