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
  <div 
  class="mt-16"
  >
    <form 
    class="flex flex-col w-fit mx-auto gap-3" 
    @submit.prevent="onSummarizationClick"
    >
      <div 
      class="flex items-center justify-center w-full"
      >
        <label
        v-if="!selectedFile"
        for="dropzone-file" 
        class="flex flex-col items-center justify-center w-96 h-64 shadow-xl rounded-3xl 
        cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <div
          class="flex flex-col items-center justify-center pt-5 pb-6"
          >
            <svg 
            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 20 16"
            >
              <path 
              stroke="currentColor" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p 
            class="mb-2 text-sm text-gray-500 dark:text-gray-400"
            >
             <span>Click to upload</span>or drag and drop
            </p>
            <p
            class="text-xs text-gray-500 dark:text-gray-400"
            >
             Any file types here
            </p>
          </div>
          <input
          id="dropzone-file" 
          type="file" 
          class="hidden"
          @change="onFileChange"
          />
        </label>
        <div 
        v-if="selectedFile" 
        class="justify-center max-w-sm flex items-center"
        >
          <span 
          class="text-gray-500 text-md font-sans dark:text-gray-400 mr-2"
          >
            Selected file: 
          </span>
          <span 
          class="text-gray-700 text-md font-sans font-semibold dark:text-gray-400"
          >
            {{ selectedFile }}
          </span>
          <button
          @click="removeFile"
          >
            <svg
            class="h-5 w-5 text-gray-700 dark:text-gray-400 mt-1 ml-2"
            fill="none"
            viewBox="0 0 40 40"
            stroke="currentColor"
            >
              <path 
              d="M 10,10 L 30,30 M 30,10 L 10,30"
              stroke-width="3"
              />
            </svg>
          </button>
        </div>
      </div>
      <input
      class="hover:bg-gray-200 dark:hover:bg-gray-600 transition mt-2 mb-7 cursor-pointer rounded-3xl bg-gray-100 text-gray-500 py-2 shadow-xl 
      dark:text-gray-400 dark:bg-gray-800"
      type="submit"
      value="Отправить"
      />
    </form>

    <form 
    class="flex flex-col w-fit mx-auto gap-4" 
    @submit.prevent="onSummarizationClick"
    >
      <textarea
      class="shadow-xl resize-none outline-none rounded-3xl px-3 py-2 bg-gray-100 placeholder-gray-500 text-gray-500 font-sans
      dark:text-gray-400 dark:bg-gray-800 dark:placeholder-gray-400"
      rows="8"
      cols="100"
      placeholder="Обработанный текст"
      v-model="text"
      ></textarea>

      <div 
      class="flex flex-col text-lg font-sans"
      >
        <div 
        class="flex justify-between items-center"
        >
          <select 
          class="outline-none bg-transparent text-gray-500 dark:text-gray-400" 
          v-model="summarizationMethod"
          >
            <option 
            class="dark:bg-gray-800" 
            value="abstractive"
            >
              Абстрактивная
            </option>
            <option 
            class="dark:bg-gray-800" 
            value="extractive"
            >
              Экстрактивная
            </option>
          </select>

          <div 
          class="flex items-center gap-4 text-gray-500 dark:text-gray-400" 
          v-if="summarizationMethod === 'extractive'"
          >
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

      <div 
      class="mt-2"
      >
        <!--... -->
        <input
        type="checkbox" 
        id="sendEmail"
        @change="onSendEmailChange"
        />
        <label
        class="text-gray-500 dark:text-gray-400"
        for="sendEmail"
        >
          После завершения отправить на email
        </label>
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