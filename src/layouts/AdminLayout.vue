<script setup lang="ts">
import Footer from '@/components/layout/Footer.vue';
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

</script>

<template>
   <div class="admin-layout" >  
        <Sidebar />

        <div class="main" >

            <Navbar />

            <main class="content" >
                <router-view></router-view>
            </main>

            <Footer />

        </div>
    
   </div>
</template>

<style scoped>
/* Layout */
.admin-layout {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
  gap: 20px;
}


/* Main content */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;

}

</style>