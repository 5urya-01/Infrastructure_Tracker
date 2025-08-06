import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

class BarBasicColumnChart extends Component {
  getOption = () => {
    const { title = "Bar Chart", subtext = "Basic Column Chart", legendData = ["Data1", "Data2"], xAxisData = [], seriesData = [] } = this.props;

    return {
      title: {
        text: title,
        subtext: subtext
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: legendData
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      color: ["#7759de", "#2196f3"],
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value}"
          }
        }
      ],
      series: seriesData
    };
  };

  render() {
    return <ReactEcharts option={this.getOption()} style={{ height: "300px" }} />;
  }
}

export default BarBasicColumnChart;
