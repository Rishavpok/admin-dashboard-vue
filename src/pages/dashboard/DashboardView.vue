<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import DashboardCharts from './DashboardCharts.vue';
import DashboardRecents from './DashboardRecents.vue';
import DashboardStats from './DashboardStats.vue';
import { getDashboardData } from '@/services/dashboard/dashboard.service';
import Loader from '@/components/common/Loader.vue';

const userStats = reactive({
  total_users: 0,
  active_users: 0,
  task_completed: 0,
  pending_tasks: 0
})
const isLoading = ref(true)

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

const fetchDashboardData = async () => {
  isLoading.value = true
  try {
    const { data } = await getDashboardData()

    const { users, tasks } = data

    userStats.total_users = users.total
    userStats.active_users = users.active
    userStats.pending_tasks = tasks.pending
    userStats.task_completed = tasks.completed

    recentTasks.value = tasks.recent
  } catch (error) {
    console.error('Dashboard API error:', error)
    isLoading.value = false
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchDashboardData)

</script>

<template>
  <div v-if="!isLoading" class="dashboard">
    <DashboardStats :userStats="userStats" />
    <DashboardCharts />
    <DashboardRecents :recentTasks="recentTasks" />
  </div>

  <Loader v-else ></Loader>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
