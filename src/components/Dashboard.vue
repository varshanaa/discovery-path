<template>
  <div>
    <div id="fooditems" class="navbar">
      <nav>
        <ul id="navibar">
          <li id="navibarlist">
            <router-link to="/" exact>Home</router-link>
          </li>
          <li id="navibarlist">
            <router-link to="/orders" exact>Orders</router-link>
          </li>
          <li id="navibarlist">
            <router-link to="/dashboard" exact>Dashboard</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <barchart></barchart>
    <linechart></linechart>
  </div>
</template>

<script>
import Chart from './charts/BarChart.vue'
import Chart2 from './charts/CallAPI.vue'
export default {
  components: {
    barchart: Chart,
    linechart: Chart2
  }
}
</script>

<style scoped> 
#navibar {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#navibarlist {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

</style>