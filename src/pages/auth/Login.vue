<template>
 <div class="login-wrapper" >
   <div class="register-card">
     <h2>Login</h2>

     <form >
       <div class="field-group">
         <label for="email">Email</label>
         <input
        
             type="email"
             id="email"
             placeholder="Enter your email" />

         <!-- <span class="error" > {{ emailError }} </span> -->
       </div>

       <div class="field-group">
         <label for="password">Password</label>
         <input
             type="password"
             id="password"
             placeholder="Enter your password" />

         <!-- <span class="error" > {{ passwordError }} </span> -->
       </div>

       <button
           :disabled="isLoading"
           type="submit"
           class="submit-btn">
         {{ isLoading ? "...." : "Login" }}
       </button>
     </form>

     <div class="login-link">
       Already have an account? <a @click="register" >Register</a>
     </div>
   </div>

 </div>
</template>

<script setup>
import { ref } from 'vue';

    const isLoading = ref(false)
</script>