<script setup lang="ts">
import DashboardCharts from './DashboardCharts.vue';
import DashboardRecents from './DashboardRecents.vue';
import DashboardStats from './DashboardStats.vue';

</script>

<template>
  <div class="dashboard">
    <DashboardStats />
    <DashboardCharts />
    <DashboardRecents />
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
