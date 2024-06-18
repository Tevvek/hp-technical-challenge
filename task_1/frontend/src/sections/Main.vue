<script setup lang="ts">
import Album from '@/components/Album.vue';
import { useAlbumsStore } from '@/store/albumsStore';
import { storeToRefs } from 'pinia';

const albumsStore = useAlbumsStore();
const { filteredAlbums, error, isLoading } = storeToRefs(albumsStore);
</script>

<template>
  <!-- Main with albums -->
  <main class="bg-gray-200 p-10">

    <!-- Show loading state if data still loading -->
    <div v-if="isLoading" class="text-center text-gray-800">
      <p>Loading...</p>
    </div>

    <!-- Show error message if data loading failed -->
    <div v-else-if="error" class="text-center text-red-600">
      <p>Error: {{ error }}</p>
    </div>

    <!-- Check if there are no albums -->
    <div v-else-if="filteredAlbums.length === 0" class="text-center text-gray-800">
      <p>No albums found by filtered text</p>
    </div>

    <!-- Transitioned albums grid -->
    <TransitionGroup v-else name="animated-grid" tag="div" class="animated-grid">
      <!-- Specific album -->
      <Album v-for="(album) in filteredAlbums" :key="album.collectionId" v-bind="album" class="animated-grid-item" />
    </TransitionGroup>
  </main>
</template>

<style scoped>
.animated-grid {
  @apply grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8;
}

.animated-grid-item {
  transition: all 500ms ease;
}

.animated-grid-move {
  transform: scale(0.9);
}

.animated-grid-leave-active {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 500ms ease, transform 500ms ease;
}

.animated-grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>