<script setup lang="ts">
import Header from '@/components/Header.vue';
import Main from '@/views/main.vue';
import { type Album } from '@/../../types';
import { ref, provide } from 'vue';

const response = await fetch(`/api/albums`)
const albums = await response.json()

const albumsRef = ref<Album[]>(albums);
provide('albums', albumsRef);

</script>
<template>
    <!-- Top header with logo and search box -->
    <Header />

    <Suspense>
        <Main />
    </Suspense>

</template>