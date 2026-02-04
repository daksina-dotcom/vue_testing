<script setup>
const props = defineProps({
    users: Array
});
const emit = defineEmits("filter-users")

const receivedInput = (search) =>{
    emit('filter-users',search.target.value)
}
</script>

<template>
    <input type="text" @input="receivedInput"/>
  <table>
    <thead>
      <tr>
        <th v-for="(,key) in users[0]" :key="key">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users">
        <td v-for="(,key) in user">{{ user[key] }}</td>
      </tr>
    </tbody>
  </table>
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

input{
    margin-bottom: 10px; padding: 8px;
}
</style>
