import React from "react";
import { DependenciesContext } from "dependencies-context";
import { Cluster } from "data-visuals";

function App(): JSX.Element {
  const ClusterInfo = [
    {
      acousticness: 0.000273,
      analysis_url:
        "https://api.spotify.com/v1/audio-analysis/7ouMYWpwJ422jRcDASZB7P",
      danceability: 0.366,
      duration_ms: 366213,
      energy: 0.963,
      id: "7ouMYWpwJ422jRcDASZB7P",
      instrumentalness: 0.0122,
      key: 11,
      liveness: 0.115,
      loudness: -5.301,
      mode: 0,
      speechiness: 0.142,
      tempo: 137.114,
      time_signature: 4,
      track_href: "https://api.spotify.com/v1/tracks/7ouMYWpwJ422jRcDASZB7P",
      type: "audio_features",
      uri: "spotify:track:7ouMYWpwJ422jRcDASZB7P",
      valence: 0.211,
    },
    {
      acousticness: 0.000202,
      analysis_url:
        "https://api.spotify.com/v1/audio-analysis/4VqPOruhp5EdPBeR92t6lQ",
      danceability: 0.602,
      duration_ms: 304840,
      energy: 0.905,
      id: "4VqPOruhp5EdPBeR92t6lQ",
      instrumentalness: 0.064,
      key: 2,
      liveness: 0.117,
      loudness: -4.046,
      mode: 1,
      speechiness: 0.0775,
      tempo: 128.019,
      time_signature: 4,
      track_href: "https://api.spotify.com/v1/tracks/4VqPOruhp5EdPBeR92t6lQ",
      type: "audio_features",
      uri: "spotify:track:4VqPOruhp5EdPBeR92t6lQ",
      valence: 0.411,
    },
    {
      acousticness: 0.00242,
      analysis_url:
        "https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B",
      danceability: 0.585,
      duration_ms: 237040,
      energy: 0.842,
      id: "2takcwOaAZWiXQijPHIx7B",
      instrumentalness: 0.00686,
      key: 9,
      liveness: 0.0866,
      loudness: -5.883,
      mode: 0,
      speechiness: 0.0556,
      tempo: 118.211,
      time_signature: 4,
      track_href: "https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B",
      type: "audio_features",
      uri: "spotify:track:2takcwOaAZWiXQijPHIx7B",
      valence: 0.428,
    },
  ];

  return (
    <>
      <DependenciesContext.Provider value={{ ClusterInfo }}>
        <Cluster />
      </DependenciesContext.Provider>
    </>
  );
}

export default App;
