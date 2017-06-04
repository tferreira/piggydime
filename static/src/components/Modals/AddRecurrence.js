import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import styles from './styles.scss';

export default class AddRecurrence extends React.Component {
  state = {
    open: false,
    disabled: true,
    label_error_text: null,
    amount_error_text: null,
    recurrence_day_error_text: null,
    labelValue: '',
    amountValue: '',
    startDateValue: null,
    endDateValue: null,
    recurrenceDayValue: null,
    recurrencePeriodValue: 'monthly',
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
    let start_date_is_valid = false;
    let end_date_is_valid = false;
    let label_is_valid = false;
    let amount_is_valid = false;
    let recurrence_day_is_valid = false;

    if (this.state.startDateValue !== null) {
      start_date_is_valid = true;
    }
    if (this.state.endDateValue !== null) {
      end_date_is_valid = true;
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

    if (this.state.recurrenceDay === '') {
      this.setState({
        recurrence_day_error_text: 'Day of month is mandatory.',
      });
    } else if (this.state.recurrenceDay < 1 || this.state.recurrenceDay > 31) {
      this.setState({
        recurrence_day_error_text: 'Day of month should be between 1 and 31.',
      });
    } else {
      this.setState({
        recurrence_day_error_text: null,
      });
      recurrence_day_is_valid = true
    }

    if (start_date_is_valid
      && end_date_is_valid
      && label_is_valid
      && amount_is_valid
      && recurrence_day_is_valid) {
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
      var startDateObject = new Date(this.state.startDateValue);
      var endDateObject = new Date(this.state.endDateValue);
      var startDate = new Date(startDateObject.getTime() - (startDateObject.getTimezoneOffset() * 60000)).toISOString().substring(0, 10);
      var endDate = new Date(endDateObject.getTime() - (endDateObject.getTimezoneOffset() * 60000)).toISOString().substring(0, 10);
      this.props.createRecurrence({
        accountId: this.props.selectedAccount,
        label: this.state.labelValue,
        start_date: startDate,
        end_date: endDate,
        amount: Number(this.state.amountValue).toFixed(2),
        recurrence_day: this.state.recurrenceDayValue,
        recurrence_period: this.state.recurrencePeriodValue,
      });
      this.handleClose();
    }
  };

  render() {
    if (this.props.selectedAccount === undefined || this.props.selectedAccount === null) {
      return null
    }

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
        <FloatingActionButton mini={true} className={styles.addRecurrenceButton} onTouchTap={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add recurring transaction"
          actions={actions}
          modal={false}
          className={styles.dialog}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <div>
          <DatePicker
          floatingLabelText="From"
          mode="landscape"
          autoOk={true}
          container="inline"
          onChange={(e, date) => this.changeDateValue(date, 'startDateValue')}
          />
          <DatePicker
          floatingLabelText="Until"
          mode="landscape"
          autoOk={true}
          container="inline"
          onChange={(e, date) => this.changeDateValue(date, 'endDateValue')}
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
          <TextField
          floatingLabelText="Day of month"
          hintText="Between 1 and 31"
          errorText={this.state.recurrence_day_error_text}
          onChange={(e) => this.changeValue(e, 'recurrenceDayValue')}
          /><br />
        </div>
        </Dialog>
      </div>
    );
  }
}