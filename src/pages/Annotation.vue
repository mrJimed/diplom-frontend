<script setup>
import { getHistoryInfo } from '@/services/historyService'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const annotationInfo = ref({})

onMounted(async () => {
  annotationInfo.value = await getHistoryInfo(route.params.id)
})
</script>

<template>
  <div class="flex flex-col gap-4 mt-6 text-gray-500 dark:text-gray-400">
    <div class="flex flex-col text-lg">
      <div class="flex gap-3">
        <p>
          <span class="font-bold">Аннотация для файла: </span>
          {{ annotationInfo.title }}
        </p>
        <a :href="`/file/${annotationInfo.file_id}`" title="Скачать файл">
          <i class="fa-solid fa-download"></i>
        </a>
      </div>
      <p>
        <span class="font-bold">Дата создания:</span>
        {{ annotationInfo.create_ts }}
      </p>
      <p>
        <span class="font-bold">Тип суммаризации:</span>
        {{ annotationInfo.type }}
      </p>
    </div>

    <div>
      <p class="text-center text-2xl mb-2 font-bold">Аннотация</p>
      <textarea
        class="w-full shadow-xl resize-none outline-none rounded-3xl px-3 py-2 bg-gray-100 placeholder-gray-500 text-gray-500 font-sans dark:text-gray-400 dark:bg-gray-800 dark:placeholder-gray-400"
        rows="8"
        placeholder="Обработанный текст"
        v-model="annotationInfo.annotation"
        readonly
      ></textarea>
    </div>

    <div>
      <p class="text-center text-2xl mb-2 font-bold">Транскрибация</p>
      <textarea
        class="w-full shadow-xl resize-none outline-none rounded-3xl px-3 py-2 bg-gray-100 placeholder-gray-500 text-gray-500 font-sans dark:text-gray-400 dark:bg-gray-800 dark:placeholder-gray-400"
        rows="8"
        cols="110"
        placeholder="Обработанный текст"
        v-model="annotationInfo.transcribation"
        readonly
      ></textarea>
    </div>
  </div>
</template>
