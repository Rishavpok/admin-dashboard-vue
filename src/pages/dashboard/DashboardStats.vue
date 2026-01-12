<template>
        <div class="stats-cards">
      <div class="card">
        <div class="card-title">Total Users</div>
        <div class="card-value">1250</div>
      </div>
      <div class="card">
        <div class="card-title">Active Users</div>
        <div class="card-value">893</div>
      </div>
      <div class="card">
        <div class="card-title">Tasks Completed</div>
        <div class="card-value">412</div>
      </div>
      <div class="card">
        <div class="card-title">Pending Tasks</div>
        <div class="card-value">58</div>
      </div>
    </div>
</template>

<style scoped>

/* Summary Cards */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.card {
  background: #ffffff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  text-align: center;
}

.card-title {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
}

.card-value {
  font-size: 22px;
  font-weight: 700;
  margin-top: 8px;
}

</style>