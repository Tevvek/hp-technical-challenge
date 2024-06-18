<script setup lang="ts">
import Header from '@/sections/Header.vue';
import Main from '@/sections/Main.vue';
import Footer from '@/sections/Footer.vue';
import { useAlbumsStore } from '@/store/albumsStore';

const albumsStore = useAlbumsStore();
albumsStore.fetchAlbums();
</script>

<template>
    <div class="bg-gray-50 min-h-screen grid grid-rows-[min-content,1fr,50px]">
        <Header />

        <Main />

        <Footer />
    </div>
</template>
