# AskleMed

AskleMed is a telehealth web application MVP that allows patients to register, discover doctors, book online consultations, join consultation sessions, and view medical records. Doctors can manage their profiles, schedules, appointments, consultation notes, and prescriptions.

## Tech Stack

### Frontend

- React
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Node.js
- Express
- TypeScript

### Database

- MongoDB

### Authentication

- Better Auth

### Integrations

- Cal.com
- Zoom API
- OneSignal

### Deployment

- Docker

## Project Structure

```txt
asklemed/
  apps/
    web/                 # Next.js frontend
    api/                 # Express + TypeScript backend
  packages/
    shared/              # Shared types, schemas, and constants
  docs/
    architecture.md
    api-routes.md
    user-flows.md
  docker-compose.yml
  package.json
  README.md
```

## Core Features

### Patient Module

- Register using email and password
- Create and update patient profile
- Browse doctors and view availability
- Search doctors by specialization
- Get doctor recommendations based on symptoms
- Book, reschedule, and cancel consultations
- Join online consultation sessions
- View appointment history
- View medical records and prescriptions

### Doctor Module

- Register using email and password
- Create and update doctor profile
- Manage specialization, bio, and availability
- Restrict unavailable time slots
- View appointment history
- View patient medical records and prescriptions
- Join consultation sessions
- Add consultation notes and prescriptions

## Prerequisites

Make sure you have these installed:

- Node.js LTS
- npm
- Docker Desktop
- Git

## Environment Variables

Create a `.env` file in the root project folder.

```env
MONGODB_URI=mongodb://localhost:27017/asklemed
BETTER_AUTH_SECRET=replace-with-long-random-secret
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_API_URL=http://localhost:4000

CALCOM_API_KEY=
ZOOM_CLIENT_ID=
ZOOM_CLIENT_SECRET=
ONESIGNAL_APP_ID=
ONESIGNAL_REST_API_KEY=
```

## Install Dependencies

From the root project folder:

```powershell
npm install
```

## Development

To start MongoDB, the backend API, and the frontend together, run:

```powershell
npm run dev:all
```

This starts:

```txt
Frontend:    http://localhost:3000
Backend API: http://localhost:4000
MongoDB:     mongodb://localhost:27017/asklemed
```

## Run Services Separately

Start only MongoDB:

```powershell
npm run db:up
```

Stop MongoDB:

```powershell
npm run db:down
```

Start only the frontend:

```powershell
npm run dev:web
```

Start only the backend:

```powershell
npm run dev:api
```

Start frontend and backend without starting Docker:

```powershell
npm run dev
```

## Root Scripts

The root `package.json` should include these scripts:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev --workspace apps/web\" \"npm run dev --workspace apps/api\"",
    "dev:web": "npm run dev --workspace apps/web",
    "dev:api": "npm run dev --workspace apps/api",
    "dev:all": "docker compose up -d && concurrently \"npm run dev --workspace apps/web\" \"npm run dev --workspace apps/api\"",
    "db:up": "docker compose up -d",
    "db:down": "docker compose down"
  }
}
```

## Docker

To build and run the project with Docker:

```powershell
docker compose up --build
```

To stop the containers:

```powershell
docker compose down
```

## Application URLs

```txt
Frontend: http://localhost:3000
Backend:  http://localhost:4000
MongoDB:  mongodb://localhost:27017/asklemed
```

## Suggested Development Flow

1. Start the full development environment.

```powershell
npm run dev:all
```

2. Open the frontend in your browser.

```txt
http://localhost:3000
```

3. Build the patient registration and login flow.

4. Build patient and doctor profile management.

5. Build doctor discovery and search.

6. Build appointment booking, rescheduling, and cancellation.

7. Build doctor schedule management.

8. Build consultation session join links.

9. Build consultation notes, prescriptions, and medical records.

10. Add notifications and third-party integrations.

## Notes

For the MVP, integrations such as Cal.com, Zoom, and OneSignal can be wrapped in service files first. This keeps the core app working while allowing real third-party API integration later.

The most important goal is to make the patient and doctor flows work end-to-end.
```