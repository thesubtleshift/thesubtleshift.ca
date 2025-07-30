import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.string(),
    featured_image: z.string(),
    author: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  posts,
}; 