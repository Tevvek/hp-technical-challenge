import Footer from "@/sections/Footer.vue";
import Header from "@/sections/Header.vue";
import Main from "@/sections/Main.vue";
import { useAlbumsStore } from "@/store/albumsStore";
import AlbumsView from "@/views/AlbumsView.vue";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/store/albumsStore");

const mockFetchAlbums = vi.fn();

describe("AlbumsView.vue", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);

    useAlbumsStore.mockReturnValue({
      fetchAlbums: mockFetchAlbums,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders child components and calls fetchAlbums on mount", async () => {
    const wrapper = shallowMount(AlbumsView);

    // Verify fetchAlbums is called
    expect(mockFetchAlbums).toHaveBeenCalledTimes(1);

    // Verify child components are rendered
    expect(wrapper.findComponent(Header).exists()).toBe(true);
    expect(wrapper.findComponent(Main).exists()).toBe(true);
    expect(wrapper.findComponent(Footer).exists()).toBe(true);
  });
});
