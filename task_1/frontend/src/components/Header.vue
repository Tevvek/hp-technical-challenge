<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import SearchBox from '@/components/SearchBox.vue'
</script>

<template>
    <header
        class="bg-primary grid place-items-center md:grid-cols-[100px,1fr,100px] md:place-content-center px-10 py-4">

        <!-- Logo wrapper -->
        <div class="flex items-center">
            <Logo />
        </div>

        <!-- Centered search box wrapper -->
        <div class="flex justify-center">

            <!-- Search box group -->
            <SearchBox />
        </div>
    </header>
</template>