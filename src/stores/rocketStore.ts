import { fetchRocketById, fetchRockets } from "@/api/rockets";
import { defineStore } from "pinia";

export const useRocketStore = defineStore('rocket', {
  state: () => ({
    rockets: [] as any[],
    loading: false,
    error: '' as string | null,
  }),
  actions: {
    async loadRockets() {
      this.loading = true;
      this.error = null;
      try {
        const data = await fetchRockets();
        this.rockets = data;
      } catch (error) {
        this.error = error.message || 'Failed to load rockets';
      } finally {
        this.loading = false;
      }
    },

    async reload() {
        await this.loadRockets();
    },

    async getRocketById(id: string) {
        this.loading = true;
        this.error = null;
        try {
            const data = await fetchRocketById(id);
            return data;
        } catch (error) {
            this.error = error.message || `Failed to load rocket details for ID: ${id}`;
            return null;
        } finally {
            this.loading = false;
        }

    },

    addLocalRocket(rocket: any) {
        this.rockets.unshift(rocket);
    },
  },
});