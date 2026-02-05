<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  users: { type: Array, default: () => [] },
});


const emit = defineEmits(["filter-users"]);

const current = ref(1);
const rowPerPage = 5;
const pagination = computed(() => {
  const start = (current.value - 1) * rowPerPage;
  const end = start + rowPerPage;
  return props.users.slice(start, end);
});

const totalPages = computed(() => Math.ceil(props.users.length / rowPerPage));

const next = () => {
  if (current.value < totalPages.value) current.value++;
};
const register = ref(0)
const newOne = ref(false)
const count =()=>{
  console.log("Running function")
  return "Running function" 
}
console.log("Console.log",count())

const countCompute=computed(()=>{
  console.log("Running computed")
  return `Running computed : ${register.value}` 
})
console.log(countCompute)
const prev = () => {
  if (current.value > 1) current.value--;
};
const receivedInput = (search) => {
  current.value = 1;
  emit("filter-users", search.target.value);
};
</script>

<template>
  <p>{{ count() }}</p>
  <p>{{countCompute}}</p>
  <button @click="register++">Register updated with a value of {{ register }}</button>
  <button @click="newOne = newOne === true ?false :true">NewOne updated with a change in status as {{ newOne }}</button>
  <label>Search by Name:</label>
  <input type="text" @input="receivedInput" />
  <table>
    <thead>
      <tr>
        <th v-for="(,key) in users[0]" :key="key">{{ key.toUpperCase() }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in pagination" :key="index">
        <td v-for="(,key) in user">{{ user[key] }}</td>
      </tr>
    </tbody>
  </table>
  <div class="paginate">
    <div class="pagination-controls" v-if="users.length > 0">
      <slot name="prev-component-btn" :doFunc="prev" :status="current === 1">
        <button @click="prev" :disabled="current === 1">Prev</button>

      </slot>
      <span>Page {{ current }} of {{ totalPages || 1 }}</span>
      <slot name="next-component-btn" :doFunc="next" :status="current >=totalPages">
        <button @click="next" :disabled="current >= totalPages">Next</button>

      </slot>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f4f4f4;
}

th {
  background-color: #2c3e50;
  color: white;
  padding: 12px;
}

td {
  padding: 15px;
  background-color: #fff;
  border: 4px solid #f4f4f4;
  text-align: center;
}

input {
  margin-bottom: 10px;
  padding: 8px;
}
</style>
