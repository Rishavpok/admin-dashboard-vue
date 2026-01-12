<template>
        <div class="charts">
      <div class="chart">
        <h3>Tasks Status</h3>
        <!-- Placeholder for chart (use Chart.js or ApexCharts later) -->
        <div class="chart-placeholder">[Pie Chart]</div>
      </div>
      <div class="chart">
        <h3>User Growth</h3>
        <div class="chart-placeholder">[Line Chart]</div>
      </div>
    </div>
</template>

<style scoped>

/* Charts */
.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.chart {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

.chart-placeholder {
  height: 150px;
  background: #f3f4f6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
  margin-top: 10px;
}

</style>