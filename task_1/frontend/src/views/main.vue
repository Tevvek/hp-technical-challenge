<script setup lang="ts">
import Album from '@/components/Album.vue';
import { computed, inject, Ref } from 'vue';
import { type Album as AlbumType } from '@/../../types';
import { useRoute } from 'vue-router';

const albums = inject('albums') as Ref<AlbumType[]>;
const route = useRoute();

const albumsByQueryParams = computed(() => {
  const search = route.query.search as string;

  if (!search) {
    return albums.value;
  }

  return albums.value.filter(album =>
    album.collectionName?.toLowerCase().includes(search.toLowerCase())
  );
});


</script>

<template>
  <!-- Main with albums -->
  <main class="bg-gray-200 p-10">

    <!-- Albums grid -->
    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-5">

      <!-- One album -->
      <Album v-for="(album, index) in albumsByQueryParams" :key="index" v-bind="album" />
    </div>
  </main>
</template>