// src/pages/api/[...path].ts
import { Hono } from 'hono'
import type { APIRoute } from 'astro';

const app = new Hono().basePath('/api');

app.get('/', (c) => c.json({
	test: "test",
	number: Math.random()
}))

// export default app
// export const GET = (context: any) => {
//   return app.fetch(context.request);
// };

export const GET: APIRoute = (context) => app.fetch(context.request);