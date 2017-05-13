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
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: true,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: false,
    showCheckboxes: false,
    height: '300px',
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

  addRow() {
    console.log('addRow called!')
  }

  renderTransactionsList( transactions ) {
    const rows = transactions.map((row) => {
      return (
        <TableRow>
          <TableHeaderColumn className={styles.smallColumn}></TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
          <TableHeaderColumn className={styles.smallColumn}></TableHeaderColumn>
          <TableHeaderColumn className={styles.smallColumn}></TableHeaderColumn>
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
                <TableHeaderColumn className={styles.smallColumn}>Debit</TableHeaderColumn>
                <TableHeaderColumn className={styles.smallColumn}>Credit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.renderTransactionsList([])}
            </TableBody>
            <TableFooter
              adjustForCheckbox={this.state.showCheckboxes}
            >
              <TableRow>
                <TableRowColumn onTouchTap={this.addRow} colSpan="4" style={{textAlign: 'center'}}>
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
