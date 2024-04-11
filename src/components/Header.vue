<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { logoutUser } from '../services/userService.js'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

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
  <header>
    <div class="w-11/12 mx-auto flex justify-between pt-3">
      <router-link to="/" class="block text-left text-black relative">
        <h1 class="font-sans text-3xl text-gray-900 font-bold dark:text-gray-400">Annotation</h1>
      </router-link>

      <div class="dark-mode-toggle flex justify-end items-center gap-10">
        <router-link to="/history" class="flex dark:text-gray-400" title="История" v-if="user">
          <i class="fa-solid fa-clock-rotate-left text-xl"></i>
        </router-link>
        <button class="dark:text-gray-400" @click="toggleDark()">
          <i
            :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
            class="text-xl"
            :title="isDark ? 'Светлая тема' : 'Тёмная тема'"
          ></i>
        </button>
        <div v-if="user" class="flex gap-4 items-center bg-white px-3 py-2 rounded-md">
          <h4 class="text-xl select-none font-bold">{{ user }}</h4>
          <button class="text-gray-900" type="button" @click="onLogoutBtnClick">
            <i class="fa-solid fa-right-from-bracket text-xl" title="Выход"></i>
          </button>
        </div>
        <router-link class="text-gray-900 dark:text-gray-400" v-else to="/login" title="Вход">
          <i class="fa-solid fa-right-to-bracket text-xl"></i>
        </router-link>
      </div>
    </div>
  </header>
</template>