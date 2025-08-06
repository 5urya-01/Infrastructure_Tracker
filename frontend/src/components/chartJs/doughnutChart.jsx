import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";

class DoughnutChart extends Component {
  render() {
    const { labels, data } = this.props; // Destructure labels and data from props

    const chartData = {
      labels: labels, // Use the labels prop for chart labels
      datasets: [
        {
          data: data, // Use the data prop for chart data
          backgroundColor: ["#4caf50", "#FF9800", "#f44336"], // Customize colors
          hoverBackgroundColor: ["#4caf50", "#FF9800", "#f44336"],
        },
      ],
    };

    return (
      <Doughnut
        data={chartData}
        responsive={true}
        height={300}
        options={{
          maintainAspectRatio: false,
        }}
      />
    );
  }
}

// Define prop types for the component
DoughnutChart.propTypes = {
  labels: PropTypes.array.isRequired, // Array of labels
  data: PropTypes.array.isRequired,   // Array of data values
};

export default DoughnutChart;
