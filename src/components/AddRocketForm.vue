<template>
  <form @submit.prevent="submit">
    <input v-model="name" placeholder="Rocket Name" required />
    <input v-model="image" placeholder="Rocket Image URL" />
    <textarea v-model="description" placeholder="Rocket Description"></textarea>
    <button type="submit">Add Rocket</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['add']);
const name = ref('');
const image = ref('');
const description = ref('');

function submit() {
  const newRocket = {
    id: Date.now().toString(),
    name: name.value,
    description: description.value,
    flickr_images: image.value ? [image.value] : [],
    cost_per_launch: 0,
    country: 'Unknown',
    first_flight: 'N/A',
  };
  emit('add', newRocket);
  name.value = '';
  image.value = '';
  description.value = '';
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
input, textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  box-sizing: border-box;
}
button {
  width: 200px;
  padding: 8px 16px;
  border: none;
  background-color: #1976d2;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #1565c0;
}
</style>