<script setup lang="ts">
import { type Album } from '@/../../types';
const props = defineProps<Album>();
</script>

<template>
    <a class="hover:scale-110 transition duration-300" :href="props.collectionViewUrl" target="_blank" rel="noopener noreferrer" :title="props.collectionName" v-if="props.wrapperType === 'collection'">
        <img :src="props.artworkUrl100" :alt="`Album cover for ${props.collectionName}`" class="size-[100px] rounded-lg" />
        <p class="text-sm font-semibold line-clamp-2 mt-2">{{ props.collectionName }}</p>
        <p class="text-sm line-clamp-2" :title="props.artistName">{{ props.artistName }}</p>
    </a>
</template>