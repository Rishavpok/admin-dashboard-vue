<template>
  <div class="login-wrapper">
    <div class="register-card">
      <h2>Login</h2>

      <form @submit.prevent="onSubmit" >
        <div class="field-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" placeholder="Enter your email" />

          <span class="error" > {{ emailError }} </span>
        </div>

        <div class="field-group">
          <label for="password">Password</label>
          <input
          v-model="password"
            type="password"
            id="password"
            placeholder="Enter your password"
          />

          <span class="error" > {{ passwordError }} </span>
        </div>

        <button :disabled="isLoading" type="submit" class="submit-btn">
          {{ isLoading ? "...." : "Login" }}
        </button>
      </form>

      <div class="login-link">
        Already have an account? <a @click="register">Register</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from "@/services/auth/auth.service";
import { useForm , useField } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";


const isLoading = ref(false);
const error = ref("");
const router = useRouter()

// form setup and validation

const schema = yup.object({
  email : yup.string().required("Email is required"),
   password: yup.string().required("Password is required")
})

const  { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value : email , errorMessage : emailError } = useField("email")
const { value : password , errorMessage : passwordError } = useField("password")

const onSubmit = handleSubmit( async ( values ) => {

  try {

    isLoading.value = true
    const res = await login(values)

    console.log(res)

    if(res) {
      localStorage.setItem('token', res['data']['access_token'])
       router.push("/")
    }
  

  } catch(error) {
      error.value = e.response?.data?.message || 'Login failed'
  } finally {
    isLoading.value = false
  }

} )



</script>
