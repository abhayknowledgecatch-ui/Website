# Courses Module Overview

This directory provides all backend functionality for managing courses. Below is a breakdown of each file, its purpose, logic flow, and how it interacts with the wider application and frontend.

---

## course.service.js
**Use case**: Core business logic for course CRUD operations.

- Maintains an in-memory `courses` array for demonstration.
- Implements functions:
  - `listCourses()` – returns all courses.
  - `getCourse(id)` – looks up a course by numeric ID.
  - `createCourse(data)` – appends a new course with an auto-incremented ID.
  - `updateCourse(id, data)` – merges updates into an existing course.
  - `deleteCourse(id)` – removes a course by ID.

> **Effect on application**: Serves as the data layer for courses; controllers call these methods. When a real database is added, this service will orchestrate queries and validation.
> **Frontend relation**: Frontend requests (list, view, admin create/edit/delete) rely on these functions indirectly via the controller. Response shapes (JSON objects with `id`, `title`, etc.) are defined here.

## course.controller.js
**Use case**: HTTP handlers exposing service functionality.

- Maps to service functions and handles Express request/response.
- Helpers:
  - `list` – GET `/api/courses`
  - `get` – GET `/api/courses/:courseId`
  - `create` – POST `/api/courses` (admin only)
  - `update` – PUT `/api/courses/:courseId` (admin only)
  - `remove` – DELETE `/api/courses/:courseId` (admin only)
- Returns appropriate status codes (e.g. 201 on creation, 204 on delete) and error messages.

> **Effect on application**: Converts service results into HTTP responses and ensures error propagation via `next()`.
> **Frontend relation**: These are the endpoints the frontend uses to display course lists, view course details, and allow administrators to manage courses.

## course.routes.js
**Use case**: Defines the Express routing layer and applies security middleware.

- Public routes for listing and retrieving courses.
- Protected routes (authenticated + admin role) for modifying content.
- Exports a router mounted under `/api/courses` in `app.js`.

> **Effect on application**: Centralizes route definitions and access control.
> **Frontend relation**: Matches URI patterns expected by the client; client code should attach JWT tokens for protected operations.

## course.model.js
**Use case**: Placeholder for a future ORM/model definition.

- Currently empty, but intended for schema definitions when connecting to a database.

> **Effect on application**: None yet.
> **Frontend relation**: N/A until the model is implemented.

---

Each component is intentionally simple and in-memory to keep the module easy to read. When migrating to persistent storage, expand the service and model; controllers and routes will largely stay the same. This setup gives the frontend a predictable API for course-related actions.