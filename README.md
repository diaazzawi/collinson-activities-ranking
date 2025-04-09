<div align="center">
  <h1 align="center">Activities Ranking System</h1>
</div>

Table of Contents
-

- [Runtime Environments](#runtime-environments)
- [Package Managers](#package-managers)
- [Server Tech Stack](#server-tech-stack)
- [Client Tech Stack](#client-tech-stack)
- [Rationale Behind Tech Stack and Package Selections](#rationale-behind-tech-stack-and-package-selections)
- [Installing Dependencies](#installing-dependencies)
- [Configuration](#configuration)
- [Usage](#usage)
- [License](#license)

# Runtime Environments

You need to make sure you have the following runtime environments installed on your machine.

| Runtime Environments | Version |
| :--------- | :------ |
| [Node.js](https://nodejs.org/en/download) | ![npm](https://img.shields.io/badge/23.7.0-blue) |
| [Bun.js](https://bun.sh/) | ![npm](https://img.shields.io/badge/1.2.7-blue) |

# Package Managers

| Package Managers | Version |
| :--------- | :------ |
| [Bun.js](https://bun.sh/) | ![npm](https://img.shields.io/badge/1.2.7-blue) |

# Server Tech Stack

- **Runtime:** Bun
- **Server Framework:** Elysia
- **Plugins:** Elysia CORS, Elysia Swagger
- **Date and Time:** Luxon
- **Utility:** Lodash

# Client Tech Stack

- **Web Framework:** React 19 with Typescript
- **Tooling:** Bun, Vite
- **API Calls:** Elysia Eden, Axios
- **Components:** Material UI
- **Styling:** Tailwind Styled Components (TailwindCSS + Styled Components)
- **Date and Time:** Luxon
- **Routing** React Router.

- **Runtime:** Bun
- **Server Framework:** Elysia
- **Plugins:** Elysia CORS, Elysia Swagger
- **Date and Time:** Luxon
- **Utility:** Lodash

# Rationale Behind Tech Stack and Package Selections

- **Bun:** A modern, all-in-one JavaScript runtime designed to be a faster and more efficient alternative to Node.js.
- **Vite:** A modern frontend build tool designed to provide a faster and more efficient development experience for web projects.
- **Biome:** A modern toolchain designed for web projects, offering a suite of tools to streamline development and maintain code quality. It combines functionalities like formatting, linting, and diagnostics into a single, high-performance package.
- **Elysia:** A modern, ergonomic web framework designed for building backend servers. It is optimized for Bun.js, making it incredibly fast and efficient. In addition, it offers end-to-end type safety, ensuring type integrity at both runtime and compile time. This makes it ideal for TypeScript developers. It comes with many plugins such as Bearer, CORS, JWT, GraphQL (Apollo and Yoga), OpenTelemetry, Swagger, Static, and WebSocket in addition to a growing number of community plugins, such as Lucia Auth, Elysia Clerk, Vite Plugin, OAuth 2.0, and Sentry.
- **Material UI (MUI):** A popular open-source React component library that implements Google's Material Design principles. It provides a comprehensive set of pre-designed UI components, making it easier for developers to create visually appealing and consistent user interfaces.
- **Tailwind CSS:** A utility-first CSS framework that allows developers to build modern, responsive designs directly in their HTML. Instead of relying on pre-designed components like in traditional frameworks (e.g., Bootstrap and MUI), Tailwind provides a vast array of utility classes that can be combined to create custom designs.
- **Styled Components:** A popular library for styling React applications using a CSS-in-JS approach. It allows developers to write CSS directly within JavaScript files, making it easier to manage styles alongside components.
- **Luxon:** A modern JavaScript library for working with dates and times. It was created as a more lightweight and modern alternative to Moment.js, addressing some of its limitations.
- **React Router:** A powerful library for managing routing in React applications. It enables developers to create dynamic, single-page applications (SPAs) with multiple views, all while maintaining seamless navigation.
- **Axios:** Axios is a promise-based HTTP client for both the browser and Node.js. It simplifies making HTTP requests and handling responses, making it a popular choice for developers. It supports request and response interceptors, that makes it a great choice for modifying the requests before sending them to the server and the responses after receiving them from the server in one centralized place.
- **@uidotdev/usehook:** A a collection of modern, server-safe React hooks developed by the team at ui.dev. It provides a variety of reusable hooks that simplify common tasks in React development. One very useful hook I used in this assessment is the `useDebounce` hook that delays the execution of a function or state update to improve performance, which is very useful when used to wait for the user to stop typing in a text input field instead of making an external API call for each input change (see how I use it in Home.tsx component).
- **@dotenvx/dotenvx:** An enhanced version of the popular dotenv library, designed to manage environment variables more effectively. It offers several advanced features that make it stand out, such as cross-platform compatibility, multi-environment support, encryption/decryption of sensitive environment variables, command-Line utility, and other enhanced features.

***You may have observed that my choice of the tech stacks and packages consistently emphasizes both innovation and efficiency*** 😊.

# Installing Dependencies

Run this command from the **root directory** (where this README.md file is located).

```sh
bun install
```

# Configuration

I used `@dotenvx/dotenvx` package to **securely encrypt** `.env` files in both the server and client. I have also wrote the corresponding scripts in the `package.json` file that will copy the `.env-org` file (which should not be in the repo, but for the purpose of this assessment, I commented it out in the `.gitignore` files).

This repo uses an external Geocoding API [https://geocode.maps.co/](https://geocode.maps.co/) that you'll need to create a [free account](https://geocode.maps.co/join/) and get an API key to use it when fetching the endpoint.

You'll need to replace `YOUR_KEY_GOES_HERE` with your geocoding API key in the `.env-org` file of the **client folder**.

```js
VITE_MAPS_API_KEY="YOUR_KEY_GOES_HERE"
```

The response from the geocoding endpoint contains the coordinates (latitude and longitude) of the input city/town (can be partial since I'm using the Autocomplete component from Material UI). Once the user selects the desired location from the dropdown, the coordinates of the selected location will be passed to the `get` endpoint of our Elysia API backend (http://localhost:3000/api/activities/lat/lng)

# Usage

Run one of the following commands from the **root directory** of the project.

```sh
bun run dev
```

Note that this will run both the frontend and backend, each in a separate tab on your default browser. You can now test the frontend (**please check the video recording I uploaded to my Google Drive, which I emailed you its link**).

You can also test the backend via the swagger interface if you want.

# Features Not Implemented

Due to time constraint, I couldn't implement the following features:

- **Advanced scoring logic.**
- **Login and API authentication.**
- **Error boundary and better error handling/logging.**
- **Using virtualized list (infinite loading!) in the dropdown portion of the `City/Address` autocomplete component.**
- **Adding loading indicator to the UI when fetching the API.**
- **Code optimization.**
- **Adding more comments to the code.**
- **UI cosmetics.**

These features can be discussed during our follow-up meeting.
