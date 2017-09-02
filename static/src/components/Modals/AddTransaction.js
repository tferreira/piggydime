import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

import styles from './styles.scss'

const initialState = {
  open: false,
  disabled: true,
  label_error_text: null,
  amount_error_text: null,
  dateValue: null,
  labelValue: '',
  amountValue: ''
}

class AddTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState(initialState)
  }

  changeValue(e, type) {
    const value = e.target.value
    const next_state = {}
    next_state[type] = value
    this.setState(next_state, () => {
      this.isDisabled()
    })
  }

  changeDateValue(date, type) {
    const value = date
    const next_state = {}
    next_state[type] = value
    this.setState(next_state, () => {
      this.isDisabled()
    })
  }

  isCurrency(amount) {
    let amountAsNum = +amount
    return !isNaN(amountAsNum)
  }

  isDisabled() {
    let stateToUpdate = {}
    let date_is_valid = false
    let label_is_valid = false
    let amount_is_valid = false

    if (this.state.dateValue !== null) {
      date_is_valid = true
    }

    if (this.state.labelValue === '') {
      stateToUpdate['label_error_text'] = (
        <FormattedMessage id="addTransaction.modal.label_error_text" />
      )
    } else {
      stateToUpdate['label_error_text'] = null
      label_is_valid = true
    }

    if (this.state.amountValue === '') {
      stateToUpdate['amount_error_text'] = (
        <FormattedMessage id="addTransaction.modal.amount_error_text.empty" />
      )
    } else if (!this.isCurrency(this.state.amountValue)) {
      stateToUpdate['amount_error_text'] = (
        <FormattedMessage id="addTransaction.modal.amount_error_text.invalid" />
      )
    } else {
      stateToUpdate['amount_error_text'] = null
      amount_is_valid = true
    }

    if (date_is_valid && label_is_valid && amount_is_valid) {
      stateToUpdate['disabled'] = false
    } else {
      stateToUpdate['disabled'] = true
    }

    this.setState(stateToUpdate)
  }

  onSubmit = () => {
    if (!this.state.disabled) {
      var dateObject = new Date(this.state.dateValue)
      var date = new Date(
        dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
      )
        .toISOString()
        .substring(0, 10)
      this.props.createTransaction({
        accountId: this.props.selectedAccount,
        date: date,
        label: this.state.labelValue,
        amount: Number(this.state.amountValue).toFixed(2),
        recurringGroupId: null
      })
      this.handleClose()
    }
  }

  render() {
    const actions = [
      <Button
        flat
        label={<FormattedMessage id="buttons.cancel" />}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <Button
        flat
        label={<FormattedMessage id="buttons.add" />}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onSubmit}
        disabled={this.state.disabled}
      />
    ]

    return (
      <div>
        <Button
          raised
          label={<FormattedMessage id="addTransaction.buttons.add" />}
          fullWidth={true}
          primary={true}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title={this.props.intl.formatMessage({
            id: 'addTransaction.modal.title'
          })}
          actions={actions}
          modal={false}
          className={styles.dialog}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div>
            <DatePicker
              floatingLabelText={
                <FormattedMessage id="addTransaction.modal.date" />
              }
              hintText={
                <FormattedMessage id="addTransaction.modal.date_hint" />
              }
              mode="landscape"
              autoOk={true}
              container="inline"
              onChange={(e, date) => this.changeDateValue(date, 'dateValue')}
            />
            <br />
            <TextField
              floatingLabelText={
                <FormattedMessage id="addTransaction.modal.label" />
              }
              hintText={
                <FormattedMessage id="addTransaction.modal.label_hint" />
              }
              errorText={this.state.label_error_text}
              onChange={e => this.changeValue(e, 'labelValue')}
            />
            <br />
            <TextField
              floatingLabelText={
                <FormattedMessage id="addTransaction.modal.amount" />
              }
              hintText={
                <FormattedMessage id="addTransaction.modal.amount_hint" />
              }
              errorText={this.state.amount_error_text}
              onChange={e => this.changeValue(e, 'amountValue')}
            />
            <br />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default injectIntl(AddTransaction)
