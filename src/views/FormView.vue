<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import FormComponent from "@/components/formComponent.vue";

const focusFirst = ref(null);
const newData = ref([]);
const fullname = computed(() => {
  return `${formData.firstname} ${formData.lastname}`;
});
const errors = reactive({
  name: "",
  age: "",
  phone: "",
  email: "",
  password: "",
});
const formData = reactive({
  // name: "Diwakar",
  // age: 28,
  // phone: "9043367538",
  // email: "diwakar@gmail.com",
  // password: "w@ll$treet",
  // gender: "Male",
  // occupation: "Software Developer"
  firstname: "",
  lastname: "",
  name: "",
  age: null,
  phone: "",
  email: "",
  password: "",
  gender: "",
  occupation: "",
});

const validate = () => {
  let isValid = true;
  errors.name = "";
  errors.age = "";
  errors.phone = "";
  errors.email = "";
  errors.password = "";
  if (formData.firstname.length < 2) {
    errors.name = "Name must be more than 2 characters or atleast 2 characters";
    isValid = false;
  }
  if (formData.lastname.length < 2) {
    errors.name = "Name must be more than 2 characters or atleast 2 characters";
    isValid = false;
  }
  if (formData.age === null || formData.age < 0) {
    errors.age = "Age cannot be negative, null or 0";
    isValid = false;
  }
  if (formData.phone.length !== 10) {
    errors.phone = "Phone Numbers must have 10 digits";
    isValid = false;
  }
  if (formData.password.length == 0 || formData.password.length < 8) {
    errors.password = "Password must be atleast 8 characters";
    isValid = false;
  }
  if (!formData.email.includes("@")) {
    errors.email =
      "A valid email will contain the following format: name@domain.com";
    isValid = false;
  }
  return isValid;
};

const addData = () => {
  if (validate()) {
    const entry = {
      id: newData.value.length + 1,
      firstname: formData.firstname,
      lastname: formData.lastname,
      name: fullname.value,
      age: formData.age,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      occupation: formData.occupation,
    };
    newData.value.push(entry);
  }
};

watch(
  () => formData.firstname,
  (newVal) => {
    if (newVal.length >= 2) {
      errors.name = "";
    }
  },
);

onMounted(() => {
  focusFirst.value.focus();
});
// const jsonString = computed(() => {
//   return JSON.stringify(newData.value, null, 2);
// });

const resetting = () => {
  formData.firstname = "";
  formData.lastname = "";
  formData.name = "";
  formData.age = null;
  formData.phone = "";
  formData.email = "";
  formData.password = "";
  formData.gender = "";
  formData.occupation = "";
  errors.name = "";
  errors.age = "";
  errors.phone = "";
  errors.email = "";
  errors.password = "";
};
</script>

<template>
  <div class="total">
    <div class="form">
      <h1>User Details Form</h1>
      <div class="form-group">
        <label>First Name</label>
        <input
          ref="focusFirst"
          v-model="formData.firstname"
          type="text"
          placeholder="Diwakar"
        />
        <span class="error-text" v-if="errors.name">{{ errors.name }}</span>
        <!-- <p>Current value: {{ formData.name }}</p> -->
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input
          v-model="formData.lastname"
          type="text"
          placeholder="Rajalingam"
        />
        <span class="error-text" v-if="errors.name">{{ errors.name }}</span>
        <!-- <p>Current value: {{ formData.name }}</p> -->
      </div>
      <div class="form-group">
        <label>Full Name</label>
        <p>{{ fullname }}</p>
      </div>
      <div class="form-group">
        <label>Age</label>
        <input v-model="formData.age" type="number" placeholder="28" required />
        <span class="error-text" v-if="errors.age">{{ errors.age }}</span>
        <!-- <p>Current value: {{ formData.age }}</p> -->
      </div>
      <div class="form-group">
        <label>Phone Number</label>
        <input v-model="formData.phone" type="text" placeholder="9043653456" />
        <span class="error-text" v-if="errors.phone">{{ errors.phone }}</span>
        <!-- <p>Current value: {{ formData.phone }}</p>  -->
      </div>
      <div class="form-group">
        <label>Email ID</label>
        <input
          v-model="formData.email"
          type="text"
          placeholder="diwakar@gmail.com"
        />
        <span class="error-text" v-if="errors.email">{{ errors.email }}</span>
        <!-- <p>Current value: {{ formData.email }}</p> -->
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="formData.password" type="text" placeholder="w1lltype" />
        <span class="error-text" v-if="errors.password">{{
          errors.password
        }}</span>
        <!-- <p>Current value: {{ formData.password }}</p> -->
      </div>
      <div class="form-group">
        <label>Gender</label>
        <input
          v-model="formData.gender"
          type="text"
          placeholder="Male/Female (Optional)"
        />
        <!-- <p>Current value: {{ formData.gender }}</p> -->
      </div>
      <div class="form-group">
        <label>Occupation</label>
        <input
          v-model="formData.occupation"
          type="text"
          placeholder="Architect/Doctor etc:- (Optional)"
        />
        <!-- <p>Current value: {{ formData.occupation }}</p> -->
      </div>
      <button @click="addData">Save User Data</button>
      <button @click="resetting">Reset Form</button>
    </div>
    <!-- <div class="display-json">
            <p>Live JSON Array Data</p>
            <textarea readonly :value="jsonString" rows="15"></textarea>
        </div> -->
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Password</th>
          <th>Gender</th>
          <th>Occupation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in newData" v-bind:key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.occupation }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- <FormComponent/> -->
</template>

<style scoped>
h1,
h3,
p {
  text-align: center;
  color: green;
}
button {
  cursor: pointer;
  text-align: center;
  padding: 20px 30px;
}

.error-text {
  color: red;
}

/* .total{
    display: flex;
    flex-direction: row;
    gap:50px;
} */

.total {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0px 40px;
  gap: 30px;
  min-height: 80vh;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px solid green;
  padding: 30px;
  margin: 0 auto;
  border-radius: 10px;
  min-width: 450px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

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
