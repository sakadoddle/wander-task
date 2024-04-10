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
GET /tasks?status=pending
GET /tasks?priority=1
GET /tasks?status=pending&priority=1
```

Fetches all tasks. Optional query parameters can be used to filter tasks by priority and/or status.

**Parameters:**

- `priority`: Filter tasks by priority level.
- `status`: Filter tasks by status.

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "98f9443b-b3b3-4b2e-b499-431b1f6dcf29",
            "title": "Task Management",
            "desc": "Task Management Desc",
            "priority": 1,
            "status": "pending",
            "created_at": "2024-04-10T17:13:54.865Z",
            "updated_at": "2024-04-10T17:13:54.865Z"
        },
    ]
}
```

### Get a single task

```http
GET /tasks/:id
```

Fetches a single task by its ID.

**Parameters:**

- `id`: ID of the task to fetch.

**Response:**
```json
{
    "success": true,
    "data": {
      "id": "98f9443b-b3b3-4b2e-b499-431b1f6dcf29",
      "title": "Task Management",
      "desc": "Task Management Desc",
      "priority": 1,
      "status": "pending",
      "created_at": "2024-04-10T17:13:54.865Z",
      "updated_at": "2024-04-10T17:13:54.865Z"
    }
}
```

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

**Response:**
```json
{
  "success": true,
  "message": "Task Created Successfully"
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

**Response:**
```json
{
  "success": true,
  "message": "Task Updated Successfully"
}
```

### Delete a task

```http
DELETE /tasks/:id
```

Deletes an existing task by its ID.

**Parameters:**

- `id`: ID of the task to delete.

**Response:**
```json
{
  "success": true,
  "message": "Task Deleted Successfully"
}
```
