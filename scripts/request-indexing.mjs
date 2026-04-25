#!/usr/bin/env node
/**
 * Request indexing for the main RutasMéxico URLs after a deploy.
 *
 * Setup (one-time):
 *   1. Google Cloud Console → enable "Indexing API"
 *   2. Create a Service Account → download JSON key
 *   3. Search Console → Settings → Users and Permissions → Add user with the
 *      service account email as "Owner"
 *   4. Save the JSON key as ./scripts/sc-service-account.json (gitignored)
 *
 * Run:
 *   node scripts/request-indexing.mjs
 *
 * Quota: 200 requests/day per project — plenty for the ~20 URLs we re-submit.
 */

import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";
import { resolve } from "node:path";

const KEY_PATH = resolve("./scripts/sc-service-account.json");
const URLS = [
  "https://rutasmexico.com.mx/es",
  "https://rutasmexico.com.mx/es/nosotros",
  "https://rutasmexico.com.mx/es/privacidad",
  "https://rutasmexico.com.mx/es/terminos",
  "https://rutasmexico.com.mx/es/contacto",
  "https://rutasmexico.com.mx/es/mundial",
  "https://rutasmexico.com.mx/es/vuelos",
  "https://rutasmexico.com.mx/es/hoteles",
  "https://rutasmexico.com.mx/es/autobuses",
  "https://rutasmexico.com.mx/es/destinos",
  "https://rutasmexico.com.mx/es/rutas",
  "https://rutasmexico.com.mx/es/bodas",
  "https://rutasmexico.com.mx/es/blog",
  "https://rutasmexico.com.mx/en",
  "https://rutasmexico.com.mx/en/blog",
  "https://rutasmexico.com.mx/en/destinos",
  "https://rutasmexico.com.mx/en/rutas",
  "https://rutasmexico.com.mx/en/mundial",
];

function base64url(input) {
  return Buffer.from(input).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getAccessToken(key) {
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const claim = base64url(JSON.stringify({
    iss: key.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  }));
  const signature = createSign("RSA-SHA256").update(`${header}.${claim}`).sign(key.private_key);
  const jwt = `${header}.${claim}.${base64url(signature)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`Auth failed: ${JSON.stringify(json)}`);
  return json.access_token;
}

async function notify(token, url) {
  const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ url, type: "URL_UPDATED" }),
  });
  return { status: res.status, body: await res.text() };
}

const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));
const token = await getAccessToken(key);
console.log(`Submitting ${URLS.length} URLs...\n`);

for (const url of URLS) {
  const { status, body } = await notify(token, url);
  const ok = status >= 200 && status < 300;
  console.log(`${ok ? "✓" : "✗"} ${status}  ${url}`);
  if (!ok) console.log(`  → ${body.slice(0, 200)}`);
}
