<script setup>
import { ref } from 'vue'
import {
  extractiveSummarization,
  abstractiveSummarization
} from '../services/summarizationService.js'

const text = ref('')
const numberSentences = ref(3)
const summarizationMethod = ref('extractive')

async function onSummarizationClick() {
  if (summarizationMethod.value === 'extractive') {
    text.value = await extractiveSummarization(text.value, numberSentences.value)
  } else {
    text.value = await abstractiveSummarization(text.value)
  }
}
</script>

<template>
  <div class="mt-16">
    <form class="flex flex-col w-fit mx-auto gap-3" @submit.prevent="onSummarizationClick">
      <textarea
        class="shadow-xl outline-none resize-none rounded-3xl px-3 py-2 bg-gray-100 mt-20 placeholder-gray-900 text-gray-900 font-sans 
        dark:bg-gray-800 dark:text-gray-400 dark:placeholder-gray-400"
        rows="6"
        cols="30"
        placeholder="Вставьте файл"
        v-model="text"
      ></textarea>

      <input
        class="hover:bg-gray-900 transition hover:text-white mt-5 mb-7 cursor-pointer rounded-3xl bg-gray-100 text-gray-900 py-2 shadow-xl 
        dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-400 dark:hover:text-white"
        type="submit"
        value="Отправить"
      />
    </form>

    <form class="flex flex-col w-fit mx-auto gap-4" @submit.prevent="onSummarizationClick">
      <textarea
        class="shadow-xl resize-none outline-none rounded-3xl px-3 py-2 bg-gray-100 placeholder-gray-900 text-gray-900 font-sans
        dark:text-gray-400 dark:bg-gray-800 dark:placeholder-gray-400"
        rows="8"
        cols="100"
        placeholder="Обработанный текст"
        v-model="text"
      ></textarea>

      <div class="flex flex-col text-lg font-sans">
        <div class="flex justify-between items-center">
          <select class="outline-none bg-transparent dark:text-gray-400" v-model="summarizationMethod">
            <option class="dark:bg-gray-800" value="abstractive">Абстрактивная</option>
            <option class="dark:bg-gray-800" value="extractive">Экстрактивная</option>
          </select>

          <div class="flex items-center gap-4 dark:text-gray-400" v-if="summarizationMethod === 'extractive'">
            <p>Кол-во предложений:</p>
            <input
              class="outline-none bg-gray-100 px-2 py-2 w-24 text-center rounded-xl shadow-xl dark:bg-gray-800"
              type="number"
              value="3"
              min="3"
              v-model="numberSentences"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>