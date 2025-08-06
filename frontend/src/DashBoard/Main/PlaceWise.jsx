import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import BarChartJs from "../../components/chartJs/barBasicChart";
import DynamicBarChart from "../../components/echart/DynamicLineBarChart";
import LineOriginChart from "../../components/chartJs/lineOriginChart";
import BarBasicColumnChart from "../../components/echart/barBasicColumnChart";
import DoughnutChart from "../../components/chartJs/doughnutChart";
import PieChart from "../../components/chartJs/pieChart";

class PlaceWise extends Component {
  render() {
    ///////////////////////////////////////////////////
    const getCompanyitemcount = [
      {
        "_id": "goldmedal",
        "count": 60
      },
      {
        "_id": "crompton",
        "count": 45
      },
      {
        "_id": "svensas",
        "count": 15
      },
      {
        "_id": "phlips",
        "count": 45
      },
      {
        "_id": "zebronics",
        "count": 15
      },
      {
        "_id": "takeWood",
        "count": 165
      },
      {
        "_id": "sony",
        "count": 30
      }
    ]

    const sampleData = {
      title: "Company Item Count",
      // subtext: "Bar Chart Example",
      xAxisData: getCompanyitemcount.map(item => item._id),
      barData: getCompanyitemcount.map(item => item.count)
    };


    /////////////////////////////////////////////////////


    //////////////////////////////////////////////////
    const getitembasedcompcount = [
      {
        "count": 15,
        "company": "zebronics",
        "itemName": "projecter"
      },
      {
        "count": 45,
        "company": "crompton",
        "itemName": "fan"
      },
      {
        "count": 30,
        "company": "sony",
        "itemName": "cctvCamera"
      },
      {
        "count": 15,
        "company": "takeWood",
        "itemName": "podium"
      },
      {
        "count": 30,
        "company": "goldmedal",
        "itemName": "switchBoard"
      },
      {
        "count": 15,
        "company": "svensas",
        "itemName": "board"
      },
      {
        "count": 45,
        "company": "phlips",
        "itemName": "light"
      },
      {
        "count": 30,
        "company": "goldmedal",
        "itemName": "socket"
      },
      {
        "count": 150,
        "company": "takeWood",
        "itemName": "bench"
      }
    ]

    const title = "Item-wise Company Count";
    const subtext = "Count of items by company";

    // Extract unique item names for the x-axis
    const xAxisData = [...new Set(getitembasedcompcount.map(item => item.itemName))];

    // Define a color palette for each company
    const colorPalette = ["#2196f3", "#7759de", "#4caf50", "#FF9800", "#f44336", "#009688", "#9c27b0", "#e91e63", "#3f51b5"];

    // Group data by company to create a series for each company
    const companySeriesData = getitembasedcompcount.reduce((acc, item, index) => {
      if (!acc[item.company]) {
        acc[item.company] = {
          name: item.company,
          type: "line",
          smooth: true,
          data: Array(xAxisData.length).fill(0), // Initialize with zeros for each item
          color: colorPalette[index % colorPalette.length] // Assign color from palette
        };
      }

      // Fill in the data for each item's index
      const itemIndex = xAxisData.indexOf(item.itemName);
      if (itemIndex !== -1) {
        acc[item.company].data[itemIndex] = item.count;
      }

      return acc;
    }, {});

    // Convert to an array of series data for chart input
    const seriesData = Object.values(companySeriesData);


    /////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    

    const rawData = [
      { "count": 15, "itemName": "projecter", "consumption": "22 Watts" },
      { "count": 30, "itemName": "cctvCamera", "consumption": "10 Watts" },
      { "count": 45, "itemName": "light", "consumption": "9 Watts" },
      { "count": 30, "itemName": "switchBoard", "consumption": "1 Watts" },
      { "count": 30, "itemName": "socket", "consumption": "10 Watts" },
      { "count": 3, "itemName": "podium", "consumption": "-" },
      { "count": 15, "itemName": "board", "consumption": "" },
      { "count": 12, "itemName": "podium", "consumption": "" },
      { "count": 150, "itemName": "bench", "consumption": "" },
      { "count": 45, "itemName": "fan", "consumption": "29 Watts" }
    ];
    
    // Step 1: Process the data to sum counts * consumption for each itemName, excluding items without valid consumption
    const processedData = rawData.reduce((acc, item) => {
      const { itemName, count, consumption } = item;
      
      // Parse consumption, only proceed if it's a valid number
      const consumptionValue = parseFloat(consumption);
      if (isNaN(consumptionValue)) return acc;  // Skip items without a valid consumption rate
    
      // Calculate total consumption for this item
      const totalConsumption = consumptionValue * count;
    
      // If the item already exists in the accumulator, add to its total
      if (acc[itemName]) {
        acc[itemName] += totalConsumption;
      } else {
        acc[itemName] = totalConsumption;
      }
    
      return acc;
    }, {});
    
    // Extract labels and dataPoints for the chart
    const labels = Object.keys(processedData);
    const dataPoints = Object.values(processedData);
    

    ////////////////////////////////////////////


    ////////////////////////////////////////////////

    const getWorkingdou =
      [
        {
          "_id": "working",
          "count": 330
        },
        {
          "_id": "notWorking",
          "count": 45
        }
      ]
    const doughnutChartLabels = getWorkingdou.map(item => item._id);
    const doughnutChartData = getWorkingdou.map(item => item.count);
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////
    const getElectricalpie = {
      "electrical": 210,
      "nonElectrical": 165
    };

    const pieChartData = {
      labels: Object.keys(getElectricalpie), // Extracts the keys as labels
      datasets: [
        {
          data: Object.values(getElectricalpie), // Extracts the values as data
          backgroundColor: ["#4caf50", "#7759de"],
        },
      ],
    };
    ////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////

    const getDatathis = [
      { "_id": "socket", "count": 30 },
      { "_id": "bench", "count": 150 },
      { "_id": "switchBoard", "count": 30 },
      { "_id": "cctvCamera", "count": 30 },
      { "_id": "projecter", "count": 15 },
      { "_id": "light", "count": 45 },
      { "_id": "fan", "count": 45 },
      { "_id": "board", "count": 15 },
      { "_id": "podium", "count": 15 },
    ];

    // Correctly map getDatathis for chart data
    const chartData = {
      labels: getDatathis.map(item => item._id), // Array of labels from item._id
      datasets: [
        {
          label: "Item Count",
          data: getDatathis.map(item => item.count), // Array of data values from item.count
          borderColor: "#2196f3",
          backgroundColor: "#2196f3",
          hoverBorderColor: "#2196f3",
          hoverBackgroundColor: "#2196f3",
        }
      ],
    };
    ////////////////////////////////////////////////////////////////
    return (
      <>
        <h1>Global Place Wise</h1>
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
                  // subtext={subtext}
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
                <LineOriginChart  labels={labels} dataPoints={dataPoints} labelName="Consumtion Rate"/>
                
              </CardBody>
            </Card>
          </Col>



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
        </Row>
      </>
    );
  }
}

export default PlaceWise;
