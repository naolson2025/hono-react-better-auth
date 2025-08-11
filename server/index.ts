import { Hono } from 'hono';
import { auth } from './lib/auth';
import { todos } from './routes/todo.routes';

const app = new Hono().basePath('/api');

const router = app
  .on(['POST', 'GET'], '/auth/**', (c) => auth.handler(c.req.raw))
  .route('/todos', todos)
  .get('/people', (c) => {
    return c.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  });

export type AppType = typeof router;
export default app;
