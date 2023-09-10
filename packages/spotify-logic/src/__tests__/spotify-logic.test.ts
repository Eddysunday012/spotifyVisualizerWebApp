import { getTopSongs } from "../spotify-logic";
import { mockResponse, mockedFetch } from "../MockedFetch";

global.fetch = mockedFetch;

describe("getTopSongs", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches top songs successfully", async () => {
    const exampleData = {
      items: [
        // Your example Spotify songs here
        {
          name: "Song 1",
          artist: "Artist 1",
        },
        {
          name: "Song 2",
          artist: "Artist 2",
        },
      ],
    };

    // Mock a successful response
    mockResponse(exampleData);

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function
    const result = await getTopSongs(accessToken);

    // Assert the result
    expect(result).toEqual(exampleData.items);
  });

  it("handles fetch failure", async () => {
    // Mock a failed response
    mockResponse({}, 401); // For example, unauthorized error

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function and expect it to throw an error
    await expect(getTopSongs(accessToken)).rejects.toThrowError(
      "Failed to fetch top tracks"
    );
  });
});
