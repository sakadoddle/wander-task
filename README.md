# Task Management API

This is a simple RESTful API for managing tasks built with NestJS and TypeORM.

## Features

- Create, Read, Update, and Delete (CRUD) operations for tasks.
- Filter tasks based on priority and status.

## Running the app
  1. Clone the repository
  2. Copy .env.example to .env and configure your database connection
  3. Install dependencies: `npm install`.
  4. Start the server: `npm start`

## Endpoints

## Endpoints

### Get all tasks

```http
GET /tasks
```

Fetches all tasks. Optional query parameters can be used to filter tasks by priority and/or status.

**Parameters:**

- `priority`: Filter tasks by priority level.
- `status`: Filter tasks by status.

### Get a single task

```http
GET /tasks/:id
```

Fetches a single task by its ID.

**Parameters:**

- `id`: ID of the task to fetch.

### Create a new task

```http
POST /tasks
```

Creates a new task with the provided data.

**Body:**

```json
{
  "title": "Task title",
  "desc": "Task description",
  "priority": 1,
  "status": "Pending"
}
```

### Update an existing task

```http
PATCH /tasks/:id
```

Updates an existing task with the provided data.

**Parameters:**

- `id`: ID of the task to update.

**Body:**

```json
{
  "title": "Updated task title",
  "desc": "Updated task description",
  "priority": 2,
  "status": "Completed"
}
```

### Delete a task

```http
DELETE /tasks/:id
```

Deletes an existing task by its ID.

**Parameters:**

- `id`: ID of the task to delete.
