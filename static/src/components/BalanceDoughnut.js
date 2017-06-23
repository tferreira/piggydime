import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/balances';


function mapStateToProps(state) {
  return {
    data: state.balances.data,
    token: state.auth.token,
    loaded: state.balances.loaded,
    isFetching: state.balances.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class BalanceDoughnut extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const token = this.props.token;
    this.props.fetchChartsData(token);
  }

  renderAccountsList() {
    if (this.props.balances === null) {
      return
    }
    const rows = this.props.data.map((row) => {
      var filtered = this.props.balances.filter((element) => element.account_id === row.id)
      var balance = filtered[0].balance
      var projectedBalance = filtered[0].projected_balance
      return (
        <GridTile
          key={'account-' + row.id}
          title={row.label.concat(' - ', row.bank)}
          // titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          subtitle={<span><b>{Number(balance).toFixed(2)}</b>{' (' + Number(projectedBalance).toFixed(2) + ')'}</span>}
          actionIcon={<EditAccount fields={row} editAccount={this.editAccount.bind(this)} deleteAccount={this.deleteAccount.bind(this)} />}
          className={this.props.selectedAccount === row.id ? styles.gridTileSelected : styles.gridTile}
          cols={1}
          onTouchTap={(e) => {e.stopPropagation(); this.select(row.id);}}
        >
          <MiniChart currentAccount={row.id} />
        </GridTile>
      )
    })
    return rows
  }


  renderChart() {
    if (this.props.balances === null) {
      return
    }
    let chartData = {
      labels: [
        'Debit',
        'Credit'
      ],
      datasets: [{
        data: [50, 50],
        backgroundColor: [
        '#FF6384',
        '#36A2EB'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB'
        ]
      }]
    };

    return (
      <Doughnut data={chartData} redraw />
    )
  }

  render() {
    if (!this.props.loaded) {
      return null
    }
    return (
      <div>
        {this.renderChart()}
      </div>
    );
  }
}

MiniChart.propTypes = {
  fetchChartsData: React.PropTypes.func,
  loaded: React.PropTypes.bool,
  data: React.PropTypes.any,
  token: React.PropTypes.string,
};
