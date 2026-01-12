<script setup lang="ts">
import { ref } from 'vue';
import DashboardCharts from './DashboardCharts.vue';
import DashboardRecents from './DashboardRecents.vue';
import DashboardStats from './DashboardStats.vue';

const userStats = ref(
  {
    "total_users" : 1250,
    "active_users" : 893,
    "task_completed" : 412,
    "pending_tasks" : 58
  }
)

const recentTasks = ref([
  {
    "title": " Design Homepage",
    "status" : "In progress",
    "priority" : "Low",
    "Assigned_to" : "John Doe"
  },
    {
    "title": " Bug Fixes",
    "status" : "To Do",
    "priority" : "Medium",
    "Assigned_to" : "Jane Smith"
  },
      {
    "title": "Deploy Projects",
    "status" : "Completed",
    "priority" : "High",
    "Assigned_to" : "Mark Lee"
  }
])

</script>

<template>
  <div class="dashboard">
    <DashboardStats :userStats="userStats" />
    <DashboardCharts />
    <DashboardRecents :recentTasks="recentTasks" />
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
