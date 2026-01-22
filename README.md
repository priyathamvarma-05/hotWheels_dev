# Hot Wheels E-commerce App

A modern, full-stack e-commerce application for collecting Hot Wheels, built with React, Node.js, and MongoDB.

## Features

- **Product Listing**: Responsive grid with hover animations.
- **Product Details**: Image carousel and detailed views.
- **Admin Dashboard**: Add, edit, and delete products (with image upload).
- **Modern UI**: Clean, minimal aesthetics using Tailwind CSS.
- **Backend API**: RESTful API for product management.

## Prerequisites

- **Node.js**: Installed on your machine.
- **MongoDB**: You must have a MongoDB instance running locally on `localhost:27017` or provide a connection string in `server/.env`.

## Setup & Run

The project is divided into `server` (Backend) and `client` (Frontend).

### Quick Start (Windows)
1. Open a terminal in the project root.
2. Run the start commands in two separate terminals:

**Terminal 1 (Server):**
```bash
cd server
npm run dev
```
*Server runs on http://localhost:5000*

**Terminal 2 (Client):**
```bash
cd client
npm run dev
```
*Client runs on http://localhost:5173*

### Seeding Data
To populate the database with initial Hot Wheels products:
```bash
cd server
npm run seed
```

## Structure

- `client/`: React frontend (Vite + Tailwind)
- `server/`: Express backend logic
- `server/uploads/`: Stores uploaded product images
