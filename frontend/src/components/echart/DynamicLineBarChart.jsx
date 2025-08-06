import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

class DynamicBarChart extends Component {
  getOption = () => {
    const { title, subtext, xAxisData, barData } = this.props;

    return {
      title: {
        text: title || "Dynamic Data",
        subtext: subtext || "Bar Chart"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          label: {
            backgroundColor: "#283b56"
          }
        }
      },
      legend: {
        data: ["Data"]
      },
      color: ["#2196f3"],
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        data: xAxisData || []
      },
      yAxis: {
        type: "value",
        scale: true,
        name: "Value",
        max: "dataMax",
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
      series: [
        {
          name: "Data",
          type: "bar",
          itemStyle: {
            barBorderRadius: [15, 15, 0, 0]
          },
          data: barData || []
        }
      ]
    };
  };

  render() {
    return <ReactEcharts option={this.getOption()} style={{ height: "350px" }} />;
  }
}

export default DynamicBarChart;
