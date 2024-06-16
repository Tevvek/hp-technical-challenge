<script setup lang="ts">
import Logo from './components/Logo.vue'
import Album from './components/Album.vue'
</script>

<template>
  <div class="bg-gray-50 min-h-screen grid grid-rows-[min-content,1fr,50px]">

    <!-- Top header with logo and search box -->
    <header
      class="bg-[#005195] grid place-items-center md:grid-cols-[100px,1fr,100px] md:place-content-center px-10 py-4">

      <!-- Logo wrapper -->
      <div class="flex items-center">
        <Logo />
      </div>

      <!-- Centered search box wrapper -->
      <div class="flex justify-center">

        <!-- Search box group -->
        <div class="flex flex-col gap-y-1">
          <label for="search" class="text-sm text-white font-semibold">Search</label>
          <input type="search" id="search" name="search" class="rounded-lg px-2 py-1" />
        </div>
      </div>
    </header>

    <!-- Main with albums -->
    <main class="bg-red-200 p-10">

      <div class="grid grid-cols-4 gap-10">
        <!-- One album -->
        <Album v-for="i in 10" :key="i" />
      </div>
      <!-- Albums grid -->
    </main>

    <!-- Little footer for more info -->
    <footer class="flex justify-center items-center bg-blue-400 text-white">
      <p class="text-sm font-semibold">HP Technical Challenge - Daniil Teterevkov</p>
    </footer>
  </div>
</template>

<style scoped></style>
