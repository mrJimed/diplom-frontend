<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div>
    <Header></Header>
    <div class="w-11/12 mx-auto">
      <router-view></router-view>
    </div>
  </div>
</template>