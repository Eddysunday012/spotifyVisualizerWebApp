import {
  getTopArtists,
  getTopSongs,
  getUserPlaylistNum,
  getUserProfile,
} from "../spotify-logic";
import { mockResponse, mockedFetch } from "../MockedFetch";

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
          artists: [
            {
              name: "Artist Name",
            },
          ],
          album: {
            name: "Album Name",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b27396c70887c108c7f17640336f",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00001e0296c70887c108c7f17640336f",
                height: 300,
                width: 300,
              },
              {
                url: "https://i.scdn.co/image/ab67616d0000485196c70887c108c7f17640336f",
                height: 64,
                width: 64,
              },
            ],
          },
          duration: 1000,
        },
      ],
    };

    const resultData = [
      {
        name: "Song 1",
        artist: "Artist Name",
        album: "Album Name",
        img: "https://i.scdn.co/image/ab67616d0000485196c70887c108c7f17640336f",
        duration: 1000,
      },
    ];

    // Mock a successful response
    mockResponse(exampleData);

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function
    const result = await getTopSongs(accessToken, "short_term");

    // Assert the result
    expect(result).toEqual(resultData);
  });

  it("handles fetch failure", async () => {
    // Mock a failed response
    mockResponse({}, 401); // For example, unauthorized error

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function and expect it to throw an error
    await expect(getTopSongs(accessToken, "short_term")).rejects.toThrowError(
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

  it("fetches top artists successfully", async () => {
    const exampleData = {
      items: [
        {
          name: "Artist 1",
          percentage: 23,
          images: [
            {
              url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
              height: 300,
              width: 300,
            },
            {
              url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
              height: 300,
              width: 300,
            },
            {
              url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
              height: 300,
              width: 300,
            },
          ],
        },
      ],
    };

    const resultData = [
      {
        name: "Artist 1",
        percentage: 23,
        img: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      },
    ];

    // Mock a successful response
    mockResponse(exampleData);

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function
    const result = await getTopArtists(accessToken, "long-term");

    // Assert the result
    expect(result).toEqual(resultData);
  });

  it("handles fetch failure", async () => {
    // Mock a failed response
    mockResponse({}, 401); // For example, unauthorized error

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function and expect it to throw an error
    await expect(getTopArtists(accessToken, "long-term")).rejects.toThrowError(
      "Failed to fetch top artists"
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

describe("getUserPlaylistNum testing suite", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches user Playlist successfully", async () => {
    const exampleData = {
      total: 90,
      items: [],
    };

    // Mock a successful response
    mockResponse(exampleData);

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function
    const result = await getUserPlaylistNum(accessToken);

    // Assert the result
    expect(result).toEqual(exampleData.total);
  });

  it("handles fetch failure", async () => {
    // Mock a failed response
    mockResponse({}, 401); // For example, unauthorized error

    // Mock the access token
    const accessToken = "your-access-token";

    // Call the function and expect it to throw an error
    await expect(getUserPlaylistNum(accessToken)).rejects.toThrowError(
      "Failed to fetch top tracks"
    );
  });
});
