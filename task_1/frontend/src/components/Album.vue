<script setup lang="ts">
import { Album } from '@/../../types';
const props = defineProps<Album>();

// Big thumbnail, inferred by the use of the URL
const thumbnailURL = props.artworkUrl100.replace('100x100bb.jpg', '250x250bb.jpg');
</script>

<template>
    <a class="hover:scale-110 transition duration-300 w-[250px]" :href="props.collectionViewUrl" target="_blank"
        rel="noopener noreferrer" :title="props.collectionName" v-if="props.wrapperType === 'collection'">
        <img :src="thumbnailURL" :alt="`Album cover for ${props.collectionName}`" class="rounded-lg" />
        <p class="text-sm font-semibold line-clamp-2 mt-2">{{ props.collectionName }}</p>
        <p class="text-sm line-clamp-2" :title="props.artistName">{{ props.artistName }}</p>
    </a>
</template>