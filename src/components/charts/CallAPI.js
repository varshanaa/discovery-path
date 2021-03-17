import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "west",
                type: "line",
                borderColor: "#3090C7",
                data: [],
                fill: false
              }, {
                label: "national",
                type: "line",
                borderColor:  "#8BB381",
                data: [],
                fill: false
              }, {
                label: "east",
                type: "line",
                borderColor: "#FBB917",
                data: [],
                fill: false
              }, {
                label: "central",
                type: "line",
                borderColor: "#E77471",
                data: [],
                fill: false
              }, {
                label: "south",
                type: "line",
                borderColor: "#F660AB",
                data: [],
                fill: false
              }, {
                label: "north",
                type: "line",
                borderColor: "#7E587E",
                data: [],
                fill: false
              }
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (by Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            const items = Object.keys(response.data)[1]
            const keys = response.data[items]
            keys.forEach(entry => {
                this.datacollection.labels.push(entry.timestamp)
                var psi_object = entry.readings.psi_twenty_four_hourly
                for (var region in psi_object) {
                    var name = region
                    var psi = psi_object[region]
                    
                    var index = this.datacollection.datasets.findIndex(element => element.label === name)
                    this.datacollection.datasets[index].data.push(psi)
                }
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}