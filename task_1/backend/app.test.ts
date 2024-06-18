import request from "supertest";
import app from "./app";

declare global {
  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
    }
  }
}

describe("GET /albums", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return a list of unique albums", async () => {
    const mockAlbums = {
      results: [
        { collectionName: "Album 1" },
        { collectionName: "Album 2" },
        { collectionName: "Album 1" },
      ],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAlbums,
    } as unknown as Response);

    const response = await request(app).get("/albums");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { collectionName: "Album 1" },
      { collectionName: "Album 2" },
    ]);
  });

  it("should return 500 if the JSON cannot be parsed", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    } as unknown as Response);

    const response = await request(app).get("/albums");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Could not parse JSON");
  });

  it("should return the status code from the iTunes API if fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    } as unknown as Response);

    const response = await request(app).get("/albums");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Could not fetch albums");
  });

  it("should return 500 if there is an internal server error", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("Internal Server Error"));

    const response = await request(app).get("/albums");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal Server Error");
  });
});
