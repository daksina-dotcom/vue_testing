  <script setup>
  import userData from "/src/users.json";
  import { ref } from "vue";
  import { useCounter } from "@/composables/useCounter";
  import LoginComponent from "@/components/login.vue";
  import SignupComponent from "@/components/signup.vue";

  const users = ref(userData);
  const toggler = ref(false);

  const toggle = () => {
    toggler.value = !toggler.value;
  };


  const {val,inc,dec,reset}=useCounter()

  const activeTab = ref('SignupComponent')

  const tabs = {LoginComponent,SignupComponent}

  </script>

  <template>
    <KeepAlive>
      <component :is="tabs[activeTab]"
      @auth-success="activeTab='LoginComponent'"/>
    </KeepAlive>
    <div class="comp">
      <v-btn @click="activeTab='LoginComponent'">Already Registered? Login</v-btn>
      <v-btn @click="activeTab='SignupComponent'">New User? Signup</v-btn>
    </div>
    <div class="container">
      <div class="header">
        <h1>User Data</h1>
        <h1>Value is: {{ val }}</h1>
      </div>
      <div class="clicking">
        <v-btn @click="toggle">
          {{ toggler ? "Hide Data" : "Show Data" }}
        </v-btn>
        <v-btn @click="inc">
          Increment Value
        </v-btn>
        <v-btn @click="dec">
          Decrement Value
        </v-btn>
        <v-btn @click="reset">
          Reset button
        </v-btn>
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
    justify-content: center;
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
  /* v-btn {
    text-align: center;
    padding: 20px 30px;
    cursor: pointer;
    margin-bottom: 30px;
  } */
  
  .comp{
    display: flex;
    justify-content: center;
    align-content: center;
    margin:20px;
    gap:20px;
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
