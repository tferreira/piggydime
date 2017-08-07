import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import DatePicker from 'material-ui/DatePicker'
import ContentAdd from 'material-ui-icons/ContentAdd'
import TextField from 'material-ui/TextField'

import styles from './styles.scss'

const initialState = {
  open: false,
  disabled: true,
  label_error_text: null,
  bank_error_text: null,
  iban_error_text: null,
  bic_error_text: null,
  labelValue: '',
  bankValue: '',
  ibanValue: '',
  bicValue: '',
  projectedDateValue: null
}

class AddAccount extends React.Component {
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

  isDisabled() {
    let stateToUpdate = {}
    let label_is_valid = false
    let bank_is_valid = false
    let iban_is_valid = false
    let bic_is_valid = false
    let projected_date_is_valid = false

    if (this.state.projectedDateValue !== null) {
      projected_date_is_valid = true
    }

    if (this.state.labelValue === '') {
      stateToUpdate['email_error_text'] = null
    } else {
      label_is_valid = true
    }

    if (this.state.bankValue === '') {
      stateToUpdate['bank_error_text'] = null
    } else {
      bank_is_valid = true
    }

    if (this.state.ibanValue === '') {
      stateToUpdate['iban_error_text'] = null
    } else if (this.state.ibanValue.length <= 34) {
      iban_is_valid = true
      stateToUpdate['iban_error_text'] = null
    } else {
      stateToUpdate['iban_error_text'] = (
        <FormattedMessage id="addAccount.modal.iban_error_text" />
      )
    }

    if (this.state.bicValue.length <= 12) {
      bic_is_valid = true
      stateToUpdate['bic_error_text'] = null
    } else {
      stateToUpdate['bic_error_text'] = (
        <FormattedMessage id="addAccount.modal.bic_error_text" />
      )
    }

    if (
      label_is_valid &&
      bank_is_valid &&
      iban_is_valid &&
      bic_is_valid &&
      projected_date_is_valid
    ) {
      stateToUpdate['disabled'] = false
    } else {
      stateToUpdate['disabled'] = true
    }

    this.setState(stateToUpdate)
  }

  onSubmit = () => {
    if (!this.state.disabled) {
      var projectedDateObject = new Date(this.state.projectedDateValue)
      var projectedDate = new Date(
        projectedDateObject.getTime() -
          projectedDateObject.getTimezoneOffset() * 60000
      )
        .toISOString()
        .substring(0, 10)
      this.props.createAccount({
        label: this.state.labelValue,
        bank: this.state.bankValue,
        iban: this.state.ibanValue,
        bic: this.state.bicValue,
        projected_date: projectedDate
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
          fab
          mini={true}
          className={styles.addAccountButton}
          onTouchTap={this.handleOpen}
        >
          <ContentAdd />
        </Button>
        <Dialog
          title={this.props.intl.formatMessage({
            id: 'addAccount.modal.title'
          })}
          actions={actions}
          modal={false}
          className={styles.dialog}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div>
            <TextField
              floatingLabelText={
                <FormattedMessage id="addAccount.modal.label" />
              }
              errorText={this.state.email_error_text}
              onChange={e => this.changeValue(e, 'labelValue')}
            />
            <br />
            <TextField
              floatingLabelText={
                <FormattedMessage id="addAccount.modal.bank" />
              }
              errorText={this.state.email_error_text}
              onChange={e => this.changeValue(e, 'bankValue')}
            />
            <br />
            <TextField
              floatingLabelText={
                <FormattedMessage id="addAccount.modal.IBAN" />
              }
              errorText={this.state.iban_error_text}
              onChange={e => this.changeValue(e, 'ibanValue')}
            />
            <br />
            <TextField
              floatingLabelText={<FormattedMessage id="addAccount.modal.BIC" />}
              errorText={this.state.bic_error_text}
              onChange={e => this.changeValue(e, 'bicValue')}
            />
            <br />
            <DatePicker
              floatingLabelText={
                <FormattedMessage id="addAccount.modal.projected_date" />
              }
              mode="landscape"
              autoOk={true}
              container="inline"
              onChange={(e, date) =>
                this.changeDateValue(date, 'projectedDateValue')}
            />
            <br />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default injectIntl(AddAccount)
