<template>
        <div class="recent-table">
      <h3>Recent Tasks</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in props.recentTasks" >
            <td>{{ item.title }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.priority }}</td>
            <td>{{ item.Assigned_to }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts" setup>

type Task = {
  title: string
  status: string
  priority: string
  Assigned_to: string
}

// Pass props as a generic type
const props = defineProps<{
  recentTasks: Task[]
}>()

</script>

<style scoped>
    /* Recent Table */
.recent-table {
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #e5e7eb;
}

th {
  font-weight: 600;
  color: #374151;
}
</style>