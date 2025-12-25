<template>
  <div class="rocket-card" @click="$emit('click')">
    <img :src="image" alt="Rocket Image" />
    <div class="rocket-info">
      <h3 class="rocket-name">{{ name }}</h3>
      <p class="rocket-description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  description: String,
  image: { type: String, default: '' },
});
</script>

<style scoped>
.rocket-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.rocket-card img {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
}
</style>