import { z } from "zod";

/**
 * Runtime validation for the JSON data files in src/data/.
 *
 * These schemas are intentionally LENIENT (`.passthrough()` keeps unknown keys)
 * and only assert the critical fields the app relies on. The goal is to fail the
 * build loudly if a data entry is malformed (missing slug, wrong region, broken
 * localized string), not to mirror every optional field. Loaders run
 * `<schema>.array().parse(data)` at module load as a guard, then keep the typed
 * cast for ergonomics.
 */

export const localizedSchema = z
  .object({ es: z.string().min(1), en: z.string().min(1) })
  .passthrough();

export const priceRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
  currency: z.enum(["MXN", "USD", "CAD"]),
});

export const destinationSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    name: localizedSchema,
    coordinates: z.object({ lat: z.number(), lng: z.number() }),
    region: z.enum(["centro", "norte", "sur", "peninsula", "pacifico", "golfo", "bajio", "occidente"]),
    description: localizedSchema,
    longDescription: localizedSchema,
    highlights: z.array(localizedSchema),
    averageDailyBudget: priceRangeSchema,
  })
  .passthrough();

export const blogPostSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    title: localizedSchema,
    excerpt: localizedSchema,
    content: localizedSchema,
    author: z.string().min(1),
    category: z.enum(["guia-destino", "tips-viaje", "transporte", "gastronomia", "cultura"]),
    publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "publishedDate must be YYYY-MM-DD"),
    readingTime: z.number(),
  })
  .passthrough();

export const routeSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    originId: z.string().min(1),
    destinationId: z.string().min(1),
    options: z.array(z.object({ mode: z.enum(["flight", "bus", "car"]) }).passthrough()),
  })
  .passthrough();

/** Parse + throw on invalid data, but return the original typed value. */
export function validateData<T>(schema: z.ZodTypeAny, data: T, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`[data] ${label} failed validation: ${result.error.issues.slice(0, 3).map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
  }
  return data;
}
