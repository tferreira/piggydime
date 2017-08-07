import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import ContentAdd from 'material-ui-icons/ContentAdd'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

import styles from './styles.scss'

const initialState = {
  open: false,
  disabled: true,
  label_error_text: null,
  amount_error_text: null,
  recurrence_day_error_text: null,
  recurrence_month_error_text: null,
  labelValue: '',
  amountValue: '',
  startDateValue: null,
  endDateValue: null,
  recurrenceDayValue: null,
  recurrenceMonthValue: null
}

class AddRecurrence extends React.Component {
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
    let start_date_is_valid = false
    let end_date_is_valid = false
    let label_is_valid = false
    let amount_is_valid = false
    let recurrence_day_is_valid = false
    let recurrence_month_is_valid = false

    if (this.state.startDateValue !== null) {
      start_date_is_valid = true
    }
    if (this.state.endDateValue !== null) {
      end_date_is_valid = true
    }
    if (this.state.labelValue === '') {
      stateToUpdate['label_error_text'] = (
        <FormattedMessage id="addRecurrence.modal.label_error_text" />
      )
    } else {
      stateToUpdate['label_error_text'] = null
      label_is_valid = true
    }
    if (this.state.amountValue === '') {
      stateToUpdate['amount_error_text'] = (
        <FormattedMessage id="addRecurrence.modal.amount_error_text.empty" />
      )
    } else if (!this.isCurrency(this.state.amountValue)) {
      stateToUpdate['amount_error_text'] = (
        <FormattedMessage id="addRecurrence.modal.amount_error_text.invalid" />
      )
    } else {
      stateToUpdate['amount_error_text'] = null
      amount_is_valid = true
    }

    if (this.state.recurrenceDayValue === '') {
      stateToUpdate['recurrence_day_error_text'] = (
        <FormattedMessage id="addRecurrence.modal.recurrence_day_error_text.empty" />
      )
    } else if (
      this.state.recurrenceDayValue < 1 ||
      this.state.recurrenceDayValue > 31
    ) {
      stateToUpdate['recurrence_day_error_text'] = (
        <FormattedMessage id="addRecurrence.modal.recurrence_day_error_text.invalid" />
      )
    } else {
      stateToUpdate['recurrence_day_error_text'] = null
      recurrence_day_is_valid = true
    }

    if (this.state.recurrenceMonthValue === null) {
      stateToUpdate['recurrence_month_error_text'] = null
      recurrence_month_is_valid = true
    } else if (
      this.state.recurrenceMonthValue < 1 ||
      this.state.recurrenceMonthValue > 12
    ) {
      stateToUpdate['recurrence_month_error_text'] = (
        <FormattedMessage id="addRecurrence.modal.recurrence_month_error_text" />
      )
    } else {
      stateToUpdate['recurrence_month_error_text'] = null
      recurrence_month_is_valid = true
    }

    if (
      start_date_is_valid &&
      end_date_is_valid &&
      label_is_valid &&
      amount_is_valid &&
      recurrence_day_is_valid &&
      recurrence_month_is_valid
    ) {
      stateToUpdate['disabled'] = false
    } else {
      stateToUpdate['disabled'] = true
    }

    this.setState(stateToUpdate)
  }

  onSubmit = () => {
    if (!this.state.disabled) {
      var startDateObject = new Date(this.state.startDateValue)
      var endDateObject = new Date(this.state.endDateValue)
      var startDate = new Date(
        startDateObject.getTime() - startDateObject.getTimezoneOffset() * 60000
      )
        .toISOString()
        .substring(0, 10)
      var endDate = new Date(
        endDateObject.getTime() - endDateObject.getTimezoneOffset() * 60000
      )
        .toISOString()
        .substring(0, 10)
      this.props.createRecurrence({
        accountId: this.props.selectedAccount,
        label: this.state.labelValue,
        start_date: startDate,
        end_date: endDate,
        amount: Number(this.state.amountValue).toFixed(2),
        recurrence_day: this.state.recurrenceDayValue,
        recurrence_month: this.state.recurrenceMonthValue
      })
      this.handleClose()
    }
  }

  render() {
    if (
      this.props.selectedAccount === undefined ||
      this.props.selectedAccount === null
    ) {
      return null
    }

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
          fab
          mini={true}
          className={styles.addRecurrenceButton}
          onTouchTap={this.handleOpen}
        >
          <ContentAdd />
        </Button>
        <Dialog
          title={this.props.intl.formatMessage({
            id: 'addRecurrence.modal.title'
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
                <FormattedMessage id="addRecurrence.modal.from" />
              }
              mode="landscape"
              autoOk={true}
              container="inline"
              onChange={(e, date) =>
                this.changeDateValue(date, 'startDateValue')}
            />
            <DatePicker
              floatingLabelText={
                <FormattedMessage id="addRecurrence.modal.until" />
              }
              mode="landscape"
              autoOk={true}
              container="inline"
              onChange={(e, date) => this.changeDateValue(date, 'endDateValue')}
            />
            <br />
            <TextField
              floatingLabelText={
                <FormattedMessage id="addRecurrence.modal.label" />
              }
              hintText={
                <FormattedMessage id="addRecurrence.modal.label_hint" />
              }
              errorText={this.state.label_error_text}
              onChange={e => this.changeValue(e, 'labelValue')}
            />
            <br />
            <TextField
              floatingLabelText={
                <FormattedMessage id="addRecurrence.modal.amount" />
              }
              hintText={
                <FormattedMessage id="addRecurrence.modal.amount_hint" />
              }
              errorText={this.state.amount_error_text}
              onChange={e => this.changeValue(e, 'amountValue')}
            />
            <br />
            <TextField
              floatingLabelText={
                <FormattedMessage id="addRecurrence.modal.day_of_month" />
              }
              hintText={
                <FormattedMessage id="addRecurrence.modal.day_of_month_hint" />
              }
              errorText={this.state.recurrence_day_error_text}
              onChange={e => this.changeValue(e, 'recurrenceDayValue')}
            />
            <br />
            <TextField
              floatingLabelText={
                <FormattedMessage id="addRecurrence.modal.month_of_year" />
              }
              hintText={
                <FormattedMessage id="addRecurrence.modal.month_of_year_hint" />
              }
              errorText={this.state.recurrence_month_error_text}
              onChange={e => this.changeValue(e, 'recurrenceMonthValue')}
              multiLine={true}
            />
            <br />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default injectIntl(AddRecurrence)
