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
        class="hover:bg-gray-900 transition hover:text-white mt-2 mb-7 cursor-pointer rounded-3xl bg-gray-100 text-gray-900 py-2 shadow-xl 
        dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-400 dark:hover:text-white"
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

      // drag n drop
      selectedFile: '',
      // send mail
      sendEmailAfterCompletion: false,
      showEmailInput: false,
      email: ''
    }
  },
  methods: {

    //darg n drop methods
    onFileChange(event) {
      const file = event.target.files[0]
      this.selectedFile = file? file.name : ''
    },
    removeFile() {
      this.selectedFile = ''
      this.$refs.file.value = ''
    },

    // send mail methods
    toggleEmailInput() {
      this.showEmailInput = !this.showEmailInput;
    },
    sendEmail() {
      // логика отправки электронной почты
      console.log('Отправка на электронную почту:', this.email);
      this.sendEmailAfterCompletion = false;
      this.email = '';
      this.showEmailInput = false;
    },
  },
}
</script>