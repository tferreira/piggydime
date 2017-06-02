import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import RecurrenceList from '../../components/RecurrenceList';

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
    this.props.fetchRecurrenceData(token);
  }

  createRecurrence( recurring_group ) {
    const token = this.props.token;
    let call = async () =>
      await (await this.props.createRecurrence(token, recurring_group));
    call()
      .then(() => {
        this.fetchData();
      })
  }

  editRecurrence( transaction ) {
    const token = this.props.token;
    let call = async () =>
      await (await this.props.editRecurrence(token, recurring_group));
    call()
      .then(() => {
        this.fetchData();
      })
  }

  deleteRecurrence( id ) {
    const token = this.props.token;
    let call = async () =>
      await (await this.props.deleteRecurrence(token, id));
    call()
      .then(() => {
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
          <hr />
          Filter them by selecting account on the dropdown list
          <br />
          <SelectField
            value={this.state.selected}
            onChange={this.handleAccountChange.bind(this)}
            floatingLabelText="Selected account"
          >
            {selectItems}
          </SelectField>
          <RecurrenceList selectedAccount={this.state.selected} loaded={this.props.loaded} data={this.props.data} />
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
