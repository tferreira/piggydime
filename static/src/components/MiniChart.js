import React from 'react';
import { Line } from 'react-chartjs';
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

      // bezierCurve: false, //remove curves from your plot
      // scaleShowLabels : false, //remove labels
      // tooltipEvents: [], //remove trigger from tooltips so they will'nt be show
      // pointDot : false, //remove the points markers
      // scaleShowGridLines: true //set to false to remove the grids background

    let chartOptions = {
      maintainAspectRatio: false
    }

    let chartData = {
      datasets: [{
        label: 'positive',
        data: positiveDots,
      }, {
        label: 'negative',
        data: negativeDots,
      }]
    }

    return (
      <Line data={chartData} width={220} height={100}/>
    )
  }

  render() {
    if (!this.props.loaded && !this.props.isFetching) {
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
