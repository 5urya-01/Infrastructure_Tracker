import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChartJs extends Component {
  render() {
    const { data, height } = this.props;

    return (
      <Bar
        data={data}
        height={height}
        options={{
          barValueSpacing: 10,
        }}
      />
    );
  }
}

export default BarChartJs;
