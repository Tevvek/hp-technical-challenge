import { useAlbumsStore } from "@/store/albumsStore";
import { flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useRoute } from "vue-router";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
}));

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe("albumsStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
    mockUseRoute.mockReturnValue({
      query: {},
    } as any);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it("should initialize with correct values", () => {
    const store = useAlbumsStore();
    expect(store.albums).toEqual([]);
    expect(store.isLoading).toBe(true);
    expect(store.error).toBeUndefined();
  });

  it("should fetch albums successfully", async () => {
    const store = useAlbumsStore();
    const mockAlbums = [
      { wrapperType: "collection", collectionName: "Album 1" },
      { wrapperType: "collection", collectionName: "Album 2" },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAlbums,
    });

    await store.fetchAlbums();
    await flushPromises();

    expect(store.albums).toEqual(mockAlbums);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeUndefined();
  });

  it("should handle network error", async () => {
    const store = useAlbumsStore();

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await store.fetchAlbums();
    await flushPromises();

    expect(store.albums).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBe("Network response was not ok");
  });

  it("should handle JSON parsing error", async () => {
    const store = useAlbumsStore();

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    });

    await store.fetchAlbums();
    await flushPromises();

    expect(store.albums).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBe("Error parsing JSON");
  });
});
