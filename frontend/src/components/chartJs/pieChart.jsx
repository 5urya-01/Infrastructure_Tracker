import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class PieChart extends Component {
  render() {
    return (
      <Pie
        data={this.props.data}
        responsive={true}
        height={300}
        options={{
          maintainAspectRatio: false
        }}
      />
    );

    };
    
  }

export default PieChart;
