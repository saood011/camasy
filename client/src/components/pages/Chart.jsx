import React from "react";
import Chart from "react-google-charts";

const pieOptions = {
  title: "",
  pieHole: 0.1,
  slices: [
    {
      color: "green"
    },
    {
      color: "red"
    },
    {
      color: "blue"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 30
    }
  },
  tooltip: {
    showColorCode: true
  },

  fontName: "Roboto"
};
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default class StudentChart extends React.Component {
  state = {
    chartImageURI: "",
    isBarChart: false
  };

  daysInLastMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  // calculating the questionable number of last month days based on the title as input
  lastMonthCalculation(input) {
    let days =
      this.props.data &&
      this.props.data.attendances
        .filter(v => v.start && v.title.toLowerCase() === input)
        .filter(v => v.start.split("-")[1] === "0" + new Date().getMonth())
        .length;
    return days;
  }
  render() {
    const lastMonthAbsentDays = this.lastMonthCalculation("absent");
    const lastMonthPresentDays = this.daysInLastMonth() - lastMonthAbsentDays;
    const lastMonthCameLate = this.lastMonthCalculation("came late");
    const lastMonthLeftEarly = this.lastMonthCalculation("left early");
    return (
      <div className="">
        {console.log(
          lastMonthAbsentDays,
          lastMonthPresentDays,
          lastMonthCameLate,
          lastMonthLeftEarly
        )}
        <Chart
          width={"100%"}
          height={"300px"}
          chartType={this.state.isBarChart ? "BarChart" : "PieChart"}
          loader={<h3 className="text-center">Gathering data for chart...</h3>}
          data={[
            ["Status", "Num of Days"],
            ["Present", lastMonthPresentDays],
            ["Absent", lastMonthAbsentDays],
            ["Came late", lastMonthCameLate],
            ["Left early", lastMonthLeftEarly]
          ]}
          options={{
            title: `Last month Attendance (${
              months[new Date().getMonth() - 1]
            })`,
            // Just add this option
            is3D: true,
            slices: pieOptions.slices,
            animation: {
              startup: true,
              duration: 2000,
              easing: "out"
            },
            colors: ["#b30000"],

            chartArea: {
              width: this.state.isBarChart ? "50%" : "85%",
              height: this.state.isBarChart ? "70%" : "85%"
            },
            hAxis: {
              viewWindow: { min: 0, max: 31 },
              title: "Number of Days"
            }
          }}
        />
        <button
          className="btn btn-dark mt-1 w-100"
          onClick={() => this.setState({ isBarChart: !this.state.isBarChart })}
        >
          {this.state.isBarChart ? "Show Pie Chart" : "Show Bar Chart"}
        </button>
      </div>
    );
  }
}
