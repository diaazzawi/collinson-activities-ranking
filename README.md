<div align="center">
  <h1 align="center">Activities Ranking System</h1>
</div>

Table of Contents
-

- [Runtime Environments](#runtime-environments)
- [Package Managers](#package-managers)
- [Server Tech Stack](#server-tech-stack)
- [Client Tech Stack](#client-tech-stack)
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
- **Routing & Authentication:** React Router v7 with React Auth.

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

Note that this will run both the frontend and backend, each in a separate tab on your default browser. You can now test the frontend (check the video recording I uploaded to my Google Drive, which I emailed you its link).

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
