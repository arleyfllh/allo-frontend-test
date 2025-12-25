<template>
  <div>
    <button @click="$router.back()">Back</button>
    
    <div v-if="store.loading">Loading...</div>
    <div v-else-if="store.error">
      Error: {{ store.error }}
      <button @click="store.reload()">Retry</button>
    </div>
    <div v-else-if="rocket">
      <img :src="rocket.flickr_images?.[0] || ''" alt="image" style="width: 100%; max-width: 600px; border-radius: 8px;" />
      <h2>{{ rocket.name }}</h2>
      <p>{{ rocket.description }}</p>
      <ul>
        <li><strong>First Flight:</strong> {{ rocket.first_flight }}</li>
        <li><strong>Country:</strong> {{ rocket.country }}</li>
        <li><strong>Cost per Launch:</strong> ${{ rocket.cost_per_launch.toLocaleString() }}</li>
      </ul>
    </div>
    <div v-else>
      Rocket not found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRocketStore } from '@/stores/rocketStore';
import { useRoute } from 'vue-router';

const store = useRocketStore();
const route = useRoute();
const rocket = ref<any | null>(null);

async function loadRocket() {
  const id = route.params.id as string;
  rocket.value = store.rockets.find((r: any) => r.id === id) ?? null;
  if (!rocket.value) {
    const r = await store.getRocketById(id);
    rocket.value = r ?? null;
  }
}

onMounted(() => {
  loadRocket();
});
</script>

<style scoped>
button {
  margin-bottom: 16px;
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