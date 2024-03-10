<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div
    class="h-screen bg-gradient-to-r from-purple-200 via-white to-blue-200 dark:h-screen dark:bg-gradient-to-r dark:from-color1 dark:to-color3"
  >
    <Header></Header>
    <router-view></router-view>
  </div>
</template>