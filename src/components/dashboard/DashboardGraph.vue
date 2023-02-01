<template>
  <div>
    <bar-chart :chart-data="datacollection" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";

const colorPack = [
  "#0267C1",
  "#EFA00B",
  "#591F0A",
  "#C4D7F2",
  "#91A8A4",
  "#776871"
];

export default {
  components: {
    BarChart
  },
  props: {
    compData: Array
  },
  data() {
    return {
      datacollection: {},
      chartOptions: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        },

        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 0.3
            }
          ]
        }
      }
    };
  },
  watch: {
    compData(val) {
      let labels = [];
      let data = [];
      let bgcolor = [];
      let bordercolor = [];
      val.forEach((item, index) => {
        labels.push(item.company !== "zzz" ? item.company : "Other");
        data.push(item.times);
        bgcolor.push(hexToRgbA(colorPack[index % 6]));
        bordercolor.push(colorPack[index % 6]);
      });
      this.datacollection = {
        labels: labels,
        datasets: [
          {
            label: "",
            backgroundColor: bgcolor,
            borderColor: bordercolor,
            borderWidth: 1,
            data: data
          }
        ]
      };
    }
  }
};

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.7)"
    );
  }
  throw new Error("Bad Hex");
}
</script>
