import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineOriginChart extends Component {
  render() {
    const { labels, dataPoints, labelName = "Dataset 1" } = this.props;

    const data = {
      labels: labels, // Dynamic labels
      datasets: [
        {
          label: labelName, // Dynamic dataset label
          data: dataPoints, // Dynamic data points
          borderWidth: 1,
          borderColor: "#00ACC1",
          backgroundColor: "#00ACC1",
          hoverborderColor: "#00ACC1",
          hoverBackgroundColor: "#00ACC1",
          fill: "origin"
        }
      ]
    };

    return (
      <Line
        data={data}
        height={300}
        responsive={true}
        options={{
          barValueSpacing: 20,
          maintainAspectRatio: false
        }}
      />
    );
  }
}

export default LineOriginChart;
