<template>
    <div class="flex flex-col gap-y-1">
        <label for="search" class="text-sm text-white">Search</label>
        <input type="search" id="search" name="search" class="text-sm rounded-lg px-2 py-1" v-model="search" />
    </div>
</template>

<script setup lang="ts">
import { useDebounce } from '@/composables/useDebounce';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const search = ref(route.query.search ?? '');
const debouncedSearch = useDebounce(search, 500)

watch(debouncedSearch, () => {
    // Reduce number of requests by enforcing minimum search length
    if (debouncedSearch.value.length >= 2 || debouncedSearch.value.length === 0) {
        router.replace({ query: { search: debouncedSearch.value || undefined } });
    }
})

</script>