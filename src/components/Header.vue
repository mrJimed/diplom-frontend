<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { logoutUser } from '../services/userService.js'
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const store = useStore()
const user = computed(() => store.getters.user)

async function onLogoutBtnClick() {
  try {
    await logoutUser()
    store.dispatch('logout')
  } catch (ex) {
    console.log(ex)
  }
}
</script>

<template>
  <header 
  class="mb-16"
  >
    <div 
    class="w-11/12 mx-auto flex"
    >
      <router-link 
      to="/" 
      class="block text-left text-black relative"
      >
        <h1 
        class="font-sans text-3xl text-gray-900 font-bold absolute top-[18px] left-[-25px] dark:text-gray-400"
        >
          Annotation
        </h1>
      </router-link>

      <div 
      class="dark-mode-toggle flex justify-end absolute top-[16px] left-[1465px]"
      >
      <router-link
        to="/History" 
        class="flex mr-8"
      >

      <svg viewBox="0 0 512 512" style="currentColor" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-900 dark:text-gray-400">
        <rect 
        width="512" 
        height="512" 
        x="0" 
        y="0" 
        rx="30" 
        fill="transparent" 
        stroke="transparent" 
        stroke-width="0" 
        stroke-opacity="100%" 
        paint-order="stroke">
        </rect>
        <svg width="256px" height="256px" viewBox="0 0 24 24" fill="currentColor" x="128" y="128" role="img" style="display:inline-block;vertical-align:middle" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M5.636 18.364A9 9 0 1 0 3 12.004V14"/>
              <path d="m1 12l2 2l2-2m6-4v5h5"/>
            </g>
          </g>
        </svg>
      </svg>
                
    </router-link>
    
    <button 
    @click="toggleDark()"
      >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-900 dark:text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        >
          <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
      
      <div
          v-if="user"
          class="flex gap-3 items-center"
        >
          <h4 class="text-xl select-none font-bold">{{ user }}</h4>
          <button type="button" @click="onLogoutBtnClick"
          class="text-gray-900 dark:text-gray-400 ml-9">
            <i class="fa-solid fa-right-from-bracket text-xl" title="Выход"></i>
          </button>
        </div>
        <router-link class="text-gray-900 dark:text-gray-400" v-else to="/login" title="Вход">
          <i class="fa-solid fa-right-to-bracket text-xl absolute top-[11px] ml-11"></i>
        </router-link>
      </div>

    </div>
  </header>
</template>