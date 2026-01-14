<template>
  <div class="profile-settings">
    <h2 class="title">Profile Settings</h2>

    <form class="profile-form" @submit.prevent="onSubmit" >
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          placeholder="Enter your name"
        />
        
        <span class="error" > {{ fullNameError }} </span>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Enter your email"
        />

        <span  class="error" > {{ emailError }} </span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Enter new password"
        />

        <span class="error" > {{ passwordError }} </span>
      </div>

      <button type="submit" class="btn-save">Save Profile</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";

// form setup and validation
const schema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: fullNameError } = useField("name");
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

const onSubmit = handleSubmit((values) => {
    console.log(values)
} )
</script>

<style scoped>
.profile-settings {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  /* max-width: 500px; */
  margin: 20px auto;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 14px;
  color: #333;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: #fafafa;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #6366f1;
}

.btn-save {
  background: #6366f1;
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
}

.btn-save:hover {
  background: #4f46e5;
}
</style>
