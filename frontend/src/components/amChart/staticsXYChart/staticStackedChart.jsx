import React, { PureComponent, createRef } from "react";
import PropTypes from "prop-types";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class StaticStackedChart extends PureComponent {
  constructor(props) {
    super(props);
    // Create a ref to store the chart DOM element
    this.chartDB = createRef();
  }

  componentDidMount() {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create(this.chartDB.current, am4charts.XYChart);
    chart.data = this.props.data; // Use dynamic data from props

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "places";
    categoryAxis.title.text = "Local Places";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Condition";

    // Create a series for each data field
    this.props.series.forEach((s) => {
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = s.field;
      series.dataFields.categoryX = "places";
      series.name = s.name;
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.stacked = true;
    });

    chart.cursor = new am4charts.XYCursor();
    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div ref={this.chartDB} style={{ height: this.props.height }} />;
  }
}

// Updated PropTypes
StaticStackedChart.propTypes = {
  height: PropTypes.number.isRequired, // Change to number
  data: PropTypes.arrayOf(PropTypes.object).isRequired, // Require data prop
  series: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
    })
  ).isRequired, // Require series configuration
};

export default StaticStackedChart;
