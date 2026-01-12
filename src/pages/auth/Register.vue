<template>
<div class="login-wrapper" >
  <div class="register-card">
    <h2>Create Account</h2>

    <form>
      <div class="field-group">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            placeholder="Enter your email" />

        <!-- <span class="error" >{{ emailError }}</span> -->
      </div>

      <div class="field-group">
        <label for="email">Full name</label>
        <input
            type="text"
            id="email"
            placeholder="Enter your full name" />

        <!-- <span class="error" >{{ nameError }}</span> -->
      </div>

      <div class="field-group">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            placeholder="Enter your password" />

        <!-- <span class="error" >{{ passwordError }}</span> -->

      </div>

      <div class="field-group">
        <label for="password"> Confirm Password</label>
        <input
            type="password"
            id="password"
            placeholder="Enter your password again" />

        <!-- <span class="error" >{{ conformPasswordError }}</span> -->

      </div>

      <button type="submit" class="submit-btn">Register</button>
    </form>

    <div class="login-link">
      Already have an account? <a @click="login" >Login</a>
    </div>
  </div>
</div>
</template>