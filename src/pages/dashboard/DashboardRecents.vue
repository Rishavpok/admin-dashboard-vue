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
          <tr>
            <td>Design Homepage</td>
            <td>In Progress</td>
            <td>High</td>
            <td>John Doe</td>
          </tr>
          <tr>
            <td>Fix Bugs</td>
            <td>To Do</td>
            <td>Medium</td>
            <td>Jane Smith</td>
          </tr>
          <tr>
            <td>Deploy Project</td>
            <td>Completed</td>
            <td>Low</td>
            <td>Mark Lee</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

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