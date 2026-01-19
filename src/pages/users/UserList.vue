<template>
  <div v-if="!isLoading">
    <div class="user-list">
      <div class="user-list-header">
        <h2>Users</h2>
        <button @click="addUser" class="btn-add">+ Add User</button>
      </div>

      <div class="user-filters">
        <!-- Search -->
        <input
          type="text"
          v-model="searchString"
          class="search-input"
          placeholder="Search by name or email..."
        />

        <!-- Role Filter -->
        <select v-model="selectedRole" class="filter-select">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>

        <!-- Status Filter -->
        <select v-model="selectedStatus" class="filter-select">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
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

        <tbody v-if="filteredUsers.length">
          <tr v-for="user in filteredUsers">
            <td>{{ user?.name }}</td>
            <td>{{ user?.email }}</td>
            <td>{{ user?.role }}</td>
            <td>
              <span
                class="status"
                :class="{
                  active: user?.status === 'active',
                  inactive: user?.status === 'inactive',
                }"
                >{{ user?.status }}</span
              >
            </td>
            <td>
              <button @click="editUser(user)" class="btn-edit">Edit</button>
              <button @click="deleteUser(user?.id)" class="btn-delete">
                Delete
              </button>
            </td>
          </tr>
        </tbody>

        <p v-else style="text-align: center">No users found!!!</p>
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
        <div class="modal">
          <p>Are you sure ?</p>
          <button class="btn-delete" @click="del">Delete</button>
          <button class="btn-delete" @click="showDeleteModal = false">
            Cancel
          </button>
        </div>
      </div>
    </Teleport>
  </div>

  <Loader v-else></Loader>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import UserForm from "./UserForm.vue";
import {
  createUser,
  deleteUsr,
  getUserList,
  update,
} from "@/services/users/users.service";
import Loader from "@/components/common/Loader.vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const allUserList = ref([
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "inactive",
  },
]);

const searchString = ref("");
const selectedRole = ref("");
const selectedStatus = ref("");
const isLoading = ref(true);

/* ✅ COMPUTED FILTER */
const filteredUsers = computed(() => {
  let users = allUserList.value;

  const search = searchString.value.trim().toLowerCase();
  const role = selectedRole.value;
  const status = selectedStatus.value;

  if (search) {
    users = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    );
  }

  if (role) {
    users = users.filter((user) => user.role === role);
  }

  if (status) {
    users = users.filter((user) => user.status === status);
  }

  return users;
});

/* UI STATE */
const showAddUserModel = ref(false);
const user = ref<any>(null);
const editMode = ref(false);
const showDeleteModal = ref(false);
const userId = ref<number | null>(null);

/* ACTIONS */
function addUser() {
  user.value = null;
  editMode.value = false;
  showAddUserModel.value = true;
}

async function add(newUser: any) {
  console.log(newUser);
  isLoading.value = true;
  try {
    const res = await createUser(newUser);
    if (res) {
      toast.success("User created successfuly");
      showAddUserModel.value = false;
      getUsers();
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    isLoading.value = false;
  }
  // allUserList.value.push({
  //   ...newUser,
  //   id: crypto.randomUUID(),
  // });
  // showAddUserModel.value = false;
}

function editUser(item: any) {
  user.value = { ...item };
  editMode.value = true;
  showAddUserModel.value = true;
}

async function updateUser(updatedUser: any) {
  isLoading.value = true;
  try {
    const res = await update(updatedUser.id, updatedUser);
    if (res) {
      toast.success("User updated successfully");
      getUsers();
      showAddUserModel.value = false;
      editMode.value = false;
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    isLoading.value = false;
  }
}

function deleteUser(id: number) {
  userId.value = id;
  showDeleteModal.value = true;
}

async function del() {
  try {
    const res = await deleteUsr(userId.value);
    if (res) {
      toast.success("User deleted successfully");
      getUsers();
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    showDeleteModal.value = false;
  }
}

async function getUsers() {
  isLoading.value = true;
  try {
    const res = await getUserList();
    allUserList.value = res["data"]["data"];
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
}

onMounted(getUsers);
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

.user-filters {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #6366f1;
}

.filter-select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #6366f1;
}
</style>
