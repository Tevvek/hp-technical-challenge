import express from "express";
import { AlbumResponse } from "./types";

const app = express();
const port = process.env.PORT ?? 3000;

const ITUNES_URL = "https://itunes.apple.com";
const ARTIST_ID = "909253";
const ITUNES_URL_ARTIST_ALBUMS = `${ITUNES_URL}/lookup?id=${ARTIST_ID}&entity=album`;

app.get("/albums", async (req, res) => {
  // Fetch the albums from the iTunes API
  const result = await fetch(ITUNES_URL_ARTIST_ALBUMS);
  const albumsResponse = (await result.json()) as AlbumResponse;
  const albums = albumsResponse.results;

  // Filter out the unique albums
  const seen = new Set();
  const uniqueAlbums = albums.filter((album) => {
    const duplicate = seen.has(album.collectionName);
    seen.add(album.collectionName);
    return !duplicate;
  });

  // Return the unique albums
  return res.status(200).json(uniqueAlbums);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
