import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/accounts';

import AddAccount from '../Modals/AddAccount.js'
import EditAccount from '../Modals/EditAccount.js'

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

/* component styles */
import styles from './styles.scss';


function mapStateToProps(state) {
  return {
    data: state.accounts.data,
    token: state.auth.token,
    loaded: state.accounts.loaded,
    isFetching: state.accounts.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class AccountsSideList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const token = this.props.token;
    this.props.fetchAccountsData(token);
  }

  renderAccountsList( accounts ) {
    const rows = accounts.map((row) => {
      return (
        <GridTile
          key={'account-' + row.id}
          title={row.label}
          subtitle={<span><b>{row.bank}</b></span>}
          actionIcon={<EditAccount fields={row} editAccount={this.editAccount.bind(this)} deleteAccount={this.deleteAccount.bind(this)} />}
          className={styles.gridTile}
          cols={1}
        >
        </GridTile>
      )
    })
    return rows
  }

  createAccount( account ) {
    const token = this.props.token;
    this.props.createAccount(token, account);
    this.fetchData();
  }

  editAccount( account ) {
    const token = this.props.token;
    this.props.editAccount(token, account);
    this.fetchData();
  }

  deleteAccount( id ) {
    const token = this.props.token;
    this.props.deleteAccount(token, id);
    this.fetchData();
  }

  render() {
    return (
      <div className={styles.sidebar}>
      {!this.props.loaded
        ? <h1>Loading data...</h1>
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
        {this.renderAccountsList(this.props.data)}
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
};
