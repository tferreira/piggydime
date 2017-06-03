import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import RecurrenceList from '../../components/RecurrenceList';
import AddRecurrence from '../../components/Modals/AddRecurrence.js'

import * as actionCreators from '../../actions/recurrence';

function mapStateToProps(state) {
  return {
    data: state.recurrence.data,
    token: state.auth.token,
    loaded: state.recurrence.loaded,
    accounts: state.accounts.data,
    accountsLoaded: state.accounts.loaded,
    isFetching: state.recurrence.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class RecurrenceContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectItems: [],
      selected: null,
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  handleAccountChange(event, index, selected) {
    this.setState({ selected });
  }

  fetchData() {
    const token = this.props.token;
    this.props.fetchRecurrenceData(token, this.state.selected);
  }

  createRecurrence(recurring_group) {
    const token = this.props.token;
    let call = async () =>
      await (await this.props.createRecurrence(token, recurring_group));
    call()
      .then(() => {
        this.fetchData();
      })
  }

  editRecurrence(recurring_group, callback) {
    const token = this.props.token;
    let call = async () =>
      await (await this.props.editRecurrence(token, recurring_group));
    call()
      .then(() => {
        callback(true);
        this.fetchData();
      })
  }

  deleteRecurrence(id, callback) {
    const token = this.props.token;
    let call = async () =>
      await (await this.props.deleteRecurrence(token, id));
    call()
      .then(() => {
        callback(true);
        this.fetchData();
      })
  }

  render() {
    if (!this.props.accountsLoaded) {
      return null;
    }
    const selectItems = this.props.accounts.map((account, key) => (
      <MenuItem key={key} value={account.id} primaryText={account.label} />
    ))
    return (
      <section>
        <div>
          <h2>Recurring transactions</h2>
          <SelectField
            value={this.state.selected}
            onChange={this.handleAccountChange.bind(this)}
            floatingLabelText="Selected account"
          >
            {selectItems}
          </SelectField>
          <AddRecurrence 
            selectedAccount={this.state.selected}
            createRecurrence={this.createRecurrence.bind(this)}
          />
          <RecurrenceList
            selectedAccount={this.state.selected}
            loaded={this.props.loaded}
            data={this.props.data}
            editRecurrence={this.editRecurrence.bind(this)}
            deleteRecurrence={this.deleteRecurrence.bind(this)}
          />
        </div>
      </section>
    )
  }
}

RecurrenceContainer.propTypes = {
  fetchRecurrenceData: React.PropTypes.func,
  loaded: React.PropTypes.bool,
  data: React.PropTypes.any,
  accounts: React.PropTypes.any,
  accountsLoaded: React.PropTypes.bool,
  token: React.PropTypes.string,
};
