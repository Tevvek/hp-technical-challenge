import express from "express";
import cors from "cors";
import { AlbumResponse } from "./types";

const app = express();

const CORS_OPTIONS = {
  origin: "http://localhost:5173", // frontend
};
app.use(cors(CORS_OPTIONS));

const port = process.env.PORT ?? 3000;

const ITUNES_URL = "https://itunes.apple.com";
const ARTIST_ID = "408932";
const ITUNES_URL_ARTIST_ALBUMS = `${ITUNES_URL}/lookup?id=${ARTIST_ID}&entity=album`;

app.get("/albums", async (req, res) => {
  try {
    // Fetch the albums from the iTunes API
    const result = await fetch(ITUNES_URL_ARTIST_ALBUMS);

    // Check if the request was successful
    if (!result.ok) {
      return res.status(result.status).send("Could not fetch albums");
    }

    // Parse the response
    let albumsResponse: AlbumResponse;
    try {
      albumsResponse = (await result.json()) as AlbumResponse;
    } catch (jsonError) {
      console.error(jsonError);
      return res.status(500).send("Could not parse JSON");
    }
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
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
