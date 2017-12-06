import React from 'react'
import 'babel-polyfill'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as actionCreators from '../../actions/transactions'
import AddTransaction from '../Modals/AddTransaction.js'
import EditTransaction from '../Modals/EditTransaction.js'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'
import Snackbar from 'material-ui/Snackbar'
import { GridLoader } from 'halogen'

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import styles from './styles.scss'

function mapStateToProps(state) {
  return {
    data: state.transactions.data,
    token: state.auth.token,
    loaded: state.transactions.loaded,
    isFetching: state.transactions.isFetching,
    selectedAccount: state.accounts.selectedAccount
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TransactionsList extends React.Component {
  state = {
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
    snackOpen: false,
    snackMessage: '',
    showRecurring: false
  }

  fetchData(account_id = null) {
    if (account_id === null) {
      account_id = this.props.selectedAccount
    }
    if (account_id !== null) {
      const token = this.props.token
      this.props.fetchTransactionsData(token, account_id)
    }
  }

  showSnack(snackMessage) {
    this.setState({
      snackMessage,
      snackOpen: true
    })
  }

  handleSnackClose() {
    this.setState({
      snackOpen: false
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedAccount !== this.props.selectedAccount) {
      this.fetchData(nextProps.selectedAccount)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Do not scroll on ticking
    if (prevProps.data !== this.props.data) {
      this.scrollToBottom()
    }
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled
    })
  }

  handleChange = event => {
    this.setState({ height: event.target.value })
  }

  scrollToBottom() {
    if (this.refs.table !== undefined) {
      this.refs.table.refs.tableDiv.scrollTop = this.refs.table.refs.tableDiv.scrollHeight
    }
  }

  createTransaction(transaction) {
    const token = this.props.token
    let call = async () =>
      await await this.props.createTransaction(token, transaction)
    call().then(() => {
      this.showSnack(<FormattedMessage id="transactionsList.snack.create" />)
    })
  }

  editTransaction(transaction) {
    const token = this.props.token
    let call = async () =>
      await await this.props.editTransaction(token, transaction)
    call().then(() => {
      this.showSnack(<FormattedMessage id="transactionsList.snack.edit" />)
    })
  }

  deleteTransaction(id) {
    const token = this.props.token
    let call = async () => await await this.props.deleteTransaction(token, id)
    call().then(() => {
      this.showSnack(<FormattedMessage id="transactionsList.snack.delete" />)
    })
  }

  tickTransaction(id_transaction, isChecked) {
    const token = this.props.token
    let call = async () =>
      await await this.props.tickTransaction(token, id_transaction, isChecked)
    call().then(() => {})
  }

  toggleRecurring(event, isChecked) {
    this.setState({
      showRecurring: isChecked
    })
  }

  renderTransactionsList(transactions) {
    transactions.sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) return -1
      if (new Date(a.date) > new Date(b.date)) return 1
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })
    // get projected balance date for current account
    let projectedDate = this.props.accounts.filter(
      element => element.id == this.props.selectedAccount
    )[0].projected_date

    if (this.state.showRecurring) {
      // display recurring transactions of the month
      transactions = transactions.filter(element => {
        return (
          element.recurring_group_id === null ||
          (element.recurring_group_id !== null &&
            new Date(element.date) <= new Date()) ||
          (element.recurring_group_id !== null &&
            new Date(element.date) <= new Date(projectedDate))
        )
      })
    } else {
      // filter all future recurring transactions
      transactions = transactions.filter(element => {
        return (
          element.recurring_group_id === null ||
          (element.recurring_group_id !== null &&
            new Date(element.date) <= new Date())
        )
      })
    }
    const rows = transactions.map((row, index) => {
      let credit =
        parseFloat(row.amount) < 0 ? '' : Number(row.amount).toFixed(2)
      let debit =
        parseFloat(row.amount) < 0 ? Number(row.amount).toFixed(2) : ''
      let isFutureAndRecurring =
        new Date(row.date) > new Date() && row.recurring_group_id !== null
      return (
        <TableRow
          key={row.transaction_id}
          className={isFutureAndRecurring ? styles.tableRowFuture : ''}
        >
          <TableRowColumn className={styles.tickColumn}>
            <Checkbox
              defaultChecked={Boolean(row.tick)}
              onCheck={(e, isChecked) =>
                this.tickTransaction(row.transaction_id, isChecked)}
            />
          </TableRowColumn>
          <TableRowColumn className={styles.smallColumn}>
            {row.date.toString()}
          </TableRowColumn>
          <TableRowColumn className={styles.largeColumn}>
            {row.label}
          </TableRowColumn>
          <TableRowColumn className={styles.smallColumn}>
            {debit}
          </TableRowColumn>
          <TableRowColumn className={styles.smallColumn}>
            {credit}
          </TableRowColumn>
          <TableRowColumn className={styles.smallColumn}>
            <EditTransaction
              fields={row}
              editTransaction={this.editTransaction.bind(this)}
              deleteTransaction={this.deleteTransaction.bind(this)}
            />
          </TableRowColumn>
        </TableRow>
      )
    })
    return rows
  }

  render() {
    if (
      this.props.selectedAccount === undefined ||
      this.props.selectedAccount === null
    ) {
      return (
        <div className={styles.mainContainer}>
          <h3>
            <FormattedMessage id="transactionsList.noAccount" />
          </h3>
        </div>
      )
    }

    return (
      <div className={styles.mainContainer}>
        {!this.props.loaded
          ? <GridLoader color="#00BCD4" size="16px" margin="4px" />
          : <div className={styles.mainTable}>
              <Table
                ref="table"
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
                    <TableHeaderColumn className={styles.tickColumn}>
                      <FormattedMessage id="transactionsList.table.tick" />
                    </TableHeaderColumn>
                    <TableHeaderColumn className={styles.smallColumn}>
                      <FormattedMessage id="transactionsList.table.date" />
                    </TableHeaderColumn>
                    <TableHeaderColumn className={styles.largeColumn}>
                      <FormattedMessage id="transactionsList.table.label" />
                    </TableHeaderColumn>
                    <TableHeaderColumn className={styles.smallColumn}>
                      <FormattedMessage id="transactionsList.table.debit" />
                    </TableHeaderColumn>
                    <TableHeaderColumn className={styles.smallColumn}>
                      <FormattedMessage id="transactionsList.table.credit" />
                    </TableHeaderColumn>
                    <TableHeaderColumn className={styles.smallColumn} />
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={this.state.showCheckboxes}
                  deselectOnClickaway={this.state.deselectOnClickaway}
                  showRowHover={this.state.showRowHover}
                  stripedRows={this.state.stripedRows}
                  style={{ height: '100%' }}
                >
                  {this.renderTransactionsList(this.props.data)}
                </TableBody>
                <TableFooter adjustForCheckbox={this.state.showCheckboxes}>
                  <TableRow>
                    <TableRowColumn colSpan="4">
                      <AddTransaction
                        selectedAccount={this.props.selectedAccount}
                        createTransaction={this.createTransaction.bind(this)}
                      />
                    </TableRowColumn>
                    <TableRowColumn colSpan="1">
                      <Toggle
                        label="Display recurring"
                        onToggle={this.toggleRecurring.bind(this)}
                      />
                    </TableRowColumn>
                  </TableRow>
                </TableFooter>
              </Table>
              <Snackbar
                open={this.state.snackOpen}
                message={this.state.snackMessage}
                autoHideDuration={4000}
                onRequestClose={this.handleSnackClose.bind(this)}
              />
            </div>}
      </div>
    )
  }
}

TransactionsList.propTypes = {
  fetchTransactionsData: React.PropTypes.func,
  loaded: React.PropTypes.bool,
  data: React.PropTypes.any,
  token: React.PropTypes.string,
  selectedAccount: React.PropTypes.number
}
