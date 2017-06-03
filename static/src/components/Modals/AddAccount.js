import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

import styles from './styles.scss';

export default class AddAccount extends React.Component {
  state = {
    open: false,
    disabled: true,
    label_error_text: null,
    bank_error_text: null,
    iban_error_text: null,
    bic_error_text: null,
    labelValue: '',
    bankValue: '',
    ibanValue: '',
    bicValue: ''
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
    let label_is_valid = false;
    let bank_is_valid = false;
    let iban_is_valid = false;
    let bic_is_valid = false;

    if (this.state.labelValue === '') {
      this.setState({
      email_error_text: null,
      });
    } else {
      label_is_valid = true;
    }

    if (this.state.bankValue === '') {
      this.setState({
      email_error_text: null,
      });
    } else {
      bank_is_valid = true;
    }

    if (this.state.ibanValue === '') {
      this.setState({
      iban_error_text: null,
      });
    } else if (this.state.ibanValue.length <= 34) {
      iban_is_valid = true;
      this.setState({
      iban_error_text: null,
      });
    } else {
      this.setState({
      iban_error_text: 'Your IBAN can have 34 characters max.',
      });
    }

    if (this.state.bicValue.length <= 12) {
      bic_is_valid = true;
      this.setState({
      bic_error_text: null,
      });
    } else {
      this.setState({
      bic_error_text: 'Your BIC can have 12 characters max.',
      });
    }

    if (label_is_valid && bank_is_valid && iban_is_valid && bic_is_valid) {
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
      this.props.createAccount({
      label: this.state.labelValue,
      bank: this.state.bankValue,
      iban: this.state.ibanValue,
      bic: this.state.bicValue
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
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.onSubmit}
      disabled={this.state.disabled}
      />,
    ];

    return (
      <div>
      <FloatingActionButton mini={true} className={styles.addAccountButton} onTouchTap={this.handleOpen}>
        <ContentAdd />
      </FloatingActionButton>
      <Dialog
        title="Add account"
        actions={actions}
        modal={false}
        className={styles.dialog}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
      >
        <div>
          <TextField
          floatingLabelText="Label"
          errorText={this.state.email_error_text}
          onChange={(e) => this.changeValue(e, 'labelValue')}
          /><br />
          <TextField
          floatingLabelText="Bank"
          errorText={this.state.email_error_text}
          onChange={(e) => this.changeValue(e, 'bankValue')}
          /><br />
          <TextField
          floatingLabelText="IBAN"
          errorText={this.state.iban_error_text}
          onChange={(e) => this.changeValue(e, 'ibanValue')}
          /><br />
          <TextField
          floatingLabelText="BIC"
          errorText={this.state.bic_error_text}
          onChange={(e) => this.changeValue(e, 'bicValue')}
          /><br />
        </div>
      </Dialog>
      </div>
    );
  }
}