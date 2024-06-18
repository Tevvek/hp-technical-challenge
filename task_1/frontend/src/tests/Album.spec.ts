import { Album as AlbumType } from "@/../../types";
import Album from "@/components/Album.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("Album.vue", () => {
  const albumProps: AlbumType = {
    wrapperType: "collection",
    collectionType: "Album",
    artistId: 1,
    collectionId: 1,
    amgArtistId: 1,
    artistName: "Test Artist",
    collectionName: "Test Album",
    collectionCensoredName: "Test Album",
    artistViewUrl: "http://example.com/artist",
    collectionViewUrl: "http://example.com",
    artworkUrl60: "http://example.com/60x60bb.jpg",
    artworkUrl100: "http://example.com/100x100bb.jpg",
    collectionPrice: 9.99,
    collectionExplicitness: "notExplicit",
    trackCount: 10,
    copyright: "Test Copyright",
    country: "USA",
    currency: "USD",
    releaseDate: "2023-01-01T00:00:00Z",
    primaryGenreName: "Rock",
  };

  it("renders the album with the correct props", () => {
    const wrapper = mount(Album, {
      props: albumProps,
    });

    const img = wrapper.find("img");
    const link = wrapper.find("a");

    expect(img.attributes("src")).toBe("http://example.com/250x250bb.jpg");
    expect(img.attributes("alt")).toBe("Album cover for Test Album");
    expect(link.attributes("href")).toBe("http://example.com");
    expect(link.attributes("title")).toBe("Test Album");

    const paragraphs = wrapper.findAll("p");
    expect(paragraphs[0].text()).toBe("Test Album");
    expect(paragraphs[1].text()).toBe("Test Artist");
  });

  it("does not render the album link if wrapperType is not collection", () => {
    const wrapper = mount(Album, {
      props: { ...albumProps, wrapperType: "track" },
    });

    expect(wrapper.find("a").exists()).toBe(false);
  });
});
