<script setup>
import { computed } from "vue";
import { createUser } from "@/stores/data";
import TableComponent from '@/components/tableComponent.vue';

const userStore = createUser();

const filterUsers = computed(() => {
  return userStore.filteredUsers;
});
</script>

<template>
  <v-container class="d-flex justify-center align-center min-vh-100">
    <div class="table-wrapper"> 
      <TableComponent 
        :users="filterUsers" 
        v-model="userStore.search"
      /> 
    </div>
  </v-container>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto;
}

.min-vh-100 {
  min-height: 80vh;
}
</style>