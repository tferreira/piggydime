import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import styles from './styles.scss';

export default class AddTransaction extends React.Component {
  state = {
    open: false,
    disabled: true,
    label_error_text: null,
    amount_error_text: null,
    dateValue: null,
    labelValue: '',
    amountValue: '',
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  changeValue(e, type) {
    const value = e.target.value;
    const next_state = {};
    next_state[type] = value;
    this.setState(next_state, () => {
      this.isDisabled();
    });
  }

  changeDateValue(date, type) {
    const value = date
    const next_state = {};
    next_state[type] = value;
    this.setState(next_state, () => {
      this.isDisabled();
    });
  }

  isCurrency(amount) {
    let amountAsNum = +amount;
    return !isNaN(amountAsNum)
  }

  isDisabled() {
    let date_is_valid = false;
    let label_is_valid = false;
    let amount_is_valid = false;
    if (this.state.dateValue !== null) {
      date_is_valid = true;
    }

    if (this.state.labelValue === '') {
      this.setState({
        label_error_text: 'Label is mandatory.',
      })
    } else {
      this.setState({
        label_error_text: null,
      });
      label_is_valid = true
    }

    if (this.state.amountValue === '') {
      this.setState({
        amount_error_text: 'Amount is mandatory.',
      });
    } else if (!this.isCurrency(this.state.amountValue)) {
      this.setState({
        amount_error_text: 'Amount should be a number.',
      });
    } else {
      this.setState({
        amount_error_text: null,
      });
      amount_is_valid = true
    }

    if (date_is_valid && label_is_valid && amount_is_valid) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  onSubmit = () => {
    if (!this.state.disabled) {
      var dateObject = this.state.dateValue;
      var date = new Date(dateObject.getTime() - (dateObject.getTimezoneOffset() * 60000)).toISOString().substring(0, 10);
      this.props.createTransaction({
        accountId: this.props.selectedAccount,
        date: date,
        label: this.state.labelValue,
        amount: Number(this.state.amountValue).toFixed(2),
        recurrentGroupId: null
      });
      this.handleClose();
    }
  };

  render() {
    const actions = [
      <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.handleClose}
      />,
      <FlatButton
      label="Add"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.onSubmit}
      disabled={this.state.disabled}
      />,
    ];

    return (
      <div>
      <RaisedButton label="Add transaction" fullWidth={true} primary={true} onTouchTap={this.handleOpen} />
      <Dialog
        title="Add transaction"
        actions={actions}
        modal={false}
        className={styles.dialog}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div>
          <DatePicker
          floatingLabelText="Date"
          hintText="Transaction date"
          mode="landscape"
          autoOk={true}
          container="inline"
          errorText={this.state.date_error_text}
          onChange={(e, date) => this.changeDateValue(date, 'dateValue')}
          />
          <br />
          <TextField
          floatingLabelText="Label"
          hintText="Enter description here"
          errorText={this.state.label_error_text}
          onChange={(e) => this.changeValue(e, 'labelValue')}
          /><br />
          <TextField
          floatingLabelText="Amount"
          hintText="Use -00.00 for debit transactions"
          errorText={this.state.amount_error_text}
          onChange={(e) => this.changeValue(e, 'amountValue')}
          /><br />
        </div>
      </Dialog>
      </div>
    );
  }
}