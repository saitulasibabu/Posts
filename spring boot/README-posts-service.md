# Posts Service

This is a minimal Spring Boot microservice that exposes a single endpoint to return a list of posts.

Run:

```bash
mvn spring-boot:run
```

Endpoint:

- GET /api/posts — returns JSON array of posts. Each post has `id`, `title`, `description`.

Example:

```bash
curl http://localhost:8080/api/posts
```
