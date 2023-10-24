# Spotify Visualizer

Welcome to my spotify visualizer! This next.js web app allows users to visualize their personal spotify data!

![Screenshot 2023-10-23 at 10 43 11 PM](https://github.com/Eddysunday012/spotifyVisualizerWebApp/assets/30426558/ce9cbee1-23fd-409d-9ac1-2cc850916094)

## Setting Up

This project requires some things to start.

1. Install Node.js (v16.18.1) and npm
2. Install Yarn: `npm install --global yarn`
3. Install npm dependencies: `yarn`

## Project Structure

This project uses [Turborepo](https://turborepo.org/) to help facilitate and create a hyper-modularized codebase. This means creating many local npm modules to build, iterate, and test features in complete isolation.

_NOTE_: Turborepo supports a monorepo structure, which is what the website's architecture is based off of. It is _extremely_ overkill for the needs of the current state of this project, however I modeled it this way in case for possible larger expansion in the future.

## What's inside?

This Turborepo includes the following packages/apps:

#### Apps

- `spotify-visualizer`
  - the main next.js supporting all the components
- `[module-name]-dev`
  - all vite powered web-apps to display and test each ui component in isolation

#### Packages

- `data-visuals`
  - all separate ui components along with their respective unit testing suites
    - TODO: add testing suites for Cluster and GenreBreakdown
- `dependencies-context`
  - react context to pass props and data to all ui components
- `spotify-logic`
  - all functions that use API calls to spotify-web-api, along with their respective testing suites
- `theme`
  - main theme that is applied to all components
- `tsconfig`
  - all typescript config files
- `types`
  - types used for each project

### Build

To build all apps and packages, run the following command:

```
yarn
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn
yarn dev
```
