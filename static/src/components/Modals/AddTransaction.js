import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import styles from './styles.scss';

export default class AddTransaction extends React.Component {
  state = {
    open: false,
    disabled: true,
    date_error_text: null,
    label_error_text: null,
    amount_error_text: null,
    dateValue: '',
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

  isDisabled() {
    let date_is_valid = false;
    let label_is_valid = false;
    let amount_is_valid = false;

    if (this.state.dateValue === '') {
      this.setState({
      date_error_text: null,
      });
    } else {
      date_is_valid = true;
    }

    if (this.state.labelValue === '') {
      this.setState({
      label_error_text: null,
      });
    } else {
      label_is_valid = true;
    }

    if (this.state.amountValue === '') {
      this.setState({
      amount_error_text: null,
      });
    } else if (this.state.amountValue.length <= 20) {
      amount_is_valid = true;
      this.setState({
      amount_error_text: null,
      });
    } else {
      this.setState({
      amount_error_text: 'This amount is too large.',
      });
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
      this.props.createTransaction({
      transaction_id: 0, //todo generate UUID
      date: this.state.dateValue,
      label: this.state.labelValue,
      amount: this.state.amountValue
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
          <TextField
          floatingLabelText="Label"
          errorText={this.state.label_error_text}
          onChange={(e) => this.changeValue(e, 'labelValue')}
          /><br />
          <TextField
          floatingLabelText="Date"
          errorText={this.state.date_error_text}
          onChange={(e) => this.changeValue(e, 'dateValue')}
          /><br />
          <TextField
          floatingLabelText="Amount"
          errorText={this.state.amount_error_text}
          onChange={(e) => this.changeValue(e, 'amountValue')}
          /><br />
        </div>
      </Dialog>
      </div>
    );
  }
}