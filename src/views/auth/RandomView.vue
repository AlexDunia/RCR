<template>
  <div>
    <form @submit.prevent="getContent">
      <input type="text" v-model="driveUrl" placeholder="Enter Google Drive URL" />
      <button type="submit">Get Content</button>
    </form>
    <div v-if="content">
      <h3>File Content:</h3>
      <p>{{ content }}</p>
    </div>
    <div v-if="error">
      <h3>Error:</h3>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const driveUrl = ref('');
const content = ref(null);
const error = ref(null);

async function getContent() {
    content.value = null;
    error.value = null;
    try {
        const response = await axios.post('https://localhost:8000/api/captions', { url: driveUrl.value });
        content.value = response.data.content;
    } catch (e) {
        error.value = e.response?.data?.error || 'An unexpected error occurred.';
        console.error('Error details:', e.response?.data || e.message);
    }
}
</script>
