<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { extractiveSummarization, abstractiveSummarization } from '../services/annotationService.js'
import { addHistory } from '../services/historyService.js'

const store = useStore()
const user = computed(() => store.getters.user)

// mail
const emailAddress = ref('')
const isSendEmailAfterCompletion = ref(false)

// annotation
const annotation = ref('')
const summarizationMethod = ref('extractive')
const numberSentences = ref(3)

// dropzone
const dropzoneFile = ref('')
const fileInput = ref(null)

function onSelectedFile(event) {
  dropzoneFile.value = event.target.files[0]
}

function onDragAndDrop(event) {
  dropzoneFile.value = event.dataTransfer.files[0]
}

function openFileDialog() {
  fileInput.value.click()
}

function onRemoveFile() {
  dropzoneFile.value = null
  fileInput.value = null
}

async function onSummarizationClick() {
  if (summarizationMethod.value === 'extractive') {
    annotation.value = await extractiveSummarization(
      dropzoneFile.value,
      numberSentences.value,
      isSendEmailAfterCompletion.value,
      emailAddress.value
    )
  } else {
    annotation.value = await abstractiveSummarization(
      dropzoneFile.value,
      isSendEmailAfterCompletion.value,
      emailAddress.value
    )
  }
  if (user.value) {
    await addHistory(dropzoneFile.value.name, annotation.value)
  }
}
</script>

<template>
  <div class="h-screen mt-32">
    <form class="flex flex-col w-fit mx-auto gap-3" @submit.prevent="onSummarizationClick">
      <div
        @dragover.prevent
        @drop.prevent="onDragAndDrop"
        @click="openFileDialog"
        class="mx-auto flex flex-col items-center justify-center w-96 h-64 shadow-xl rounded-3xl cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <i class="fa-solid fa-cloud-arrow-up text-gray-500 dark:text-gray-400 mb-3 text-3xl"></i>

          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Нажмите для загрузки<br>или перетащите файл</span>
          </p>
        </div>

        <input type="file" ref="fileInput" class="hidden" @change="onSelectedFile" />
      </div>

      <div
        v-if="dropzoneFile"
        class="flex gap-2 items-center text-md text-gray-500 dark:text-gray-400"
      >
        <p>Файл: {{ dropzoneFile.name }}</p>
        <button @click="onRemoveFile">
          <i class="fa-solid fa-xmark text-gray-500 dark:text-gray-400 text-lg"></i>
        </button>
      </div>

      <input
        class="hover:bg-gray-200 dark:hover:bg-gray-600 transition mt-2 mb-7 cursor-pointer rounded-3xl bg-gray-100 text-gray-500 py-2 shadow-xl dark:text-gray-400 dark:bg-gray-800"
        type="submit"
        value="Отправить"
      />
    </form>

    <div class="flex-none w-fit mx-auto gap-4">
      <textarea
        class="shadow-xl resize-none outline-none rounded-3xl px-3 py-2 bg-gray-100 placeholder-gray-500 text-gray-500 font-sans dark:text-gray-400 dark:bg-gray-800 dark:placeholder-gray-400"
        rows="8"
        cols="110"
        placeholder="Обработанный текст"
        v-model="annotation"
        readonly
      ></textarea>

      <div class="flex justify-between items-center text-lg font-sans mt-2 mb-4">
        <select
          class="flex-none px-2 py-3 outline-none bg-transparent text-gray-500 dark:text-gray-400"
          v-model="summarizationMethod"
        >
          <option class="dark:bg-gray-800" value="abstractive">Абстрактивная</option>
          <option class="dark:bg-gray-800" value="extractive">Экстрактивная</option>
        </select>

        <div
          v-if="summarizationMethod === 'extractive'"
          class="flex items-center gap-10 text-gray-500 dark:text-gray-400"
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

      <div class="flex justify-between items-center mt-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="isSendEmailAfterCompletion" />
          <p class="text-lg text-gray-500 dark:text-gray-400 font-sans">
            Отправить на почту после завершения
          </p>
        </div>

        <input
          v-if="isSendEmailAfterCompletion"
          class="outline-none text-gray-500 dark:text-gray-400 bg-gray-100 px-2 py-2 w-80 text-center rounded-xl shadow-xl dark:bg-gray-800 font-sans placeholder:text-gray-500 placeholder:dark:text-gray-400"
          type="email"
          v-model="emailAddress"
          placeholder="Введите вашу электронную почту"
        />
      </div>
    </div>
  </div>
</template>
