<template>
  <div class="chart">
    <h1 id='header'>Bar Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from './BarChart.js';
export default {
  components: {
    chart: Chart
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