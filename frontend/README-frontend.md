# Frontend

This is a minimal Angular frontend that consumes the posts service at `/api/posts`.

Run:

```bash
cd frontend
npm install
npx @angular/cli@16.2.0 serve
```

The app expects the backend at the same host (path `/api/posts`). If the backend runs on a different host/port, update the request URL in `src/app/app.component.ts` or configure a proxy.
