import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/accounts';

import AddAccount from '../Modals/AddAccount.js'
import EditAccount from '../Modals/EditAccount.js'
import MiniChart from '../MiniChart.js'

import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

/* component styles */
import styles from './styles.scss';


function mapStateToProps(state) {
  return {
    data: state.accounts.data,
    token: state.auth.token,
    loaded: state.accounts.loaded,
    isFetching: state.accounts.isFetching,
    selectedAccount: state.accounts.selectedAccount,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class AccountsSideList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  select = (id) => {
    this.props.selectAccount(id)
  }

  selectDefaultAccount() {
    if (this.props.data !== undefined && this.props.data !== null && this.props.data.length > 0) {
      for (var first in this.props.data) {
        this.select(first.id);
        break;
      }
    } else {
      this.select(null);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const token = this.props.token;
    this.props.fetchAccountsData(token);
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.data !== nextProps.data
      || this.props.balances !== nextProps.balances
      || this.props.selectedAccount !== nextProps.selectedAccount)
  }

  renderAccountsList() {
    if (this.props.balances === null) {
      return
    }
    const rows = this.props.data.map((row) => {
      var filtered = this.props.balances.filter((element) => element.account_id === row.id)
      var balance = filtered[0].balance
      var projectedBalance = filtered[0].projected_balance
      return (
        <GridTile
          key={'account-' + row.id}
          title={row.label.concat(' - ', row.bank)}
          // titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          subtitle={<span><b>{Number(balance).toFixed(2)}</b>{' (' + Number(projectedBalance).toFixed(2) + ')'}</span>}
          actionIcon={<EditAccount fields={row} editAccount={this.editAccount.bind(this)} deleteAccount={this.deleteAccount.bind(this)} />}
          className={this.props.selectedAccount === row.id ? styles.gridTileSelected : styles.gridTile}
          cols={1}
          onTouchTap={(e) => {e.stopPropagation(); this.select(row.id);}}
        >
          <MiniChart currentAccount={row.id} />
        </GridTile>
      )
    })
    return rows
  }

  createAccount( account ) {
    const token = this.props.token;
    this.props.createAccount(token, account);
    this.props.updateBalance();
    this.fetchData();
  }

  editAccount( account ) {
    const token = this.props.token;
    this.props.editAccount(token, account);
    this.props.updateBalance();
    this.fetchData();
  }

  deleteAccount( id ) {
    const token = this.props.token;
    this.props.deleteAccount(token, id);
    this.fetchData();
    this.selectDefaultAccount();
  }

  render() {
    return (
      <div className={styles.sidebar}>
      {!this.props.loaded
        ? null
        :
        <div className={styles.root}>
        <Subheader>Your accounts
          <AddAccount createAccount={this.createAccount.bind(this)} />
        </Subheader>
        <GridList
          cellHeight={100}
          className={styles.gridList}
          cols={1}
        >
          {this.renderAccountsList()}
        </GridList>
        </div>
      }
      </div>
    );
  }
}

AccountsSideList.propTypes = {
  fetchAccountsData: React.PropTypes.func,
  loaded: React.PropTypes.bool,
  data: React.PropTypes.any,
  token: React.PropTypes.string,
  selectedAccount: React.PropTypes.number,
  selectAccount: React.PropTypes.func,
};
