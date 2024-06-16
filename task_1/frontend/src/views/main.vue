<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import Album from '@/components/Album.vue'

const response = await fetch('http://localhost:3000/albums')
const albums = await response.json()

console.log(albums[1])
</script>

<template>
      <!-- Main with albums -->
      <main class="bg-gray-200 p-10">

        <!-- Albums grid -->
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-10">
          
          <!-- One album -->
          <Album v-for="(album, index) in albums" :key="index" v-bind="album" />
        </div>
      </main>
  </template>
  