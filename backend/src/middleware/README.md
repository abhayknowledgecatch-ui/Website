# Middleware Overview

This directory contains shared Express middleware used throughout the backend API. Each file is listed below with its purpose, a logical description of its behavior, and notes on how it impacts the application as a whole and relates to the frontend.

---

## auth.middleware.js
**Use case**: Protect routes by ensuring the requester is authenticated with a valid JWT.

- Extracts the `Authorization` header and checks for a Bearer token.
- Verifies the token using JWT helpers (`utils/jwt.js`).
- Attaches the decoded payload to `req.user` for downstream handlers.
- Responds with `401 Unauthorized` when the token is missing or invalid.

> **Effect on application**: Prevents unauthenticated access to secured endpoints.
> **Frontend relation**: The frontend must include a valid JWT (usually stored in localStorage or cookies) in every request to protected resources. If the token is missing or expired, the backend sends a 401, prompting the client to redirect to the login page.

## role.middleware.js
**Use case**: Restrict certain endpoints to users with specific roles (e.g. `admin`, `editor`).

- Accepts an array of allowed role strings.
- Checks `req.user` (populated by auth middleware); if absent, returns `401`.
- Verifies that the user's role is in the allowed list.
- Returns `403 Forbidden` if the role does not match.

> **Effect on application**: Adds fine-grained authorization on top of authentication.
> **Frontend relation**: The UI can show/hide features or routes based on the user’s role. Requests made by users without the necessary role will receive 403 responses, which the frontend should handle (e.g., show a "not allowed" message).

## rateLimit.middleware.js
**Use case**: Throttle requests to prevent abuse or accidental flooding.

- Maintains an in-memory counter keyed by client IP.
- Defines a time window (1 minute) and maximum requests (100).
- Resets the counter when the window expires.
- Returns `429 Too Many Requests` if the limit is exceeded.

> **Effect on application**: Simple protection against excessive traffic. In production, a distributed store (Redis) should replace the in-memory map.
> **Frontend relation**: If the frontend exceeds rate limits (e.g., due to a bug or misconfiguration), it will receive 429 responses. The client code should back off and retry later or show an error message.

## error.middleware.js
**Use case**: Catch and format errors thrown by route handlers or other middleware.

- Logs the error stack to the server console.
- Determines an appropriate HTTP status code and message.
- Sends a JSON response containing the error message.

> **Effect on application**: Centralizes error handling and prevents stack traces from leaking to clients.
> **Frontend relation**: The frontend receives consistent error responses and can display user-friendly messages. It won’t see raw exceptions or HTML error pages.

---

Each piece of middleware is typically registered in `src/app.js` and applies globally or to specific route groups. Together they form the first line of defense for backend APIs and dictate what the frontend must supply (authentication tokens, proper request rates) and how it should respond to errors or authorization failures.