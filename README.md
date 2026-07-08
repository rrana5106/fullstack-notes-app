# NoteStack — Full-Stack Notes App

A full-stack note-taking application built with **Node.js** and **Express**, featuring complete CRUD functionality behind a lightweight vanilla HTML/CSS/JavaScript frontend.

**🔗 Live Demo:** [fullstack-notes-app-o603.onrender.com](https://fullstack-notes-app-o603.onrender.com/)
**📦 Repository:** [github.com/rrana5106/fullstack-notes-app](https://github.com/rrana5106/fullstack-notes-app)

## Features

- Create, read, update, and delete notes (full CRUD)
- Dashboard-style interface for viewing and managing notes/tasks
- Unique note IDs generated with `uuid`
- Persistent storage via a local JSON data file — no external database setup required

## Tech Stack

**Backend**
- Node.js
- Express `^5.2.1`
- `uuid` `^14.0.1` — generates unique IDs for each note

**Frontend**
- HTML5
- CSS3
- Vanilla JavaScript (served as static files from `public/`)

**Storage**
- `data.json` — flat-file JSON storage

**Dev tooling**
- `nodemon` `^3.1.14` — auto-restarts the server on file changes during development

**Deployment**
- [Render](https://render.com)

## Project Structure

```
fullstack-notes-app/
├── public/             # Frontend assets (HTML, CSS, JS)
├── data.json           # Notes data store
├── server.js           # Express server & API routes
├── package.json
├── package-lock.json
└── .gitignore
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended, required by Express 5)
- npm

### Installation

```bash
git clone https://github.com/rrana5106/fullstack-notes-app.git
cd fullstack-notes-app
npm install
```

### Running locally

```bash
# Production mode
npm start

# Development mode (auto-restarts on file changes via nodemon)
npm run dev
```

Once the server starts, open the local URL printed in your terminal (Express will listen on the port defined in `server.js` or the `PORT` environment variable) to view the app in your browser.

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Starts the server with `node server.js` |
| `npm run dev` | Starts the server with `nodemon` for hot-reload during development |

## Data Persistence

Notes are stored in `data.json` on the server's local filesystem. On hosting platforms with ephemeral storage (including Render's free tier), this data can be reset on redeploys or restarts. For production use, consider migrating notes storage to a persistent database.

## Deployment

This app is deployed on [Render](https://render.com). To deploy your own copy:

1. Push this repository to your own GitHub account.
2. Create a new **Web Service** on Render and connect your repo.
3. Set the build command to `npm install` and the start command to `npm start`.

## License

ISC

## Author

[rrana5106](https://github.com/rrana5106)