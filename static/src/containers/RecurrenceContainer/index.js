import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/recurrence';

function mapStateToProps(state) {
  return {
    data: state.recurrence.data,
    token: state.auth.token,
    loaded: state.recurrence.loaded,
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
    }
  }

  componentWillMount() {
    this.fetchData();
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
    return (
      <section>
        <div>

        </div>
      </section>
    )
  }
}

RecurrenceContainer.propTypes = {
  fetchRecurrenceData: React.PropTypes.func,
  loaded: React.PropTypes.bool,
  data: React.PropTypes.any,
  token: React.PropTypes.string,
};
