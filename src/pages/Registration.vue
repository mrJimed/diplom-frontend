<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import {
  extractiveSummarization,
  abstractiveSummarization
} from '../services/summarizationService.js'
import { addHistory, getHistory } from '../services/historyService.js'

const store = useStore()
const user = computed(() => store.getters.user)

const text = ref('')
const numberSentences = ref(3)
const summarizationMethod = ref('extractive')

async function onSummarizationClick() {
  if (summarizationMethod.value === 'extractive') {
    text.value = await extractiveSummarization(text.value, numberSentences.value)
  } else {
    text.value = await abstractiveSummarization(text.value)
  }
  if (user.value) {
    await addHistory('title', text.value)
  }
}
</script>

<template>
  <form
  class="border-none w-1/3 max-lg:w-1/2 max-sm:w-10/12 bg-gray-100 shadow-xl px-4 
  pt-10 pb-7 rounded-3xl fixed top-1/4 left-1/2 -translate-x-1/2 dark:bg-gray-800"
  @submit.prevent="onRegistrationSubmit"
  >
    <h2 
    class="font-sans text-gray-500 font-bold pb-4 text-center text-3xl dark:text-gray-400"
    >
      Регистрация
    </h2>

    <div 
    class="flex flex-col gap-3 mt-4"
    >
      <p
      v-if="errorMessage"
      class="text-center font-bold bg-red-600 text-white py-2 rounded-3xl select-none 
      cursor-pointer transition hover:bg-red-700"
      @click="() => (errorMessage = '')"
      >
        {{ errorMessage }}
      </p>
      <input
      required
      class="font-sans border-2 bg-gray-100 py-3 mb-3 px-3 outline-none rounded-3xl transition placeholder-gray-500 
      text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:placeholder-gray-400"
      type="text"
      minlength="4"
      placeholder="Введите логин..."
      v-model="username"
      />
      <input
      required
      class="font-sans border-2 bg-gray-100 py-3 mb-3 px-3 outline-none rounded-3xl transition placeholder-gray-500 
      text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:placeholder-gray-400"
      type="email"
      placeholder="Введите email..."
      v-model="email"
      />
      <input
      required
      class="font-sans border-2 bg-gray-100 py-3 mb-3 px-3 outline-none rounded-3xl transition placeholder-gray-500 
      text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:placeholder-gray-400"
      type="password"
      minlength="4"
      placeholder="Введите пароль..."
      v-model="password"
      />
    </div>
    <div 
    class="text-center"
    >
      <input
      class="font-bold font-sans bg-gray-100 border-2 py-3 mb-3 mt-3 px-6 outline-none 
      rounded-3xl transition text-gray-500 cursor-pointer text-center hover:bg-gray-200
      dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
      dark:hover:bg-gray-600"
      type="submit"
      value="Создать аккаунт"
      />
    </div>
  </form>
</template>