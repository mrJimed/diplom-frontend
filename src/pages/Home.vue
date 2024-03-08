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
        class="border border-slate-300 bg-slate-100 resize-none outline-none rounded-md px-3 py-2 placeholder:italic"
        rows="8"
        cols="150"
        placeholder="Введите текст..."
        v-model="text"
      ></textarea>

      <div class="flex justify-between items-center">
        <select v-model="summarizationMethod">
          <option value="abstractive">Абстрактивная</option>
          <option value="extractive">Экстрактивная</option>
        </select>

        <div class="flex items-center gap-4" v-if="summarizationMethod === 'extractive'">
          <p>Кол-во предложений:</p>
          <input
            class="border border-slate-300 bg-slate-100 rounded-md px-2 py-2 w-24 text-center"
            type="number"
            value="3"
            min="3"
            v-model="numberSentences"
          />
        </div>
      </div>

      <input
        class="cursor-pointer bg-green-600 rounded-md text-white py-2"
        type="submit"
        value="Отправить"
      />
    </form>
  </div>
</template>