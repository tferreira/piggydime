import React from 'react';
import { Line } from 'react-chartjs-2';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/charts';


function mapStateToProps(state) {
  return {
    data: state.charts.data,
    token: state.auth.token,
    loaded: state.charts.loaded,
    isFetching: state.charts.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class MiniChart extends React.Component {
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
    this.props.fetchChartsData(token);
  }

  renderChart() {
    let positiveDots = Array(12).fill(0)
    let negativeDots = Array(12).fill(0)
    // positive dots
    this.props.data.map((chartData) => {
      if (chartData.account_id == this.props.currentAccount) {
        chartData['positive_data'].map((monthData) => {
          positiveDots[monthData.month] = parseInt(monthData.amount)
        })
      }
    })
    // negative dots
    this.props.data.map((chartData) => {
      if (chartData.account_id == this.props.currentAccount) {
        chartData['negative_data'].map((monthData) => {
          negativeDots[monthData.month] = parseInt(monthData.amount)
        })
      }
    })

    let chartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      elements: { point: { radius: 0 } },
      legend: {
        display: false
      },
       tooltips: {
        enabled: false
      },
      scales: {
        yAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false,
        }],
      },
    }

    let chartData = {
      chart: 'line',
      labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
      datasets: [{
        label: 'positive',
        data: positiveDots,
        backgroundColor: "#4575b5",
        borderColor: "#1C57A8",
        borderWidth: 1
      }, {
        label: 'negative',
        data: negativeDots,
        backgroundColor: "#FF1717",
        borderColor: "#da3e2f",
        borderWidth: 1
      }]
    }

    return (
      <Line data={chartData} options={chartOptions} width={220} height={100}/>
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
