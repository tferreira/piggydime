import React from 'react';
import Paper from 'material-ui/Paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as accountsActions from '../../actions/accounts';
import * as balancesActions from '../../actions/balances';

import styles from './styles.scss';

function mapStateToProps(state) {
  return {
    data: state.accounts.data,
    token: state.auth.token,
    loaded: state.accounts.loaded,
    isFetching: state.accounts.isFetching,
    selectedAccount: state.accounts.selectedAccount,
    balances: state.balances.data,
    balancesLoaded: state.balances.loaded,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      accounts: bindActionCreators(accountsActions, dispatch),
      balances: bindActionCreators(balancesActions, dispatch),
    }
  };
}

const paperStyle = {
  height: 200,
  width: 350,
  margin: 20,
  display: 'inline-block',
}

@connect(mapStateToProps, mapDispatchToProps)
export default class WelcomeTiles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  select = (id) => {
    this.props.selectAccount(id)
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const token = this.props.token;
    this.props.actions.accounts.fetchAccountsData(token);
    this.props.actions.balances.fetchBalancesData(token);
  }

  renderTiles() {
    const tiles = this.props.data.map((row) => {
      var filtered = this.props.balances.filter((element) => element.account_id === row.id)
      var balance = filtered[0].balance
      var projectedBalance = filtered[0].projected_balance
      const content = (
        <div className={styles.paperBody}>
          {row.label.concat(' - ', row.bank)} has a current balance of <mark>{Number(balance).toFixed(2)}</mark>
          <br /><br />
          Projected balance at {(new Date(row.projected_date)).toISOString().slice(0,10)}: <mark>{Number(projectedBalance).toFixed(2)}</mark>
        </div>
      )
      return (
        <Paper style={paperStyle} zDepth={3} children={content} />
      )
    })
    // TODO: Add random tip tiles afterwards
    return tiles
  }

  render() {
    return (
      <div className={styles.tilesContainer}>
      {!this.props.loaded || !this.props.balancesLoaded
        ? <h1>Loading data...</h1>
        :
        this.renderTiles()
      }
      </div>
    );
  }
}

WelcomeTiles.propTypes = {
  fetchAccountsData: React.PropTypes.func,
  loaded: React.PropTypes.bool,
  data: React.PropTypes.any,
  token: React.PropTypes.string,
  selectedAccount: React.PropTypes.number,
};
