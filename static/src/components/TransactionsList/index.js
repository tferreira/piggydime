import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/accounts';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

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
export default class TransactionsList extends React.Component {
  state = {
    selectedAccount: 0,
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

  componentWillMount() {
    this.setState({selectedAccount: this.props.selectedAccount})
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  addDraftRow(row) {
    let draftRow = {
      date: Date.now(),
      label: '',
      debit: 0,
      credit: 0,
      isDraft: true,
      isRecurring: false,
    }
    this.setState((state) => ({
      transactionsList: state.transactionsList.concat([draftRow])
    }))
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
    return (
      <div className={styles.mainContainer}>
      {!this.props.loaded
        ? <h1>Loading data...</h1>
        :
        <div className={styles.mainTable}>
          <Table
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
            >
              {this.renderTransactionsList(this.state.transactionsList)}
            </TableBody>
            <TableFooter
              adjustForCheckbox={this.state.showCheckboxes}
            >
              <TableRow>
                <TableRowColumn onTouchTap={this.addDraftRow.bind(this)} colSpan="4" style={{textAlign: 'center'}}>
                  Click here to add a new transaction
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
  fetchAccountsData: React.PropTypes.func,
  loaded: React.PropTypes.bool,
  data: React.PropTypes.any,
  token: React.PropTypes.string,
};
