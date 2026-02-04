<script setup>
import userData from "/src/users.json";
import { ref } from "vue";

const users = ref(userData);
const toggler = ref(false);
const val = ref(0)
const toggle = () => {
  toggler.value = !toggler.value;
};
const inc = () => {
    val.value++
}
const dec = () => {
    val.value--
}
const reset =() => {
    val.value = 0
}

</script>

<template>
  <div class="container">
    <div class="header">
      <h1>User Data</h1>
      <h1>Value is: {{ val }}</h1>
    </div>
    <div class="clicking">
      <button v-on:click="toggle">
        {{ toggler ? "Hide Data" : "Show Data" }}
      </button>
      <button v-on:click="inc">
        Increment Value
      </button>
      <button v-on:click="dec">
        Decrement Value
      </button>
      <button v-on:click="reset">
        Reset Button
      </button>
    </div>
    <div class="user">
      <table v-if="toggler">
        <thead>
          <tr>
            <th v-for="(,key) in users[0]" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in users">
            <td v-for="(,key) in user">{{user[key]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  margin-right: 200px;
  gap: 20px;
}
.clicking {
  display: flex;
  justify-content: center;
  margin-left: 100px;
  margin-right: 100px;
  gap: 20px;
}
h1 {
  color: blue;
  padding: 20px;
  text-align: center;
}
button {
  text-align: center;
  padding: 20px 30px;
  cursor: pointer;
  margin-bottom: 30px;
}
table {
  background-color: #e8e9eb;

}
th {
  background-color: #2c3e50;
  color: white;
}
td {
  padding: 10px;
  border: 10px double white;
  color: black;
}
</style>
