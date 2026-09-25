import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        summary: z.string().min(1),
        date: z.coerce.date(),
        updated: z.coerce.date(),
        author: z.string().min(1),
        image: image().optional(),
      })
      .refine((article) => article.updated >= article.date, {
        message: 'The updated date cannot be earlier than the publication date.',
        path: ['updated'],
      }),
});

const issues = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/issues' }),
  schema: z.object({
    title: z.string().min(1),
    number: z.number().int().positive(),
    summary: z.string().min(1),
    articles: z.array(reference('articles')),
  }),
});

export const collections = { articles, issues };
