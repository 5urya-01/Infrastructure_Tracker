import React, { PureComponent, createRef } from "react";
import PropTypes from "prop-types";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

class StaticLegendPieChart extends PureComponent {
  constructor(props) {
    super(props);
    this.chartDB = createRef();
  }

  componentDidMount() {
    this.initChart();
  }

  componentDidUpdate(prevProps) {
    // Update the chart data if the data prop changes
    if (prevProps.data !== this.props.data) {
      this.chart.data = this.props.data;
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  initChart() {
    const chart = am4core.create(this.chartDB.current, am4charts.PieChart);

    // Initialize the chart with props data
    chart.data = this.props.data;

    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "ItemName";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    chart.legend = new am4charts.Legend();
    this.chart = chart;
  }

  render() {
    return <div ref={this.chartDB} style={{ height: this.props.height }} />;
  }
}

StaticLegendPieChart.propTypes = {
  height: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ItemName: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default StaticLegendPieChart;
