"use server";

import { serverEnv } from "@/lib/env";

export type ContactState = { ok: boolean; message: string } | null;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "general");
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("website") ?? "");
  const locale = String(formData.get("locale") ?? "es");
  const isEn = locale === "en";

  if (honeypot) {
    return { ok: true, message: "" };
  }

  if (!name || name.length < 2 || name.length > 80) {
    return { ok: false, message: isEn ? "Please enter a valid name." : "Por favor ingresa un nombre válido." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: isEn ? "Please enter a valid email." : "Por favor ingresa un correo válido." };
  }
  if (!message || message.length < 10 || message.length > 4000) {
    return { ok: false, message: isEn ? "Message must be 10–4000 characters." : "El mensaje debe tener entre 10 y 4000 caracteres." };
  }

  const formspreeId = serverEnv.FORMSPREE_ID;
  if (formspreeId) {
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, topic, message, _subject: `RutasMéxico contacto: ${topic}` }),
      });
      if (!res.ok) {
        return { ok: false, message: isEn ? "Could not send. Please email us directly." : "No se pudo enviar. Escríbenos por correo directo." };
      }
    } catch {
      return { ok: false, message: isEn ? "Network error. Try again or email us." : "Error de red. Intenta de nuevo o escríbenos por correo." };
    }
  } else {
    // No PII in server logs — only enough to see the fallback fired and roughly what came in.
    console.log("[contact:fallback]", { topic, len: message.length });
  }

  return {
    ok: true,
    message: isEn
      ? "Thanks! We received your message and will reply within 24–48 hours."
      : "¡Gracias! Recibimos tu mensaje y responderemos en 24–48 horas.",
  };
}
