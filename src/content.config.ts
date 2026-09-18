import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    date: z.coerce.date(),
    author: z.string().min(1),
    image: z.string().optional(),
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
