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
      <div class="container mx-auto p-10">
        <div class="flex flex-col items-center gap-4">
          <div class="w-full max-w-sm">
            <input type="file" id="file" @change="onFileChange" class="shadow-lg resize-none outline-none rounded-3xl px-3 py-2 bg-gray-100 placeholder-gray-900 text-gray-900 font-sans
              dark:text-gray-400 dark:bg-gray-800 dark:placeholder-gray-400" />
            <label for="file" class="cursor-pointer flex items-center justify-center w-full h-full text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span class="ml-2 font-sans">Выберите или перенесите файл</span>
            </label>
          </div>

          <div v-if="selectedFile" class="justify-center max-w-sm">
            <div class="flex items-center gap-2">
              <span class="text-gray-600 font-sans">Selected file:</span>
              <span class="font-semibold">{{ selectedFile }}</span>
            </div>
            <div class="mt-2">
              <button @click="removeFile" class="shadow-lg resize-none outline-none rounded-3xl px-3 py-2 bg-red-600 text-white font-sans
                hover:bg-red-700 transition">Remove file</button>
            </div>
          </div>
        </div>
      </div>

      <input
        class="hover:bg-gray-900 transition hover:text-white mt-2 mb-7 cursor-pointer rounded-3xl bg-gray-100 text-gray-900 py-2 shadow-xl 
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

      <div class="mt-5">
        <!--... -->

        <input type="checkbox" id="sendEmail" @change="onSendEmailChange">
        <label for="sendEmail">После завершения отправить на email</label>

        <!--... -->
      </div>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: '',
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0]
      this.selectedFile = file? file.name : ''
    },
    removeFile() {
      this.selectedFile = ''
      this.$refs.file.value = ''
    },
  },
}
</script>