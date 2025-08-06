import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineInterpolationChart extends Component {
  render() {
    const { data } = this.props;

    return (
      <Line
        data={data}
        height={300}
        responsive={true}
        options={{
          barValueSpacing: 20,
          maintainAspectRatio: false,
        }}
      />
    );
  }
}

export default LineInterpolationChart;
