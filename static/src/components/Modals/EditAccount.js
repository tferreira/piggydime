import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import Edit from 'material-ui/svg-icons/image/edit';
import TextField from 'material-ui/TextField';

import styles from './styles.scss';

export default class EditAccount extends React.Component {
  state = {
    open: false,
    disabled: true,
    label_error_text: null,
    bank_error_text: null,
    iban_error_text: null,
    bic_error_text: null,
    id: this.props.fields.id,
    labelValue: this.props.fields.label,
    bankValue: this.props.fields.bank,
    ibanValue: this.props.fields.iban,
    bicValue: this.props.fields.bic,
    projectedDateValue: this.props.fields.projected_date,
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
    const value = date;
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
    let projected_date_is_valid = false;

    if (this.state.projectedDateValue !== null) {
      projected_date_is_valid = true;
    }

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

    if (label_is_valid && bank_is_valid && iban_is_valid && bic_is_valid && projected_date_is_valid) {
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
      var projectedDateObject = new Date(this.state.projectedDateValue);
      var projectedDate = new Date(projectedDateObject.getTime() - (projectedDateObject.getTimezoneOffset() * 60000)).toISOString().substring(0, 10);
      this.props.editAccount({
        id: this.state.id,
        label: this.state.labelValue,
        bank: this.state.bankValue,
        iban: this.state.ibanValue,
        bic: this.state.bicValue,
        projected_date: projectedDate,
      });
      this.handleClose();
    }
  };

  onDelete = () => {
    this.props.deleteAccount({
      id: this.state.id
    });
    this.handleClose();
  };

  render() {
    const actions = [
      <RaisedButton
      label="Delete"
      secondary={true}
      onTouchTap={this.onDelete}
      />,
      <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.handleClose}
      />,
      <FlatButton
      label="Save"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.onSubmit}
      disabled={this.state.disabled}
      />,
    ];

    return (
      <div>
      <IconButton onTouchTap={(e) => {e.stopPropagation(); this.handleOpen();}}><Edit color="white" /></IconButton>
      <Dialog
        title="Edit account"
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
          defaultValue={this.state.labelValue}
          /><br />
          <TextField
          floatingLabelText="Bank"
          errorText={this.state.email_error_text}
          onChange={(e) => this.changeValue(e, 'bankValue')}
          defaultValue={this.state.bankValue}
          /><br />
          <TextField
          floatingLabelText="IBAN"
          errorText={this.state.iban_error_text}
          onChange={(e) => this.changeValue(e, 'ibanValue')}
          defaultValue={this.state.ibanValue}
          /><br />
          <TextField
          floatingLabelText="BIC"
          errorText={this.state.bic_error_text}
          onChange={(e) => this.changeValue(e, 'bicValue')}
          defaultValue={this.state.bicValue}
          /><br />
          <DatePicker
          floatingLabelText="Projected balance date"
          mode="landscape"
          autoOk={true}
          container="inline"
          onChange={(e, date) => this.changeDateValue(date, 'projectedDateValue')}
          value={new Date(this.state.projectedDateValue)}
          /><br />
        </div>
      </Dialog>
      </div>
    );
  }
}