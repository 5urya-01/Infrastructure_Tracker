import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import BarChartJs from "../components/chartJs/barBasicChart";
import LineInterpolationChart from "../components/chartJs/lineInterpolationChart";
import PieChart from "../components/chartJs/pieChart";
import StaticLegendPieChart from "../components/amChart/staticsPieChart/staticLegendPieChart";
import PieDoughnutChart from "../components/echart/pieDoughnutChart";
import StaticStackedChart from "../components/amChart/staticsXYChart/staticStackedChart";
import AreaChartBasic from "../components/googlechart/areaChartBasic";
import AreaChart from "../components/echart/areaChart";

const Itemwise = () => {
  const history = useHistory();
  const location = useLocation();

  const buttonArray = ["Fan", "Gangbox", "Whiteboard", "Chair", "Bench", "Projector", "Light"];

  const handleButtonClick = (item) => {
    console.log(item);
    const lastSlashIndex = location.pathname.lastIndexOf('/');
    const newPath = `${location.pathname.slice(0, lastSlashIndex)}/${item}`;
    history.push(newPath);
  };

  const areaChartDatae = [1, 5, 3, 6, 4, 8, 10];
  const areaChartCategories = ['RTB', 'CB', 'BGB', 'KLRB', 'NB', 'THUB', 'VB'];
  const barChartData = {
    labels: ["Floor 0", "Floor 1", "Floor 2", "Floor 3", "Floor 4"],
    datasets: [
      {
        label: "Non Electrical",
        data: [0, 500, 454, 652, 555],
        borderColor: "#2196f3",
        backgroundColor: "#2196f3",
      },
      {
        label: "Electrical",
        data: [0, 410, 354, 752, 505],
        borderColor: "#7759de",
        backgroundColor: "#7759de",
      },
    ],
  };

  const lineChartData = {
    labels: ["Fan", "Light", "Desk"],
    datasets: [
      {
        label: "BGB",
        data: [55, 70, 62],
        borderWidth: 4,
        lineTension: 0,
        borderDash: [15, 10],
        borderColor: "#7759de",
      },
      {
        label: "RTB",
        data: [85, 55, 70],
        fill: true,
        cubicInterpolationMode: "monotone",
        borderColor: "#2196f3",
        backgroundColor: "#2196f3",
      },
      {
        label: "TH",
        data: [50, 75, 80],
        borderWidth: 4,
        borderColor: "#4caf50",
      },
    ],
  };

  const pieChartData = {
    labels: ["Electrical", "Non-Electrical"],
    datasets: [
      {
        data: [40, 60],
        backgroundColor: ["#4caf50", "#7759de"],
      },
    ],
  };

  const staticLegendData = [
    { ItemName: "Projector", count: 128.3 },
    { ItemName: "Whiteboard", count: 99 },
    { ItemName: "Fan", count: 200.5 },
    { ItemName: "Bench", count: 165.8 },
    { ItemName: "Light", count: 139.9 },
    { ItemName: "Podium", count: 60 },
  ];

  const pieDoughnutData = {
    labels: ["HTML", "SCSS", "JS", "Images", "Icons"],
    datasets: [
      {
        data: [335, 310, 234, 135, 1548],
        backgroundColor: ["#4caf50", "#f44336", "#FF9800", "#7759de", "#2196f3"],
      },
    ],
  };

  const stackedChartData = [
    { places: "BGB", working: 60, notWorking: 40, total: 100 },
    { places: "RTB", working: 301, notWorking: 222, total: 523 },
    { places: "CB", working: 201, notWorking: 170, total: 371 },
    { places: "NB", working: 165, notWorking: 122, total: 287 },
    { places: "KLRB", working: 139, notWorking: 99, total: 238 },
    { places: "THUB", working: 128, notWorking: 85, total: 213 },
  ];

  const stackedChartSeries = [
    { name: "working", field: "working" },
    { name: "notWorking", field: "notWorking" },
    { name: "total", field: "total" },
  ];

  const areaChartData = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];

  return (
    <div>
      {/* Horizontal Scrollable Buttons */}
      <div style={{ overflowX: "auto", whiteSpace: "nowrap", marginBottom: "20px" }}>
        {buttonArray.map((item, index) => (
          <Button key={index} color="primary" style={{ margin: "0 5px" }} onClick={() => handleButtonClick(item)}>
            {item}
          </Button>
        ))}
      </div>

      <Row>
        {/* Line Chart */}
        <Col xl={12} md={6}>
          <Card>
            <CardHeader>
              <h5>Line [ Interpolation Mode ] Chart</h5>
            </CardHeader>
            <CardBody>
              <LineInterpolationChart data={lineChartData} />
            </CardBody>
          </Card>
        </Col>
        {/* Area Chart e */}
        <Col xl={4} md={6}>
          <Card>
            <CardHeader>
              <h5>Area Chart</h5>
            </CardHeader>
            <CardBody>
              <AreaChart data={areaChartDatae} categories={areaChartCategories} />
            </CardBody>
          </Card>
        </Col>
        {/* Basic Pie Chart */}
        <Col xl={4} md={6}>
          <Card>
            <CardHeader>
              <h5>Pie Chart</h5>
            </CardHeader>
            <CardBody>
              <PieChart data={pieChartData} />
            </CardBody>
          </Card>
        </Col>
        {/* Pie Doughnut Chart */}
        <Col xl={4} md={6}>
          <Card>
            <CardHeader>
              <h5>Pie Doughnut Chart</h5>
            </CardHeader>
            <CardBody>
              <PieDoughnutChart data={pieDoughnutData} />
            </CardBody>
          </Card>
        </Col>
        {/* Static Legend Pie Chart */}
        <Col xl={4} md={6}>
          <Card>
            <CardHeader>
              <h5>Static Legend Pie Chart</h5>
            </CardHeader>
            <CardBody>
              <StaticLegendPieChart height="400px" data={staticLegendData} />
            </CardBody>
          </Card>
        </Col>
        {/* Static Stacked Chart */}
        <Col xl={8}>
          <Card>
            <CardHeader>
              <h5>Static Stacked Chart</h5>
            </CardHeader>
            <CardBody>
              <StaticStackedChart height={400} data={stackedChartData} series={stackedChartSeries} />
            </CardBody>
          </Card>
        </Col>
        {/* Area Chart */}
        <Col xl={12}>
          <Card>
            <CardHeader>
              <h5>Area Chart</h5>
            </CardHeader>
            <CardBody>
              <AreaChartBasic data={areaChartData} height="300px" />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Itemwise;
