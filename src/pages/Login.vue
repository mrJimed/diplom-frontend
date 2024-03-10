<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { authorizationUser } from '../services/userService.js'

const router = useRouter()
const store = useStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function onLoginSubmit() {
  try {
    const user = await authorizationUser(email.value, password.value)
    store.dispatch('login', user.username)
    router.push({ name: 'Home' })
  } catch (ex) {
    const {
      response: { data }
    } = ex
    errorMessage.value = data
  }
}
</script>

<template>
  <form
    class="w-1/3 max-lg:w-1/2 max-sm:w-10/12 bg-white shadow-xl px-4 pt-10 pb-7 rounded-3xl fixed top-1/4 left-1/2 -translate-x-1/2 dark:bg-gray-800"
    @submit.prevent="onLoginSubmit"
  >
    <h2 class="font-sans text-gray-900 font-bold pb-4 text-center text-3xl dark:text-gray-400">
      Авторизация
    </h2>

    <div class="flex flex-col gap-3 mt-4">
      <p
        v-if="errorMessage"
        class="text-center font-bold bg-red-600 text-white py-2 rounded-3xl select-none cursor-pointer transition hover:bg-red-700"
        @click="() => (errorMessage = '')"
      >
        {{ errorMessage }}
      </p>
      <input
        required
        class="shadow-xl font-sans outline-none bg-gray-100 py-3 mb-3 px-3 rounded-3xl placeholder-gray-900 text-gray-900
        dark:bg-gray-800 dark:border-2 dark:border-gray-400 dark:text-gray-400 dark:placeholder-gray-400 dark:shadow-none"
        type="email"
        placeholder="Введите email..."
        v-model="email"
      />
      <input
        required
        minlength="4"
        class="font-sans shadow-xl outline-none bg-gray-100 py-3 mb-3 px-3 rounded-3xl placeholder-gray-900 text-gray-900
        dark:bg-gray-800 dark:border-2 dark:border-gray-400 dark:text-gray-400 dark:placeholder-gray-400 dark:shadow-none"
        type="password"
        placeholder="Введите пароль..."
        v-model="password"
      />
    </div>

    <div class="text-center">
      <input
        class="hover:bg-gray-900 hover:text-white shadow-xl font-bold outline-none font-sans bg-gray-100 py-3 mb-3 mt-3 px-6 rounded-3xl transition text-gray-900 cursor-pointer text-center
        dark:bg-gray-800 dark:text-gray-400 dark:border-2 dark:border-gray-400 dark:hover:bg-gray-400 dark:hover:text-white dark:shadow-none"
        type="submit"
        value="Войти"
      />
    </div>

    <div class="text-center">
      <router-link to="/registration" class="font-sans text-gray-900 outline-none dark:text-gray-400 hover:underline">Нет аккаунта?</router-link>
    </div>

  </form>
</template>