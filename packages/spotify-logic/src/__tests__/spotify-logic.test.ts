import { getTopArtists, getTopSongs, getUserProfile } from "../spotify-logic";
import { mockResponse, mockedFetch } from "../MockedFetch";
import { myUser } from "../../../types/src";

global.fetch = mockedFetch;

describe("getTopSongs testing suite", () => {
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

describe("getTopArtists testing suite", () => {
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
          artist: "Artist 1",
        },
        {
          artist: "Artist 2",
        },
      ],
    };

    // Mock a successful response
    mockResponse(exampleData);

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function
    const result = await getTopArtists(accessToken);

    // Assert the result
    expect(result).toEqual(exampleData.items);
  });

  it("handles fetch failure", async () => {
    // Mock a failed response
    mockResponse({}, 401); // For example, unauthorized error

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function and expect it to throw an error
    await expect(getTopArtists(accessToken)).rejects.toThrowError(
      "Failed to fetch top tracks"
    );
  });
});

describe("getUserProfile testing suite", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches user profile successfully ", async () => {
    const exampleData = {
      display_name: "string",
      external_urls: {
        spotify: "string",
      },
      followers: {
        href: "string",
        total: 0,
      },
      href: "string",
      id: "string",
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          height: 300,
          width: 300,
        },
      ],
      type: "user",
      uri: "string",
    };

    // Mock a successful response
    mockResponse(exampleData);

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function
    const result = await getUserProfile(accessToken);

    // Assert the result
    expect(result).toEqual(exampleData);
  });

  it("handles fetch failure", async () => {
    // Mock a failed response
    mockResponse({}, 401); // For example, unauthorized error

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function and expect it to throw an error
    await expect(getUserProfile(accessToken)).rejects.toThrowError(
      "Failed to fetch top tracks"
    );
  });
});
