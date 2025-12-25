<template>
  <div>
    <h1>Rocket List</h1>
    <div style="margin-bottom: 16px;">
      <input v-model="query" placeholder="Search rocket..." />
      <button @click="store.reload()">Retry</button>
    </div>

    <AddRocketForm @add="onAdd" />

    <div v-if="store.loading">Loading...</div>
    <div v-else-if="store.error">
      Error: {{ store.error }}
      <button @click="store.reload()">Retry</button>
    </div>
    <div v-else>
      <div class="grid">
        <RocketCard v-for="rocket in filtered" :key="rocket.id || rocket.name" :name="rocket.name"
          :description="rocket.description" :image="rocket.flickr_images?.[0] || ''" @click="goDetail(rocket.id)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRocketStore } from '@/stores/rocketStore';
import { useRouter } from 'vue-router';
import RocketCard from '@/components/RocketCard.vue';
import AddRocketForm from '@/components/AddRocketForm.vue';

const store = useRocketStore()
const router = useRouter()
const query = ref('')

onMounted(() => {
  if (!store.rockets.length) {
    store.loadRockets()
  }
})

const filtered = computed(() =>
  store.rockets.filter((rocket: any) =>
    rocket.name.toLowerCase().includes(query.value.toLowerCase())
  )
)

function goDetail(id: string) {
  router.push({ name: 'RocketDetail', params: { id } })
}

function onAdd(newRocket: any) {
  store.addLocalRocket(newRocket)
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
h1 {
  margin-bottom: 16px;
}
input {
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
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