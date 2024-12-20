# Task Manager MERN Application

A simple task management application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Project Structure

```
task-manager-mern/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js
├── frontend/
│   ├── src/
│   └── public/
└── README.md
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-manager-mern.git
cd task-manager-mern
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a .env file in the backend directory with:
```
MONGODB_URI=mongodb://localhost:27017/taskmanager
PORT=5001
```

5. Start the application:
```bash
# In the backend directory
npm start

# In the frontend directory (new terminal)
npm start
```

The application will run on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001 

## Features

- Create new tasks with title and description
- View list of all tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed/incomplete