import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/transactions';
import AddTransaction from '../Modals/AddTransaction.js'
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import styles from './styles.scss';


function mapStateToProps(state) {
  return {
    data: state.transactions.data,
    token: state.auth.token,
    loaded: state.transactions.loaded,
    isFetching: state.transactions.isFetching,
    selectedAccount: state.accounts.selectedAccount,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class TransactionsList extends React.Component {
  state = {
    transactionsList: [],
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: true,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: false,
    showCheckboxes: false,
    height: '400px',
  };

  fetchData(account_id=null) {
    if (account_id === null) {
      account_id = this.props.selectedAccount
    }
    const token = this.props.token
    this.props.fetchTransactionsData(token, account_id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedAccount !== this.props.selectedAccount) {
      this.fetchData(nextProps.selectedAccount)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom()
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  scrollToBottom() {
    if (this.refs.table !== undefined) {
      this.refs.table.refs.tableDiv.scrollTop = this.refs.table.refs.tableDiv.scrollHeight
    }
  }

  renderTransactionsList( transactions ) {
    const rows = transactions.map((row, index) => {
      return (
        <TableRow key={index}>
          <TableHeaderColumn className={styles.smallColumn}>{row.date.toString()}</TableHeaderColumn>
          <TableHeaderColumn>{row.label}</TableHeaderColumn>
          <TableHeaderColumn className={styles.smallColumn}>{row.credit ? row.credit : ''}</TableHeaderColumn>
          <TableHeaderColumn className={styles.smallColumn}>{row.debit ? row.debit : ''}</TableHeaderColumn>
        </TableRow>
      )
    })
    return rows
  }

  render() {
    if (this.props.selectedAccount === undefined || this.props.selectedAccount === null) {
      return (
        <div className={styles.mainContainer}>
          <h3>Select an account or create one.</h3>
        </div>
      )
    }

    return (
      <div className={styles.mainContainer}>
      {!this.props.loaded
        ? <h1>Loading data...</h1>
        :
        <div className={styles.mainTable}>
          <Table
            ref='table'
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn className={styles.smallColumn}>Date</TableHeaderColumn>
                <TableHeaderColumn>Label</TableHeaderColumn>
                <TableHeaderColumn className={styles.smallColumn}>Credit</TableHeaderColumn>
                <TableHeaderColumn className={styles.smallColumn}>Debit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
              style={{height: '100%'}}
            >
              {this.renderTransactionsList(this.state.transactionsList)}
            </TableBody>
            <TableFooter
              adjustForCheckbox={this.state.showCheckboxes}
            >
              <TableRow>
                <TableRowColumn colSpan="4">
                  <AddTransaction />
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      }
      </div>
    );
  }
}

TransactionsList.propTypes = {
  fetchTransactionsData: React.PropTypes.func,
  loaded: React.PropTypes.bool,
  data: React.PropTypes.any,
  token: React.PropTypes.string,
  selectedAccount: React.PropTypes.number,
};
