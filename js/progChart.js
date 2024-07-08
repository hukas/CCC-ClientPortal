window.chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "#ffb547",
  green: "rgb(75, 192, 192)",
  blue: "#00b3be",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(231,233,237)",
};

var randomScalingFactor = function () {
  return (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100);
};

var line1 = [
  randomScalingFactor(),
  randomScalingFactor(),
  randomScalingFactor(),
  randomScalingFactor(),
  randomScalingFactor(),
  randomScalingFactor(),
  randomScalingFactor(),
  randomScalingFactor(),
  randomScalingFactor(),
  randomScalingFactor(),
  randomScalingFactor(),
  randomScalingFactor(),
];

var MONTHS = [
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
  "December",
];
var config = {
  type: "line",
  data: {
    labels: MONTHS,
    datasets: [
      {
        label: "Current Intake",
        backgroundColor: window.chartColors.orange,
        borderColor: window.chartColors.orange,
        data: line1,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Scoring Chart",
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
          },
        },
      ],
    },
    layout: {
      padding: { left: 25, right: 25, bottom: 25 },
    },
  },
};

var ctx = document.getElementById("canvas").getContext("2d");
var myLine = new Chart(ctx, config);
