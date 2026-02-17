<script setup>
import { computed, ref } from "vue";
import { createUser } from "@/stores/data";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const router = useRouter();
const userStore = createUser();

const props = defineProps({
  users: { type: Array, default: () => [] },
});

const search = defineModel();

// Define Headers for Vuetify Data Table
const headers = computed(() => {
  if (props.users.length === 0) return [];
  
  // Dynamically create headers from the first user object
  const keys = Object.keys(props.users[0]).map(key => ({
    title: key.toUpperCase(),
    key: key,
    align: 'center'
  }));

  // Add Action columns
  keys.push({ title: 'EDIT', key: 'edit', sortable: false, align: 'center' });
  if (isAdmin.value) {
    keys.push({ title: 'DELETE', key: 'delete', sortable: false, align: 'center' });
  }
  return keys;
});

const token = Cookies.get('auth_token')
        const decode = jwtDecode(token);
        const userEmail = decode.email;
        const Id = decode.userId;

const isAdmin = computed(() => userStore.currentUser?.isAdmin);

const deleteUser = (id, isActiveRef) => {
  userStore.deleteUser(id);
  if (isActiveRef) isActiveRef.value = false;
  setTimeout(() => {
    alert("Profile deleted successfully!");
  }, 500);
};

const loadEditData = (user) => {
  router.push({ name: 'editUser', params: { id: user.id } });
};

const handleLogout = () => {
  userStore.logoutUser();
};


</script>

<template>
  <div>
    <v-toolbar-title class="ga-3" v-if="userStore.currentUser">
      Welcome, {{ userEmail}}
    </v-toolbar-title>
    <v-btn v-if="userStore.currentUser" @click="handleLogout" color="red">
    Logout
  </v-btn>
  </div>
  <v-container class="fill-height justify-center">
    <v-col cols="12" lg="10">
      <v-card elevation="2" class="pa-4">
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-account-group" class="me-2"></v-icon>
          User Management
          <v-spacer></v-spacer>
          
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search Users"
            single-line
            hide-details
            variant="outlined"
            density="compact"
            class="max-width-search"
          ></v-text-field>
        </v-card-title>

        <v-divider class="my-3"></v-divider>

        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          :items-per-page="5"
          hover
          class="elevation-0 mt-4 custom-table"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td v-for="header in headers.filter(h => !['edit', 'delete'].includes(h.key))" :key="header.key" class="text-center">
                {{ item[header.key] === null || item[header.key] === '' ? '-' : item[header.key] }}
              </td>

              <td class="text-center">
                <v-btn
                  v-if="isAdmin || userStore.currentUser?.id === item.id"
                  icon="mdi-pencil"
                  size="small"
                  variant="text"
                  color="primary"
                  @click="loadEditData(item)"
                ></v-btn>
              </td>

              <td v-if="isAdmin" class="text-center">
                <v-dialog max-width="400">
                  <template v-slot:activator="{ props: dialogProps }">
                    <v-btn 
                      v-bind="dialogProps" 
                      icon="mdi-delete" 
                      size="small" 
                      variant="text" 
                      color="error"
                    ></v-btn>
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-card title="Confirm Deletion">
                      <v-card-text>
                        Delete <strong>{{ item.name }}</strong> with email <strong>{{ item.email }}</strong>?
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
                        <v-btn color="error" variant="elevated" @click="deleteUser(item.id, isActive)">Confirm</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-container>
</template>

<style scoped>
.max-width-search {
  max-width: 300px;
}

/* Custom Table Styling */
.custom-table :deep(thead) {
  background-color: #2c3e50 !important;
}

.custom-table :deep(th) {
  color: white !important;
  font-weight: bold !important;
  text-transform: uppercase;
}

.custom-table :deep(td) {
  padding: 12px !important;
}
</style>