<script setup>
import {computed} from "vue";
import {createUser} from "@/stores/data";
import TableComponent from "@/components/tableComponent.vue";
import FormComponent from "@/components/formComponent.vue";
import { useRouter } from "vue-router";
const userStore = createUser();
const router = useRouter();

// const searchQuery = (query) => {
//   userStore.search = query.toLowerCase();
// };

const filterUsers = computed(() => {
  return userStore.filteredUsers;
});



</script>

<template>

  <div class="total_container">
    <div class="form-wrapper">
      <FormComponent />
    </div>
        <v-divider class="my-8" width="100%"></v-divider>

    <!-- <div class="table-wrapper">
      <TableComponent :users="filterUsers" v-model="userStore.search">
        </TableComponent>
    </div> -->

  </div>
</template>

<style scoped>
.total_container {
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding: 40px;
  gap: 30px;
  min-height: 100vh;
  background-color: #fafafa;
}

.form-wrapper {
  width: 100%;
  max-width: 600px; 
}

.table-wrapper {
  width: 100%;
  max-width: 1200px; 
}
</style>
