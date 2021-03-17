<template>
  <div class="chart">
    <h1 id="header">Line Chart</h1>
    <linechart></linechart>
  </div>
</template>

<script>
import Chart from "./CallAPI.js";
export default {
  components: {
    linechart: Chart
  }
};
</script>

<style>
#header {
  text-align: center;
  background-color:#728FCE;
  font-family:-apple-system, BlinkMacSystemFont;
}
</style>