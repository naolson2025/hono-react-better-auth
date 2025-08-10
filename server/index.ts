import { Hono } from 'hono';

const app = new Hono();

const router = app
  .get('/', (c) => {
    return c.text('Hello Hono!');
  })
  .get('/api/people', (c) => {
    return c.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  });

export type AppType = typeof router;
export default app;
