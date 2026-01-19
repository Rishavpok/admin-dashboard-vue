<template>
  <header class="navbar">
    <div class="navbar-left">Admin Panel</div>
    <div class="navbar-right">
      <span>Hello, Admin</span>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';


const router = useRouter()


function logout() {
  localStorage.removeItem('token')
  router.push("/login")
}

</script>

<style scoped>
    /* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: #f3f4f6;
  padding: 0 20px;
  border-bottom: 1px solid #e5e7eb;
}

.navbar-right {
    display: flex;
    align-items: center;
    gap: 20px;
}

.logout-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #ef4444;
  color: #fff;
  cursor: pointer;
}

.logout-btn:hover {
  background: #dc2626;
}
</style>