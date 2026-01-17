# Understanding HTTP Calls

This guide explains what HTTP calls are and how they work in the feature-flag-demo application. If you're new to web development, this document will help you understand how the frontend (what you see in your browser) communicates with the backend (the server that stores and manages data).

## What Are HTTP Calls?

Think of HTTP calls as messages sent between your browser and a server. When you use a website, your browser constantly sends requests to a server asking for information or telling it to do something, and the server sends back responses.

Imagine you're at a restaurant. You (the browser/frontend) give your order to a waiter (the HTTP call), who takes it to the kitchen (the server/backend). The kitchen prepares your food and the waiter brings it back to you. HTTP calls work the same way - they carry your requests to the server and bring back the results.

In this application, the frontend makes HTTP calls to the RealWorld API at `https://api.realworld.io/api` to perform actions like fetching articles, logging in users, and creating new content.

## The Four Main Types of HTTP Calls

There are four primary types of HTTP calls, each designed for a specific purpose. Think of them as different types of actions you can ask the server to perform.

### GET - Retrieving Data

A GET request is like asking a question. You're asking the server to give you some information without changing anything. It's read-only.

**Everyday analogy:** Asking a librarian "What books do you have about cooking?" You're just getting information, not adding or removing any books.

**Example from the codebase:** Fetching an article by its slug (unique identifier)

```typescript
// From src/modules/features/article/fetch/fetchArticle.ts

const apiClient = createApiClient({
  path: "/articles/{slug}",
  method: "get",
  params: {
    path: {
      slug,
    },
  },
});

const response = await apiClient.sendRequest();
```

In this example, the application asks the server "Give me the article with this specific slug." The server responds with all the article data (title, body, author, etc.).

**When to use GET:**

- Viewing a list of articles
- Reading a user's profile
- Fetching comments on an article
- Loading popular tags

### POST - Creating New Data

A POST request is like submitting a form. You're sending new information to the server to create something that didn't exist before.

**Everyday analogy:** Filling out a job application and handing it to the receptionist. You're creating a new record in their system.

**Example from the codebase:** User login

```typescript
// From src/app/login/_components/loginForm/action.ts

const client = createApiClient({
  path: "/users/login",
  method: "post",
  params: {
    body: {
      user: submission.value,
    },
  },
});

const response = await client.sendRequest();
```

Here, the application sends the user's email and password to the server. The server checks if they're correct and, if so, creates a new session for the user.

**Example from the codebase:** Creating a new article

```typescript
// From src/modules/features/article/components/articleEditor/action.ts

const client = createApiClient({
  path: "/articles",
  method: "post",
  params: {
    body: {
      article,
    },
  },
});

const response = await client.sendRequest();
```

This sends the article data (title, description, body, tags) to the server, which creates a new article and stores it in the database.

**When to use POST:**

- Logging in or registering a new account
- Creating a new article
- Posting a comment
- Following a user

### PUT - Updating Existing Data

A PUT request is like editing a document. You're telling the server to replace existing information with new information.

**Everyday analogy:** Calling your phone company to update your address. The old address gets replaced with the new one.

**Example from the codebase:** Updating an existing article

```typescript
// From src/modules/features/article/components/articleEditor/action.ts

const client = createApiClient({
  path: "/articles/{slug}",
  method: "put",
  params: {
    path: {
      slug,
    },
    body: {
      article,
    },
  },
});

const response = await client.sendRequest();
```

Notice how this is similar to the GET request for fetching an article - it uses the same path with a slug. But instead of just reading the article, it sends new data to replace the existing article content.

**Example from the codebase:** Updating user settings

```typescript
// From src/app/settings/_components/action.ts

const client = createApiClient({
  path: "/user",
  method: "put",
  params: {
    body: {
      user: submission.value,
    },
  },
});

const response = await client.sendRequest();
```

This updates the current user's profile information (username, email, bio, profile image, etc.).

**When to use PUT:**

- Editing an article you wrote
- Updating your profile settings
- Changing your password

