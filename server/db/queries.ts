import { desc } from 'drizzle-orm';
import { db } from './db';
import { todos } from './schema';

export const getTodos = async () => {
  return await db.select().from(todos).orderBy(desc(todos.createdAt));
};
