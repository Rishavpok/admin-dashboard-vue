<template>
  <aside class="sidebar" :class="{ closed: isClosed }">
    <div style="display: flex; justify-content: space-between">
      <div :hidden="isClosed" class="brand">MyAdmin</div>
      <span @click="toggleMenu" class="material-icons">menu</span>
    </div>

    <ul class="menu" :hidden="isClosed">
      <li v-for="item in paths" @click="routeTo(item.route)" >{{ item.name }}</li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const isClosed = ref(false);
const router = useRouter()
const paths = ref([
    {
        name  :"Dashboard",
        route : "/admin/dashboard",
    },
    {
        name : "Users",
        route : "/admin/users",
    },
    {
        name : "Settings",
        route : "/admin/settings"
    }
])

function routeTo(path) {
   router.push(path)
}

function toggleMenu() {
  isClosed.value = !isClosed.value;
}
</script>

<style scoped>
/* Sidebar */
.sidebar {
  width: 220px;
  background: #1f2937;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.closed {
  width: 20px;
}

.sidebar .brand {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
}

.sidebar .menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar .menu li {
  margin-bottom: 16px;
  cursor: pointer;
}

.sidebar .menu li a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}

.sidebar .menu li a.router-link-active {
  color: #6366f1; /* active link */
}

.closed.menu {
  opacity: 0;
}
</style>
