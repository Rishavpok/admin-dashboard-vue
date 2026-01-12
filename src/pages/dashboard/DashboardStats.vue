<template>
        <div class="stats-cards">
      <div class="card">
        <div class="card-title">Total Users</div>
        <div class="card-value">{{ props['userStats'].total_users }}</div>
      </div>
      <div class="card">
        <div class="card-title">Active Users</div>
        <div class="card-value">{{ props['userStats'].active_users }}</div>
      </div>
      <div class="card">
        <div class="card-title">Tasks Completed</div>
        <div class="card-value">{{ props['userStats'].task_completed }}</div>
      </div>
      <div class="card">
        <div class="card-title">Pending Tasks</div>
        <div class="card-value">{{ props['userStats'].pending_tasks }}</div>
      </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
   userStats : {
    total_users : 0,
    active_users : 0,
    task_completed : 0,
    pending_tasks :0
   }
}>()


</script>

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