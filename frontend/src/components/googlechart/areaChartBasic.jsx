import React from "react";
import Chart from "react-google-charts";
import PropTypes from "prop-types";

const AreaChartBasic = ({ data, height }) => {
  return (
    <Chart
      width="100%"
      height={height}
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        vAxis: {
          minValue: 0,
        },
        colors: ["#7759de", "#2196f3"],
      }}
    />
  );
};

AreaChartBasic.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.string,
};

AreaChartBasic.defaultProps = {
  height: "300px",
};

export default AreaChartBasic;
