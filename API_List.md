# API Endpoints List

This document provides an overview of the API endpoints, their HTTP methods, descriptions, and access levels.

---

## 1. Authentication & User Management

| Endpoint              | Method | Description                                    | Access           |
|-----------------------|--------|------------------------------------------------|------------------|
| `/auth/register`      | POST   | Register a new member (self-signup)            | Public           |
| `/auth/login`         | POST   | Log in using email and password                | Public           |
| `/auth/google`        | GET    | OAuth login with Google (using Passport)       | Public           |
| `/auth/facebook`      | GET    | OAuth login with Facebook (using Passport)     | Public           |
| `/auth/refresh-token` | POST   | Refresh JWT token                              | Public (with token) |
| `/users`              | GET    | List all users                                 | Admin            |
| `/users`              | POST   | Create a new admin user                        | Admin            |
| `/users/:id`          | GET    | Get details of a specific user                 | Admin            |
| `/users/:id`          | PUT    | Update user details                            | Admin / Self     |
| `/users/:id`          | DELETE | Delete a user                                  | Admin            |

---

## 2. Books Management

| Endpoint                    | Method | Description                             | Access  |
|-----------------------------|--------|-----------------------------------------|---------|
| `/books`                    | GET    | List all books (with filters/pagination) | Public  |
| `/books`                    | POST   | Add a new book                          | Admin   |
| `/books/:id`                | GET    | Get details of a specific book          | Public  |
| `/books/:id`                | PUT    | Update book details                     | Admin   |
| `/books/:id`                | DELETE | Delete a book                           | Admin   |
| `/books/:id/comments`       | POST   | Add a comment to a book                 | Member  |
| `/books/:id/comments`       | GET    | List all comments for a book            | Public  |

---

## 3. Loan Management

| Endpoint               | Method | Description               | Access           |
|------------------------|--------|---------------------------|------------------|
| `/loans`               | GET    | List all loans            | Admin            |
| `/loans`               | POST   | Borrow a book             | Member           |
| `/loans/:id`           | GET    | Get details of a specific loan | Admin / Self |
| `/loans/:id/return`    | PUT    | Return a borrowed book    | Member           |
| `/loans/:id/fine`      | GET    | Get fine details for a loan | Admin / Self   |

---

## 4. Categories Management

| Endpoint              | Method | Description                    | Access |
|-----------------------|--------|--------------------------------|--------|
| `/categories`         | GET    | List all book categories       | Public |
| `/categories`         | POST   | Add a new category             | Admin  |
| `/categories/:id`     | GET    | Get details of a specific category | Public |
| `/categories/:id`     | PUT    | Update category details        | Admin  |
| `/categories/:id`     | DELETE | Delete a category              | Admin  |

---

## 5. Reservations Management

| Endpoint                  | Method | Description                  | Access       |
|---------------------------|--------|------------------------------|--------------|
| `/reservations`           | GET    | List all reservations        | Admin        |
| `/reservations`           | POST   | Reserve a book               | Member       |
| `/reservations/:id`       | GET    | Get details of a specific reservation | Admin / Self |
| `/reservations/:id/cancel`| PUT    | Cancel a reservation         | Member       |

---

## 6. Menu Management

| Endpoint           | Method | Description                                | Access       |
|--------------------|--------|--------------------------------------------|--------------|
| `/menu`            | GET    | Get the navigation menu based on user role | Authenticated|
| `/menu`            | POST   | Add a new menu item                        | Admin        |
| `/menu/:id`        | PUT    | Update a menu item                         | Admin        |
| `/menu/:id`        | DELETE | Delete a menu item                         | Admin        |

---

## 7. Notifications

| Endpoint               | Method | Description                            | Access |
|------------------------|--------|----------------------------------------|--------|
| `/notifications`       | GET    | List all notifications for the user    | Member |
| `/notifications`       | POST   | Send a notification (for testing/admin use) | Admin  |

---

### How to Use

- **Endpoints**: The endpoint path for each route.
- **Method**: The HTTP method (GET, POST, PUT, DELETE) to be used.
- **Description**: A short description of what the endpoint does.
- **Access**: Who can access the endpoint (Public, Admin, Member, etc.).

---

This list makes it easy to understand the structure of the API and provides quick reference information for development.
