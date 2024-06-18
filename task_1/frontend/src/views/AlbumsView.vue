<script setup lang="ts">
import AlbumsProvider from '@/providers/AlbumsProvider.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
    <div class="bg-gray-50 min-h-screen grid grid-rows-[min-content,1fr,50px]">

        <Suspense>
            <AlbumsProvider />
        </Suspense>

        <!-- Little footer for more info -->
        <Footer />
    </div>
</template>
