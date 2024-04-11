<script>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { authorizationUser } from '../services/userService.js'
    const router = useRouter()
    const store = useStore()

    async function onHistorySubmit() {
        try {
            router.push({ name: 'History' })
        } catch (ex) {
            const {
            response: { data }
            } = ex
            errorMessage.value = data
        }
    }

    export default {
      data() {
          return {
          items: [
              {id: 1, title: 'Item 1', text: 'Text 1', create_ts: new Date()},
              {id: 2, title: 'Item 2', text: 'Text 2', create_ts: new Date()},
              {id: 3, title: 'Item 3', text: 'Text 3', create_ts: new Date()},
              {id: 4, title: 'Item 4', text: 'Text 4', create_ts: new Date()},
              {id: 5, title: 'Item 5', text: 'Text 5', create_ts: new Date()},
          ]
          };
      },
      created() {
          this.fetchData();
      },
      methods: {
        fetchData() {
          fetch('back api url')
            .then(response => response.json())
            .then(data => {
              this.items = data;
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      }
    };
</script>

<template>
    <div class="full flex justify-center">
      <div class="flex-col">
        <div v-for="item in items" :key="item.id" class="w-96 mt-4 h-64 p-4 bg-gray-100 rounded-3xl shadow-xl hover:bg-gray-200 
        dark:bg-gray-800 dark:hover:bg-gray-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
          <h2 class="block text-xl font-bold text-gray-500 dark:text-gray-400">{{ item.title }}</h2>
          <p class="block text-gray-500 dark:text-gray-400">{{ item.text }}</p>
          <p class="block text-gray-500 dark:text-gray-400">{{ item.create_ts }}</p>
        </div>
      </div>
    </div>
</template>
