/**
 * Expand short destination descriptions into rich SEO content using Claude Haiku.
 *
 * USAGE:
 *   1. npm install @anthropic-ai/sdk
 *   2. Set env: ANTHROPIC_API_KEY=sk-ant-...
 *   3. npx tsx scripts/expand-destinations.ts
 *      (use --slug=cancun to run on a single destination, otherwise runs all
 *       destinations that don't yet have an entry in destinations-content.json)
 *
 * OUTPUT: src/data/destinations-content.json — keyed by slug, with es/en/fr
 * sections: howToGetThere, whereToStay, gettingAround, foodScene, bestTime,
 * dailyCost, faqs.
 *
 * COST: ~$0.05 USD per destination with Haiku 4.5 (input + output tokens).
 *
 * IMPORTANT: review generated content before merging — Claude may hallucinate
 * specific prices or transit details. Cross-check against current data.
 */

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

const ROOT = path.join(__dirname, "..");
const DEST_PATH = path.join(ROOT, "src/data/destinations.json");
const OUT_PATH = path.join(ROOT, "src/data/destinations-content.json");

interface Destination {
  slug: string;
  name: { es: string; en: string };
  state: { es: string; en: string };
  description: { es: string; en: string };
  region: string;
  airportIATA: string;
}

interface ExpandedContent {
  howToGetThere: { es: string; en: string; fr: string };
  whereToStay: { es: string; en: string; fr: string };
  gettingAround: { es: string; en: string; fr: string };
  foodScene: { es: string; en: string; fr: string };
  bestTime: { es: string; en: string; fr: string };
  dailyCost: { es: string; en: string; fr: string };
  faqs: { question: { es: string; en: string; fr: string }; answer: { es: string; en: string; fr: string } }[];
}

const SYSTEM = `You are a senior travel writer for RutasMéxico, a guide site for travelers visiting Mexico.
Write factual, helpful content with concrete prices in MXN, real airport/bus terminal names, real
neighborhood names, and current 2026 information. NEVER invent venue names, hotels, or restaurants
unless they are widely known landmarks. When unsure of a specific price, give a realistic range and
mark it "approx." Output strict JSON only — no markdown fences, no commentary.`;

const userPrompt = (d: Destination) => `Generate expanded SEO content for ${d.name.es} (${d.state.es}, México).
Region: ${d.region}. Nearest airport IATA: ${d.airportIATA}.
Existing short description (es): "${d.description.es}"

Return ONLY valid JSON matching this exact shape (no markdown):
{
  "howToGetThere": { "es": "200-300 words on flying, bus, driving from CDMX/main hubs", "en": "...", "fr": "..." },
  "whereToStay": { "es": "150-250 words on neighborhoods by budget (low/mid/high)", "en": "...", "fr": "..." },
  "gettingAround": { "es": "100-200 words on local transport, ride-share availability", "en": "...", "fr": "..." },
  "foodScene": { "es": "150-200 words on must-try dishes and food districts", "en": "...", "fr": "..." },
  "bestTime": { "es": "100-150 words on seasonality, weather, crowds", "en": "...", "fr": "..." },
  "dailyCost": { "es": "100 words breakdown: budget/mid/luxury per day in MXN", "en": "...", "fr": "..." },
  "faqs": [
    { "question": { "es": "...", "en": "...", "fr": "..." }, "answer": { "es": "...", "en": "...", "fr": "..." } }
  ]
}

Include 5-7 FAQs covering common traveler questions (safety, water, tipping, language, ATMs, weather, transport).
All three languages must be complete. Use natural, conversational tone — not robotic.`;

async function expandOne(client: Anthropic, d: Destination): Promise<ExpandedContent> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 8192,
    system: SYSTEM,
    messages: [{ role: "user", content: userPrompt(d) }],
  });
  const text = response.content
    .filter((c): c is Anthropic.TextBlock => c.type === "text")
    .map((c) => c.text)
    .join("");
  // Strip any accidental markdown fences
  const cleaned = text.replace(/^```json\s*|\s*```$/g, "").trim();
  return JSON.parse(cleaned) as ExpandedContent;
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ERROR: ANTHROPIC_API_KEY env var not set.");
    process.exit(1);
  }

  const destinations: Destination[] = JSON.parse(fs.readFileSync(DEST_PATH, "utf-8"));
  const existing: Record<string, ExpandedContent> = fs.existsSync(OUT_PATH)
    ? JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"))
    : {};

  const slugFilter = process.argv.find((a) => a.startsWith("--slug="))?.split("=")[1];

  const targets = destinations.filter((d) => {
    if (slugFilter) return d.slug === slugFilter;
    return !existing[d.slug];
  });

  if (targets.length === 0) {
    console.log("Nothing to do — all destinations already expanded.");
    return;
  }

  console.log(`Expanding ${targets.length} destination(s) with Claude Haiku 4.5...`);
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  for (const d of targets) {
    process.stdout.write(`  ${d.slug}... `);
    try {
      const content = await expandOne(client, d);
      existing[d.slug] = content;
      fs.writeFileSync(OUT_PATH, JSON.stringify(existing, null, 2), "utf-8");
      console.log("ok");
    } catch (err) {
      console.error(`FAILED: ${(err as Error).message}`);
    }
  }
  console.log(`\nDone. Output: ${OUT_PATH}`);
  console.log("Next: review generated content for accuracy before merging into destinations.json or rendering.");
}

main();