### DELETE - Removing Data

A DELETE request tells the server to remove something permanently.

**Everyday analogy:** Asking a librarian to remove a book from the library's collection. Once it's gone, it's gone.

**Example from the codebase:** Deleting an article

```typescript
// From src/modules/features/article/components/deleteArticleButton/action.ts

const apiClient = createApiClient({
  path: "/articles/{slug}",
  method: "delete",
  params: {
    path: {
      slug,
    },
  },
});

const response = await apiClient.sendRequest();
```

This tells the server to permanently remove the article with the specified slug. Notice there's no body - you're just telling the server which article to delete.

**When to use DELETE:**

- Deleting an article you wrote
- Removing a comment
- Unfollowing a user

## How the API Client Works

The feature-flag-demo application uses a centralized API client to make all HTTP calls. This is located in `src/utils/api/apiClientV1.ts`. Here's a simplified explanation of what it does:

```typescript
// Simplified version of the API client

const sendRequest = async () => {
  // 1. Build the full URL (e.g., "https://api.realworld.io/api/articles/my-article")
  const fullUrl = API_BASE_URL + path;

  // 2. Send the request using fetch()
  const response = await fetch(fullUrl, {
    method, // "get", "post", "put", or "delete"
    headers: {
      "Content-Type": "application/json", // Tell the server we're sending JSON
      Authorization: `Token ${token}`, // Include auth token if logged in
    },
    body: JSON.stringify(params.body), // Convert data to JSON string
  });

  // 3. Return the response
  if (response.ok) {
    return { result: "success", data: await response.json() };
  } else {
    return { result: "error", statusCode: response.status };
  }
};
```

The API client handles several important tasks:

1. **Building URLs:** It constructs the full URL by combining the base URL with the path and any parameters.

2. **Adding authentication:** If the user is logged in, it automatically includes their authentication token in the request headers.

3. **Handling responses:** It checks if the request was successful and returns the data in a consistent format.

4. **Error handling:** If something goes wrong, it captures the error information so the application can show appropriate messages to the user.

## Request and Response Structure

### Request Components

Every HTTP call has several parts:

- **URL/Path:** Where the request is going (e.g., `/articles/{slug}`)
- **Method:** What type of action (GET, POST, PUT, DELETE)
- **Headers:** Extra information like authentication tokens and content type
- **Body:** The data being sent (only for POST and PUT requests)

### Response Components

The server's response also has parts:

- **Status Code:** A number indicating success or failure (200 = OK, 404 = Not Found, etc.)
- **Body:** The data returned by the server (usually in JSON format)

## Common HTTP Status Codes

When the server responds, it includes a status code that tells you what happened:

| Code | Meaning                                  | Example                               |
| ---- | ---------------------------------------- | ------------------------------------- |
| 200  | OK - Request succeeded                   | Article fetched successfully          |
| 201  | Created - New resource created           | New article created                   |
| 204  | No Content - Success with no data        | Article deleted                       |
| 400  | Bad Request - Invalid data sent          | Missing required field                |
| 401  | Unauthorized - Not logged in             | Trying to post without logging in     |
| 403  | Forbidden - Not allowed                  | Trying to edit someone else's article |
| 404  | Not Found - Resource doesn't exist       | Article with that slug doesn't exist  |
| 422  | Unprocessable Entity - Validation failed | Email already taken                   |
| 500  | Server Error - Something went wrong      | Database connection failed            |

## Summary

HTTP calls are the foundation of how web applications communicate with servers. In the feature-flag-demo application:

- **GET** requests fetch data like articles, profiles, and comments
- **POST** requests create new data like articles, comments, and user sessions
- **PUT** requests update existing data like article content and user settings
- **DELETE** requests remove data like articles and comments

The centralized API client in `src/utils/api/apiClientV1.ts` handles all these requests, making it easy to communicate with the RealWorld API while handling authentication and errors consistently.

Understanding these concepts will help you navigate the codebase and understand how data flows between the frontend and backend of the application.
