import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Album } from "@/../../types";
import { useRoute } from "vue-router";

export const useAlbumsStore = defineStore("albums", () => {
  const route = useRoute();

  const albums = ref<Album[]>([]);
  const isLoading = ref<boolean>(true); // is used everywhere, so init value is true to avoid flickering
  const error = ref<string>();

  async function fetchAlbums() {
    isLoading.value = true;

    try {
      const response = await fetch("/api/albums");
      if (!response.ok) {
        console.error("Network response was not ok", response.status);
        error.value = "Network response was not ok";
        isLoading.value = false;
        return;
      }

      try {
        const json = await response.json();
        const collections = json.filter(
          (album: Album) => album.wrapperType === "collection"
        );
        albums.value = collections;
      } catch (jsonError) {
        console.error("Error parsing JSON", jsonError);
        error.value = "Error parsing JSON";
        isLoading.value = false;
        return;
      }
    } catch (err) {
      error.value = "Error fetching albums";
      console.error("Error fetching albums", error);
    }

    isLoading.value = false;
  }

  const filteredAlbums = computed(() => {
    const search = route.query.search as string;

    if (!search) {
      return albums.value;
    }

    return albums.value.filter((album) =>
      album.collectionName?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return {
    albums,
    filteredAlbums,
    isLoading,
    error,
    fetchAlbums,
  };
});
