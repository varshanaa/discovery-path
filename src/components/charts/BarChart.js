import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Count",
                backgroundColor: ["#3090C7", "#8BB381", "#FBB917", "#E77471", "#F660AB", "#7E587E"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of Each Dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales:{
              yAxes:[{
                  ticks:{
                      min:0
                  }
               }]  
            }
        }
    }
  },
  mounted(){
    this.renderChart(this.chartdata,this.options)
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.docs.forEach(doc => { 
          const docdata = doc.data()
          //const docKeys = Object.keys(docdata)
          for (const key in docdata) {
            var dishName = docdata[key].name
            var dishCount = docdata[key].count
            if (!(this.datacollection.labels.includes(dishName))){
              this.datacollection.labels.push(dishName)
              this.datacollection.datasets[0].data.push(dishCount)
            }
            else {
              var index = this.datacollection.labels.indexOf(dishName)
              var currentCount = this.datacollection.datasets[0].data[index]
              var updateCount = dishCount + currentCount
              this.datacollection.datasets[0].data.splice(index, 1, updateCount)
            }
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