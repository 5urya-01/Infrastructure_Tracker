import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import BarChartJs from "../../components/chartJs/barBasicChart";
import DynamicBarChart from "../../components/echart/DynamicLineBarChart";
import LineOriginChart from "../../components/chartJs/lineOriginChart";
import BarBasicColumnChart from "../../components/echart/barBasicColumnChart";
import DoughnutChart from "../../components/chartJs/doughnutChart";
import PieChart from "../../components/chartJs/pieChart";
import axios from 'axios';

const BuildPlaceWise = () => {
  const {floorId} = useParams();
  const [getAllItemCount , setGetAllItemsCount] = useState([]);
  const [getElectricalCount,setGetElectricalCount] = useState({});
  const [getWorkingCount,setGetWorkingCount] = useState([]);
  const [getCompanyCount,setGetCompanyCount] = useState([]);
  const [getCompanyAndItemCount,setGetCompanyAndItemCount] = useState([]);
  const [getConsumptionAndItemCount,setGetConsumptionAndItemCount] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/floor/getCountByCompany/" + floorId)
    .then((res) => {
      setGetCompanyCount(res.data);
    })
    .catch((err) => { 
      console.error(err);
    })
  },[floorId])
  // const getCompanyCount = [
  //   {
  //     "_id": "goldmedal",
  //     "count": 60
  //   },
  //   {
  //     "_id": "crompton",
  //     "count": 45
  //   },
  //   {
  //     "_id": "svensas",
  //     "count": 15
  //   },
  //   {
  //     "_id": "phlips",
  //     "count": 45
  //   },
  //   {
  //     "_id": "zebronics",
  //     "count": 15
  //   },
  //   {
  //     "_id": "takeWood",
  //     "count": 165
  //   },
  //   {
  //     "_id": "sony",
  //     "count": 30
  //   }
  // ];

  const sampleData = {
    title: "Company Item Count",
    xAxisData: getCompanyCount.map(item => item._id),
    barData: getCompanyCount.map(item => item.count)
  };
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/floor/getCountByCompanyAndItemName/" + floorId)
    .then((res) => {
      setGetCompanyAndItemCount(res.data);
    })
    .catch((err) => { 
      console.error(err);
    })
  },[floorId])
  // const getCompanyAndItemCount = [
  //   {
  //     "count": 15,
  //     "company": "zebronics",
  //     "itemName": "projecter"
  //   },
  //   {
  //     "count": 45,
  //     "company": "crompton",
  //     "itemName": "fan"
  //   },
  //   {
  //     "count": 30,
  //     "company": "sony",
  //     "itemName": "cctvCamera"
  //   },
  //   {
  //     "count": 15,
  //     "company": "takeWood",
  //     "itemName": "podium"
  //   },
  //   {
  //     "count": 30,
  //     "company": "goldmedal",
  //     "itemName": "switchBoard"
  //   },
  //   {
  //     "count": 15,
  //     "company": "svensas",
  //     "itemName": "board"
  //   },
  //   {
  //     "count": 45,
  //     "company": "phlips",
  //     "itemName": "light"
  //   },
  //   {
  //     "count": 30,
  //     "company": "goldmedal",
  //     "itemName": "socket"
  //   },
  //   {
  //     "count": 150,
  //     "company": "takeWood",
  //     "itemName": "bench"
  //   }
  // ];

  const title = "Item-wise Company Count";
  const subtext = "Count of items by company";

  const xAxisData = [...new Set(getCompanyAndItemCount.map(item => item.itemName))];
  const colorPalette = ["#2196f3", "#7759de", "#4caf50", "#FF9800", "#f44336", "#009688", "#9c27b0", "#e91e63", "#3f51b5"];

  const companySeriesData = getCompanyAndItemCount.reduce((acc, item, index) => {
    if (!acc[item.company]) {
      acc[item.company] = {
        name: item.company,
        type: "line",
        smooth: true,
        data: Array(xAxisData.length).fill(0),
        color: colorPalette[index % colorPalette.length]
      };
    }
    const itemIndex = xAxisData.indexOf(item.itemName);
    if (itemIndex !== -1) {
      acc[item.company].data[itemIndex] = item.count;
    }
    return acc;
  }, {});

  const seriesData = Object.values(companySeriesData);


  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/floor/getTotalTypesOfConsumptionGroupedByItemName/" + floorId)
    .then((res) => {
      setGetConsumptionAndItemCount(res.data);
    })
    .catch((err) => { 
      console.error(err);
    })
  },[floorId])
  // const getConsumptionAndItemCount = [
  //   { "count": 15, "itemName": "projecter", "consumption": "22 Watts" },
  //   { "count": 30, "itemName": "cctvCamera", "consumption": "10 Watts" },
  //   { "count": 45, "itemName": "light", "consumption": "9 Watts" },
  //   { "count": 30, "itemName": "switchBoard", "consumption": "1 Watts" },
  //   { "count": 30, "itemName": "socket", "consumption": "10 Watts" },
  //   { "count": 3, "itemName": "podium", "consumption": "-" },
  //   { "count": 15, "itemName": "board", "consumption": "" },
  //   { "count": 12, "itemName": "podium", "consumption": "" },
  //   { "count": 150, "itemName": "bench", "consumption": "" },
  //   { "count": 45, "itemName": "fan", "consumption": "29 Watts" }
  // ];

  const processedData = getConsumptionAndItemCount.reduce((acc, item) => {
    const { itemName, count, consumption } = item;
    const consumptionValue = parseFloat(consumption);
    if (isNaN(consumptionValue)) return acc;
    const totalConsumption = consumptionValue * count;
    if (acc[itemName]) {
      acc[itemName] += totalConsumption;
    } else {
      acc[itemName] = totalConsumption;
    }
    return acc;
  }, {});

  const labels = Object.keys(processedData);
  const dataPoints = Object.values(processedData);
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/floor/getCountByCondition/" + floorId)
    .then((res) => {
      setGetWorkingCount(res.data);
    })
    .catch((err) => { 
      console.error(err);
    })
  },[floorId])
  // const getWorkingCount = [
  //   {
  //     "_id": "working",
  //     "count": 330
  //   },
  //   {
  //     "_id": "notWorking",
  //     "count": 45
  //   }
  // ];
  const doughnutChartLabels = getWorkingCount.map(item => item._id);
  const doughnutChartData = getWorkingCount.map(item => item.count);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/floor/getCountByCategory/" + floorId)
    .then((res) => {
      setGetElectricalCount(res.data);
    })
    .catch((err) => { 
      console.error(err);
    })
  },[floorId])

  // const getElectricalCount = {
  //   "electrical": 210,
  //   "nonElectrical": 165
  // };

  const pieChartData = {
    labels: Object.keys(getElectricalCount),
    datasets: [
      {
        data: Object.values(getElectricalCount),
        backgroundColor: ["#4caf50", "#7759de"],
      },
    ],
  };
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/floor/getAllItemCount/" + floorId)
    .then((res) => {
      setGetAllItemsCount(res.data);
    })
    .catch((err) => { 
      console.error(err);
    })
  },[floorId])
  // const getAllItemCount = [
  //   { "_id": "socket", "count": 30 },
  //   { "_id": "bench", "count": 150 },
  //   { "_id": "switchBoard", "count": 30 },
  //   { "_id": "cctvCamera", "count": 30 },
  //   { "_id": "projecter", "count": 15 },
  //   { "_id": "light", "count": 45 },
  //   { "_id": "fan", "count": 45 },
  //   { "_id": "board", "count": 15 },
  //   { "_id": "podium", "count": 15 },
  // ];

  const chartData = {
    labels: getAllItemCount.map(item => item._id),
    datasets: [
      {
        label: "Item Count",
        data: getAllItemCount.map(item => item.count),
        borderColor: "#2196f3",
        backgroundColor: "#2196f3",
        hoverBorderColor: "#2196f3",
        hoverBackgroundColor: "#2196f3",
      }
    ],
  };

  return (
    <>
      <h1>Build Place Wise</h1>
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <h5>Bar Chart</h5>
            </CardHeader>
            <CardBody>
              <BarChartJs data={chartData} />
            </CardBody>
          </Card>
        </Col>

        <Col xl={12} md={12}>
          <Card>
            <CardHeader>
              <h5>Bar [ Basic Column ] Chart</h5>
            </CardHeader>
            <CardBody className="text-center">
              <BarBasicColumnChart
                title={title}
                legendData={seriesData.map(series => series.name)}
                xAxisData={xAxisData}
                seriesData={seriesData}
              />
            </CardBody>
          </Card>
        </Col>

        <Col xl={4} md={6}>
          <Card>
            <CardHeader>
              <h5>Doughnut Chart</h5>
            </CardHeader>
            <CardBody>
              <DoughnutChart labels={doughnutChartLabels} data={doughnutChartData} />
            </CardBody>
          </Card>
        </Col>

        <Col xl={8}>
          <Card>
            <CardHeader>
              <h5>Dynamic Line Bar Chart</h5>
            </CardHeader>
            <CardBody className="text-center">
              <DynamicBarChart
                title={sampleData.title}
                subtext={sampleData.subtext}
                xAxisData={sampleData.xAxisData}
                barData={sampleData.barData}
              />
            </CardBody>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <CardHeader>
              <h5>Area [ Fill: 'origin' ] Chart</h5>
            </CardHeader>
            <CardBody>
              <LineOriginChart labels={labels} dataPoints={dataPoints} />
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <CardHeader>
              <h5>Pie Chart</h5>
            </CardHeader>
            <CardBody>
              <PieChart data={pieChartData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BuildPlaceWise;
