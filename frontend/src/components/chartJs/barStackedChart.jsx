import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarStackChart extends Component {
  render() {
    const { labels, datasets } = this.props;

    const data = {
      labels: labels, // Dynamic labels
      datasets: datasets // Dynamic datasets
    };

    return (
      <Bar
        data={data}
        height={340}
        options={{
          barValueSpacing: 20,
          scales: {
            xAxes: [
              {
                stacked: true
              }
            ],
            yAxes: [
              {
                stacked: true
              }
            ]
          }
        }}
      />
    );
  }
}

export default BarStackChart;
