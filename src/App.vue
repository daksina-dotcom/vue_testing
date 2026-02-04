<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/"> Home </RouterLink>
      <RouterLink to="/form"> User Form</RouterLink>
      <RouterLink to="/newform"> New Form</RouterLink>
    </nav>
  </header>
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
