<script setup>
import { ref } from 'vue'
import {
  extractiveSummarization,
  abstractiveSummarization
} from '../services/summarizationService.js'

const text = ref('')
const topN = ref(3)
const summarizationMethod = ref('extractive')

async function onSummarizationClick() {
  text.value = await extractiveSummarization(text.value, topN.value)
  console.log(text.value)
}
</script>

<template>
  <div>
    <select v-model="summarizationMethod">
      <option value="abstractive">Абстрактивная</option>
      <option value="extractive">Экстрактивная</option>
    </select>

    <form class="flex flex-col w-fit mx-auto gap-3" @submit.prevent="onSummarizationClick">
      <textarea
        class="border border-slate-300 bg-slate-100 resize-none outline-none rounded-md px-3 py-2 placeholder:italic"
        rows="8"
        cols="150"
        placeholder="Введите текст..."
        v-model="text"
      ></textarea>
      <input
        class="border border-slate-300 bg-slate-100 rounded-md px-3 py-2"
        type="number"
        value="3"
        min="3"
        v-model="topN"
      />
      <input
        class="cursor-pointer bg-green-600 rounded-md text-white py-2"
        type="submit"
        value="Отправить"
      />
    </form>
  </div>
</template>