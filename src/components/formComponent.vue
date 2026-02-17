<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { createUser } from "@/stores/data";
import { useRoute } from "vue-router";
const route = useRoute();
const userStore = createUser();

const newData = ref([]);
const isAdmin = computed(() => userStore.currentUser?.isAdmin);
const isCreateMode = ref(false);
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

const loadUserData = async(id) => {
  const userId = id || route.params.id;
  let userToEdit = null;

  if (userId) {
    try{
    
    userToEdit = userStore.newData.find((u) => u.id === parseInt(userId));
  
  if (!userToEdit && userStore.currentUser) {
    userToEdit = userStore.currentUser;
  }
  
  if (!userToEdit) {
        userToEdit = await userStore.fetchUserById(userId);
      }

  if (userToEdit) {
    userStore.editingUser = userToEdit;
    // formData.email = userToEdit.email;
    // formData.password = userToEdit.password;
    // formData.firstname = userToEdit.firstname || "";
    // formData.lastname = userToEdit.lastname || "";
    // formData.age = userToEdit.age;
    // formData.phone = userToEdit.phone;
    // formData.gender = userToEdit.gender;
    // formData.occupation = userToEdit.occupation;
    // formData.isAdmin = userToEdit.isAdmin ? "Admin" : "User";
    // formData.email = userStore.currentUser.email;
    // formData.password = userStore.currentUser.password;
    // formData.isAdmin = userStore.currentUser.isAdmin ? "Admin" : "User";
    // formData.firstname = userStore.currentUser.firstname || "";
    // formData.lastname = userStore.currentUser.lastname || "";
    // formData.age = userStore.currentUser.age || null;
    // formData.phone = userStore.currentUser.phone || "";
    // formData.gender = userStore.currentUser.gender || "";
    // formData.occupation = userStore.currentUser.occupation || "";
    Object.assign(formData, {
      ...userToEdit,
    });
  }
    }catch(e){
      throw e
    }
  }
};
onMounted(() => {
  loadUserData();
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadUserData(newId);
    }
  },
);

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

const addData = async(isActiveRef) => {
  if (!validate()) {
    return;
  }
  const targetId = isCreateMode.value
    ? userStore.newData.length + 1
    :route.params.id? parseInt(route.params.id):userStore.currentUser.id;
  const payload = {
    id: targetId,
    email: formData.email,
    password: formData.password,
    firstname: formData.firstname,
    lastname: formData.lastname,
    name: fullname.value,
    age: formData.age,
    phone: formData.phone,
    gender: formData.gender,
    occupation: formData.occupation,
  };
  try{
  if (isCreateMode.value) {
    await userStore.addUser(payload);
    setTimeout(() => {
      alert("User created successfully!");
    }, 500);
    isCreateMode.value = false;
  } else {
    await userStore.updateUserInfo(payload, methodType);
    alert(`Profile updated successfully via ${methodType}!`);

    setTimeout(() => {
      alert("Profile updated successfully!");
    }, 500);
  }
  if (isActiveRef) isActiveRef.value = false;
}catch(e){
  alert("Error saving Data: ",e.message)
}
};

const enterCreate = () => {
  isCreateMode.value = true;
  resetting();
};

const deleteUser = (id, isActiveRef) => {
  userStore.deleteUser(id);
  if (isActiveRef) isActiveRef.value = false;

  setTimeout(() => {
    alert("Profile deleted successfully!");
  }, 500);
};

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
  formData.isAdmin = "User";
};

const fullname = computed(() => {
  return `${formData.firstname} ${formData.lastname}`;
});

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
  mounted: (inputVal) => {
    console.log(inputVal.tagName);
    const input =
      inputVal.tagName === "INPUT" ? inputVal : inputVal.querySelector("input");
    if (!input) {
      console.warn("No Input Field found");
    }
    input.focus();
  },
};

