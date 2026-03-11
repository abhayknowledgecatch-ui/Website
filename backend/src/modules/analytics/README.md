# Analytics Module Overview

This directory implements the analytics features of the backend. The README below explains each file, its purpose, the logical flow, and how the data impacts the application and interacts with the frontend.

---

## analytics.service.js
**Use case**: Business logic for generating analytic reports for both administrators and regular users.

- Maintains in-memory sample data representing users, courses, progress and time watched.
- Provides `getAdminAnalytics()`:
  - Counts total users, courses and lessons.
  - Maps each user to a summary object containing plan, counts and time watched details.
- Provides `getUserAnalytics(userId)`:
  - Looks up a single user by ID.
  - Returns detailed progress by lesson, login date array, and time watched breakdown.
  - Also returns basic course/lesson counts for chart building.

> **Effect on application**: Central computation point. Other parts of the server call these methods to produce JSON responses. As data moves to a real database, this service will be the layer that aggregates queries and applies business rules.
> **Frontend relation**: Frontend components hit the controller endpoints to display dashboards. For admins, the response drives user lists and summary tables; for normal users, it fuels progress bars, login calendars, and time‑spent charts.

## analytics.controller.js
**Use case**: HTTP handlers that invoke service methods and send results to clients.

- `adminStats` handler:
  - Invokes `getAdminAnalytics()`.
  - Sends JSON or forwards errors to error middleware.
- `userStats` handler:
  - Extracts user ID either from `req.user` (after auth middleware) or params.
  - Calls `getUserAnalytics()` and returns result.

> **Effect on application**: Translates service data into API responses and ensures proper error propagation.
> **Frontend relation**: These are the endpoints that the frontend calls (`/api/analytics/admin` and `/api/analytics/user`). The shape of the response is documented here implicitly.

## analytics.routes.js
**Use case**: Define Express routes for analytics endpoints and apply security.

- Imports controller methods and middleware helpers.
- Sets up `/admin` route protected by authentication and role-checking for `admin`.
- Sets up `/user` route protected by authentication only.
- Exports router for inclusion in `app.js`.

> **Effect on application**: Secures analytics endpoints and wires them into the express app.
> **Frontend relation**: Matches expected API paths and enforces that only authorized clients may access particular data.

## analytics.model.js
**Use case**: Placeholder for database schema definitions related to analytics.

- Contains comments indicating where models would go if a DB were used.

> **Effect on application**: Currently unused; reserved for future expansion.
> **Frontend relation**: None at present, but eventual model definitions will underpin all analytics data returned to the client.

---

Each file collaborates to deliver analytic information to both admins and regular users. When adding real persistence, update the service and model accordingly; controllers and routes should remain largely unchanged.