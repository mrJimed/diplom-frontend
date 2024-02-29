<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { logoutUser } from '../services/userService.js'

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
  <header class="bg-slate-100 shadow-md py-3">
    <div class="w-11/12 mx-auto flex items-center justify-between">
      <router-link to="/">
        <h1 class="font-bold italic text-2xl">Annotation</h1>
      </router-link>

      <div
        v-if="user"
        class="flex gap-3 items-center border border-slate-300 rounded-xl py-2 px-4 bg-white"
      >
        <h4 class="text-xl select-none font-bold">{{ user }}</h4>
        <button type="button" @click="onLogoutBtnClick">
          <i class="fa-solid fa-right-from-bracket text-xl" title="Выход"></i>
        </button>
      </div>
      <router-link v-else to="/login" title="Вход">
        <i class="fa-solid fa-right-to-bracket text-xl"></i>
      </router-link>
    </div>
  </header>
</template>