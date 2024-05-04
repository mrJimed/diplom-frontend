<script setup>
import { ref, onMounted } from 'vue'
import { getHistory } from '../services/historyService.js'

const historyAnnotation = ref([])

onMounted(async () => {
  historyAnnotation.value = await getHistory()
})
</script>

<template>
  <div class="h-screen">
    <div class="flex">
      <h1 class="font-sans text-2xl text-gray-900 font-bold dark:text-gray-400 mx-auto flex">
        История аннотирования
      </h1>
    </div>

    <div class="full flex justify-center mx-10">
      <div class="flex-col">
        <div
          v-for="item in historyAnnotation"
          :key="item.id"
          class="w-auto mt-4 p-4 bg-gray-100 rounded-3xl shadow-xl hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
        >
          <div
            class="mb-2 text-xl font-bold text-gray-500 dark:text-gray-400 flex justify-between items-center select-none"
          >
            <h1>{{ item.title }}</h1>
            <p>{{ item.create_ts }}</p>
          </div>
          <p class="block text-gray-500 dark:text-gray-400">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>