const vCase = {
  mounted: (inputVal) => {
    // if(input.value){
    //   input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase()
    // }
    const input =
      inputVal.tagName === "INPUT" ? inputVal : inputVal.querySelector("input");
    if (!input) {
      return;
    }
    input.addEventListener("input", (val) => {
      const original = val.target.value;
      const formatted =
        original.charAt(0).toUpperCase() + original.slice(1).toLowerCase();
      if (original !== formatted) {
        val.target.value = formatted;
        input.dispatchEvent(new Event("input"));
      }
    });
    //input.addEventListener('blur',(val)=>val.target.value =val.target.value.charAt(0).toUpperCase() + val.target.value.slice(1).toLowerCase())
  },
};
// const jsonString = computed(() => {
//   return JSON.stringify(newData.value, null, 2);
// });
</script>

<template>
  <div class="total">
    <v-card class="form">
      <div>
        <h1>{{ isCreateMode ? "Create New User" : "User Details Form" }}</h1>
        <v-btn
          v-if="isAdmin && !isCreateMode"
          color="secondary"
          size="small"
          @click="enterCreate"
        >
          Add New User
        </v-btn>

        <v-btn
          v-if="isCreateMode"
          variant="text"
          color="primary"
          @click="isCreateMode = false"
        >
          Back to Edit
        </v-btn>
      </div>

      <div class="form-group">
        <v-text-field
          v-case
          v-focus
          label="First Name"
          variant="outlined"
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
        <v-text-field
          v-case
          label="Last Name"
          v-model="formData.lastname"
          variant="outlined"
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
        <v-text-field variant="outlined" readonly>{{ fullname }}</v-text-field>
      </div>
      <div class="form-group">
        <v-number-input
          controlVariant="split"
          label="Age"
          variant="outlined"
          v-model="formData.age"
          type="number"
          placeholder="28"
          required
        />
        <span class="error-text" v-if="errors.age">{{ errors.age }}</span>
        <!-- <p>Current value: {{ formData.age }}</p> -->
      </div>
      <div class="form-group">
        <v-text-field
          label="Phone"
          variant="outlined"
          v-model="formData.phone"
          type="text"
          placeholder="9043653456"
        />
        <span class="error-text" v-if="errors.phone">{{ errors.phone }}</span>
        <!-- <p>Current value: {{ formData.phone }}</p>  -->
      </div>
      <div class="form-group">
        <v-text-field
          label="Email Id"
          variant="outlined"
          v-model="formData.email"
          type="text"
          placeholder="diwakar@gmail.com"
        />
        <span class="error-text" v-if="errors.email">{{ errors.email }}</span>
        <!-- <p>Current value: {{ formData.email }}</p> -->
      </div>
      <div class="form-group">
        <v-text-field
          label="Password"
          variant="outlined"
          v-model="formData.password"
          type="text"
          placeholder="w1lltype"
        />
        <span class="error-text" v-if="errors.password">{{
          errors.password
        }}</span>
        <!-- <p>Current value: {{ formData.password }}</p> -->
      </div>
      <div class="form-group">
        <v-text-field
          label="Gender"
          variant="outlined"
          v-model="formData.gender"
          type="text"
          placeholder="Male/Female (Optional)"
        />
        <!-- <p>Current value: {{ formData.gender }}</p> -->
      </div>
      <div class="form-group">
        <v-text-field
          label="Occupation"
          variant="outlined"
          v-model="formData.occupation"
          type="text"
          placeholder="Architect/Doctor etc:- (Optional)"
        />
        <!-- <p>Current value: {{ formData.occupation }}</p> -->
      </div>
      <!-- <v-btn @click="addData">Save User Data</v-btn> -->
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            :text="isCreateMode ? 'Create User' : 'Save User Data'"
          ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card :title="isCreateMode ? 'Confirm Creation' : 'Confirm Update'">
            <v-card-text>
              Are you sure you want to
              {{
                isCreateMode
                  ? "create this new user?"
                  : "save changes to this existing data?"
              }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text="Full Update (PUT)" @click="addData(isActive, 'PUT')"></v-btn>
  
              <v-btn text="Quick Patch (PATCH)" @click="addData(isActive, 'PATCH')"></v-btn>
              <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-btn @click="resetting">Reset Form</v-btn>
    </v-card>
    <!-- <div class="display-json">
            <p>Live JSON Array Data</p>
            <textarea readonly :value="jsonString" rows="15"></textarea>
        </div> -->
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
</style>
