// src/content/config.ts
//
// This file defines the four content "buckets" for the site — thoughts, art,
// music, and design-work — and the shared shape every post in those buckets
// must follow. Astro reads this to type-check and validate your markdown
// frontmatter, so if you forget a required field or typo a type, you'll get
// a helpful error instead of a silent bug.

import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared schema — every post across all four collections uses this same
// shape. Fields marked .optional() don't need to appear in every post's
// frontmatter; leave them out entirely when they don't apply.
//
// This is written as a function that receives `{ image }` rather than a
// plain z.object(...) — that's what lets `coverImage` use Astro's image()
// helper below. Astro only makes `image` available when the schema is
// defined this way, and only when the referenced files live in src/assets
// (not public/), since it needs to process them at build time.
//
// `SchemaContext` is Astro's own type for this function's parameter —
// it's the correct way to type { image } without reaching into Zod's
// internals ourselves (that's what caused the previous error).
const postSchema = ({ image }: SchemaContext) => z.object({
  title: z.string(),
  date: z.coerce.date(),

  // A short line or two used in feed previews / meta descriptions.
  description: z.string().optional(),

  // Embed support — only fill in the one(s) relevant to a given post.
  soundcloudUrl: z.string().url().optional(),
  youtubeId: z.string().optional(),

  // Image in src/assets, resolved by Astro into an object with
  // .src, .width, .height — used as the feed thumbnail and/or full-post
  // header image. Astro handles resizing/format conversion automatically.
  coverImage: image().optional(),

  // Escape hatch for quick tagging/filtering later without a schema change.
  tags: z.array(z.string()).optional(),

  // Lets you write a post but keep it out of the feed until you're ready.
  draft: z.boolean().default(false),
});

// Each collection points at its own folder under src/content/ and uses the
// same schema above. `glob` picks up every .md file in that folder.
const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }),
  schema: postSchema,
});

const art = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/art' }),
  schema: postSchema,
});

const music = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/music' }),
  schema: postSchema,
});

const designWork = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/design-work' }),
  schema: postSchema,
});

// This export is what makes the collections available via getCollection()
// elsewhere in the site (e.g. in index.astro to build the feed).
export const collections = { thoughts, art, music, 'design-work': designWork };