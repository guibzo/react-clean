This is a sample project that focus on studying how to implement a clean and scalable React application using some patterns and best practices.

## Docs - Flow

### Actions

- Server actions.
- Use cases/Services.
- Used in **controllers**.
  - Besides handling HTTP requests, they manage caching and service-related logic.

### Cache

- Managed by **actions**.
  - Local Storage.
  - Cookies.
    - Client.
    - Server.

### HTTP

- Used in **actions**.
  - Requests.

### Controllers

- Used in the **view**.
  - 1 controller per view (or per set of components where it makes sense).
  - Manages all the logic and state of the view.

### View

- Displays the component on the screen.

### File Casing

- Files in the `app` and `application` folders: kebab-case.
- All others: PascalCase.

### TO-DO:

- Implement Tanstack (maybe SSR/CSR).
- Tests.
- Zustand?
- More abstractions.
