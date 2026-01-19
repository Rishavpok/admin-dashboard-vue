<template>
  <div class="modal-backdrop">
    <div class="modal-card">
      <div class="modal-header">
        <h2 v-if="!props.editMode" class="modal-title">Create User</h2>
        <h2 v-else class="modal-title">Edit User</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <form class="modal-form" @submit.prevent="onSubmit">
        <!-- Name -->
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            placeholder="Enter full name"
          />

          <span class="error"> {{ fullNameError }} </span>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter email address"
          />

          <span class="error"> {{ emailError }} </span>
        </div>

        <!-- Role -->
        <div class="form-group">
          <label for="role">Role</label>

          <select v-model="role" id="role">
            <option value="" disabled>Select role</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>

          <span class="error">{{ roleError }}</span>
        </div>

        <!-- Status -->
        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="status" id="status">
            <option value="">Select status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <span class="error"> {{ statusError }} </span>
        </div>

        <!-- Password -->
        <div v-if="!props.editMode" class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter password"
          />

          <span class="error"> {{ passwordError }} </span>
        </div>

        <!-- Actions -->
        <div class="form-actions">
          <button type="button" class="btn cancel" @click="$emit('close')">
            Cancel
          </button>
          <button v-if="!editMode" type="submit" class="btn submit">Save User</button>
          <button v-else type="submit" class="btn submit">Update User</button>

        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { onMounted, watch } from "vue";

const emit = defineEmits(["submit","update"]);

const props = defineProps({
  user: {
    type: Object,
    default: {
      id: 0,
      name: "",
      email: "",
      role: "",
      status: "",
    },
  },
  editMode: {
    type: Boolean,
    default: false,
  },
});



// form setup and validation

const schema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email is required"),
  role: yup.string().required("Please select a role"),
  status: yup.string().required("Please select a status"),
   password: yup.string().when('$editMode', {
    is: false,
    then: (schema) =>
      schema.required("Password is required").min(6),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: fullNameError } = useField("name");
const { value: email, errorMessage: emailError } = useField("email");
const { value: role, errorMessage: roleError } = useField("role");
const { value: status, errorMessage: statusError } = useField("status");
const { value: password, errorMessage: passwordError } = useField("password");

const onSubmit = handleSubmit((values) => {
   props.editMode ? emit('update',values) : emit("submit", values);
});

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      setValues(newUser);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 22px;
  cursor: pointer;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
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

.form-group input,
.form-group select {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: #fafafa;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #6366f1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
}

.btn {
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.btn.cancel {
  background: #e5e7eb;
  color: #374151;
}

.btn.submit {
  background: #6366f1;
  color: #fff;
}

.btn.submit:hover {
  background: #4f46e5;
}

.btn.cancel:hover {
  background: #d1d5db;
}
</style>
