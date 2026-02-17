<script setup>
import { ref, reactive,computed, onMounted, inject } from "vue";
import { customDirect } from "@/composables/useCounter";
import { createUser } from "@/stores/data";
import { useRouter } from "vue-router";

import { useThemeStore } from "@/stores/theme";
const themeStore = useThemeStore()
const header = computed(()=> themeStore.header)
const font = computed(()=> themeStore.font)
const isDark = computed(({
  get:()=>themeStore.isDark,
  set:(val)=>{
    if(val != themeStore.isDark){
      themeStore.toggleTheme()}
    }
}))

const emit = defineEmits(["auth-success"]);
const router = useRouter();
const show1 = ref(false);
const userStore = createUser();
const newData = ref([]);

// const syncColors = () => {
//   header.value = isDark.value ? "black" : defaultHeader;
//   font.value = isDark.value ? "white" : defaultFont;
// };


// onMounted(syncColors);
const { vFocus } = customDirect();
const errors = reactive({
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
  email: "",
  password: "",
});

const validate = () => {
  let isValid = true;
  const emailPattern = /^[a-zA-Z0-9._%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  errors.email = "";
  errors.password = "";
  if (formData.password.length == 0 || formData.password.length < 8) {
    errors.password = "Password must be atleast 8 characters";
    isValid = false;
  }
  if (!emailPattern.test(formData.email)) {
    errors.email =
      "A valid email will contain the following format: name@domain.com";
    isValid = false;
  }
  return isValid;
};

const addData = async () => {
  if (validate()) {
    const entry = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await userStore.addUser(entry);
      if (response.status === true) {
        setTimeout(() => {
          alert(response.message || "Signup successful!");
          router.push("/login");
        }, 100);
      }
    } catch (err) {
      console.error("Signup error details:", err);
      errors.email = err.message || "User already exists or signup failed";
    }
  }
};
</script>
<template>
  <v-toolbar :color="themeStore.header">
    <v-toolbar-title :style="{ color: themeStore.font }">Header</v-toolbar-title>
    <v-switch
      v-model="isDark"
      :label="isDark ? 'Dark' : 'Light'"
      inset
    />
  </v-toolbar>
  <div class="total">
    <div class="form">
      <v-card-title>Signup Form</v-card-title>
      <div class="form-group">
        <v-text-field
          v-focus
          v-model="formData.email"
          label="Email Id"
          variant="outlined"
          placeholder="E.g. diwakar@gmail.com"
          persistent-placeholder
          hide-details="auto"
          append-icon="mdi-email-outline" 
        />
        <span class="error-text" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <v-text-field
          v-model="formData.password"
          label="Password"
          variant="outlined"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          placeholder="E.g. w1lltype"
          persistent-placeholder
          hide-details="auto"
          @click:append="show1 = !show1"
        />
        <span class="error-text" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <v-btn @click="addData">Signup</v-btn>
    </div>
    <!-- <div class="display-json">
            <p>Live JSON Array Data</p>
            <textarea readonly :value="jsonString" rows="15"></textarea>
        </div> -->
  </div>
</template>

<style scoped>
header {
  background-color: v-bind(header);
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

header div {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: v-bind(font);
}

.total {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

h1,
h3,
p {
  text-align: center;
  color: green;
}
v-btn {
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

/* .total {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0px 40px;
  gap: 30px;
  min-height: 80vh;
} */
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
