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
  class=""
  >
    <div 
    class="w-11/12 mx-auto flex items-center justify-between"
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
      v-if="user"
      class="flex gap-3 items-center border border-slate-300 rounded-xl py-2 px-4 bg-white"
      >
        <h4 
        class="text-xl select-none font-bold"
        >
          {{ user }}
        </h4>
        <button 
        type="button" 
        @click="onLogoutBtnClick"
        >
          <i 
          class="fa-solid fa-right-from-bracket text-xl" 
          title="Выход"
          ></i>
        </button>
      </div>
      <router-link 
      class="text-gray-900 dark:text-gray-400" 
      v-else 
      to="/login" 
      title="Вход"
      >
        <i 
        class="fa-solid fa-right-to-bracket text-xl absolute top-[18px]"
        ></i>
      </router-link>
    </div>
  </header>
  <div 
  class="dark-mode-toggle flex justify-end mt-5 mr-28"
  >
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
  </div>
</template>