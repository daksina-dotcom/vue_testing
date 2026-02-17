<script setup>
import { RouterView, RouterLink } from "vue-router";
import {ref,provide,onMounted} from 'vue';
import { useTheme } from "vuetify";
import { useThemeStore, registerThemePersistence } from "@/stores/theme";
import { createUser } from "./stores/data";

const vuetifyTheme = useTheme();
const themeStore = useThemeStore();
const userStore = createUser()

registerThemePersistence(themeStore, vuetifyTheme);

onMounted(() => {
  vuetifyTheme.name.value = themeStore.isDark ? 'dark' : 'light';
});

onMounted(() => {
  userStore.initAuth();
  console.log("Auth initialized. Current Token:", userStore.token);
});

provide('theme', { 
  header: themeStore.header, 
  font: themeStore.font 
});
provide('themeStatus', { 
  isDark: themeStore.isDark, 
  toggleGlobalTheme: themeStore.toggleTheme 
});

</script>

<template>
  <!-- <header>
    <nav>
            <RouterLink to="/signup"> Signup </RouterLink>
      <RouterLink to="/login"> Login </RouterLink>
      <RouterLink to="/form"> User Form</RouterLink>
      <RouterLink to="/newform"> New Form</RouterLink>
    </nav>

  </header> -->
  
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
/* nav {
  display: flex;
  flex-direction: row;
  align-content: center;
  min-width: 100%;
  padding: 20px;
  background: #eee;
  margin-bottom: 20px;
} */

nav { 
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 15px 20px; 
    background: #f8f9fa; 
    border-bottom: 1px solid #ddd;
    margin-bottom: 30px; 
}

nav a {
    text-decoration: none;
    color: #2c3e50;
}
</style>
