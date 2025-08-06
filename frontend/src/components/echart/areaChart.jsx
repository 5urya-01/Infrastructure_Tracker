import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';

class AreaChart extends Component {
  getOption = () => {
    const { categories, data } = this.props; // Destructure categories and data from props

    return {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: categories, // Use the categories prop for x-axis data
      },
      yAxis: {
        type: 'value',
      },
      color: "#2196f3",
      series: [{
        data: data, // Use the data prop for series data
        type: 'line',
      }],
    };
  };

  render() {
    return <ReactEcharts option={this.getOption()} style={{ height: '300px' }} />;
  }
}

// Define prop types for the component
AreaChart.propTypes = {
  categories: PropTypes.array.isRequired, // Array of x-axis labels
  data: PropTypes.array.isRequired, // Array of y-axis data values
};

export default AreaChart;
