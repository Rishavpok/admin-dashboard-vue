<template>
  <div class="user-list">
    <div class="user-list-header">
      <h2>Users</h2>
      <button @click="addUser" class="btn-add">+ Add User</button>
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in userList">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <span
              class="status"
              :class="{
                active: user.status === 'active',
                inactive: user.status === 'inactive',
              }"
              >{{ user.status }}</span
            >
          </td>
          <td>
            <button @click="editUser(user)" class="btn-edit">Edit</button>
            <button @click="deleteUser(user.id)" class="btn-delete">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <UserForm
    v-if="showAddUserModel"
    :user="user"
    :editMode="editMode"
    @close="showAddUserModel = false"
    @submit="add"
    @update="updateUser"
  />

  <Teleport to="body">
    <div v-if="showDeleteModal" class="modal-mask">
      <div  class="modal">
        <p>Are you sure ?</p>
        <button class="btn-delete" @click="del">Delete</button>
         <button class="btn-delete" @click="showDeleteModal = false">Cancel</button>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import UserForm from "./UserForm.vue";

const userList = ref([
  {
    id: 1,
    name: "John Doe",
    email: " john@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: " jane@example.com",
    role: "user",
    status: "inactive",
  },
]);

const showAddUserModel = ref(false);
const user = ref(null);
const editMode = ref(false);
const showDeleteModal = ref(false);
const userId = ref(0)

function deleteUser(id: number) {
  userId.value = id
  showDeleteModal.value = true;
}

 function del() {
  userList.value = userList.value.filter((user) => user.id != userId.value);
  showDeleteModal.value = false
}

function editUser(item: any) {
  user.value = item;
  showAddUserModel.value = true;
  editMode.value = true;
}

function addUser() {
  showAddUserModel.value = true;
}

function add(user: any) {
  userList.value.push({ ...user, id: crypto.randomUUID() });
  showAddUserModel.value = false;
}

function updateUser(user: any) {
  userList.value = userList.value.map((item) =>
    item.id === user.id ? user : item
  );
  showAddUserModel.value = false;
  editMode.value = false;
}
</script>

<style scoped>
.user-list {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.user-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.user-list-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.btn-add {
  background: #6366f1;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
}

.status {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.active {
  background: #d1fae5 !important;
  color: #065f46 !important;
}

.inactive {
  background: #fee2e2;
  color: #991b1b;
}

.btn-edit,
.btn-delete {
  padding: 4px 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  margin-right: 4px;
}

.btn-edit {
  background: #fbbf24;
  color: #fff;
}

.btn-delete {
  background: #ef4444;
  color: #fff;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal {
  position: fixed;
  z-index: 999;
  top: 40%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
