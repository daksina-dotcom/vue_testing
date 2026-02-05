<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { createUser } from "@/stores/data";
import TableComponent from "@/components/tableComponent.vue";
const userStore = createUser();

const searchQuery = (query) => {
  userStore.search = query.toLowerCase();
};

const filterUsers = computed(() => {
  return userStore.filteredUsers;
});

const focusFirst = ref(null);
const newData = ref([]);
const fullname = computed(() => {
  return `${formData.firstname} ${formData.lastname}`;
});

const errors = reactive({
  firstname: "",
  lastname: "",
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
  errors.firstname = "";
  errors.lastname = "";
  errors.name = "";
  errors.age = "";
  errors.phone = "";
  errors.email = "";
  errors.password = "";
  if (formData.firstname.length < 2) {
    errors.firstname =
      "Name must be more than 2 characters or atleast 2 characters";
    isValid = false;
  }
  if (formData.lastname.length < 2) {
    errors.lastname =
      "Name must be more than 2 characters or atleast 2 characters";
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
    userStore.addUser(entry);
  }
};

watch(
  () => formData.firstname,
  (newVal) => {
    if (newVal.length >= 2) {
      errors.firstname = "";
    }
  },
);

watch(
  () => formData.lastname,
  (newVal) => {
    if (newVal.length >= 2) {
      errors.lastname = "";
    }
  },
);

const vFocus = {
  mounted:(input) => {
    input.focus();
  },
};

const vCase = {
  mounted:(input)=>{
    if(input.value){
      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase()
    }
    input.addEventListener('input',(val)=>{
      if(val.target.value){
        val.target.value = val.target.value.charAt(0).toUpperCase() + val.target.value.slice(1).toLowerCase()
      }
    })
  }
}

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
  errors.firstname = "";
  errors.lastname = "";
};
</script>

<template>
  <div class="total">
    <div class="form">
      <h1>User Details Form</h1>
      <div class="form-group">
        <label>First Name</label>
        <input
          v-case
          v-focus
          v-model="formData.firstname"
          type="text"
          placeholder="Diwakar"
        />
        <span class="error-text" v-if="errors.firstname">{{
          errors.firstname
        }}</span>
        <!-- <p>Current value: {{ formData.name }}</p> -->
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input
          v-case
          v-model="formData.lastname"
          type="text"
          placeholder="Rajalingam"
        />
        <span class="error-text" v-if="errors.lastname">{{
          errors.lastname
        }}</span>
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
    <TableComponent :users="filterUsers" @filter-users="searchQuery">
      <template #prev-component-btn="{ doFunc, status }">
        <FancyButton @click="doFunc" :disabled="status" class="green-btn">
          Backward
        </FancyButton>
      </template>

      <template #next-component-btn="{ doFunc, status }">
        <FancyButton @click="doFunc" :disabled="status" class="orange-btn">
          Forward
        </FancyButton>
      </template>
    </TableComponent>
  </div>
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

.orange-btn {
  background-color: orange;
  color: blue;
}
.green-btn {
  background-color: greenyellow;
  color: white;
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
