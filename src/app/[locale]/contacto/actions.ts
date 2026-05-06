"use server";

export type ContactState = { ok: boolean; message: string } | null;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "general");
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("website") ?? "");
  const locale = String(formData.get("locale") ?? "es");

  if (honeypot) {
    return { ok: true, message: "" };
  }

  if (!name || name.length < 2 || name.length > 80) {
    return { ok: false, message: locale === "en" ? "Please enter a valid name." : locale === "fr" ? "Veuillez entrer un nom valide." : "Por favor ingresa un nombre válido." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: locale === "en" ? "Please enter a valid email." : locale === "fr" ? "Veuillez entrer un e-mail valide." : "Por favor ingresa un correo válido." };
  }
  if (!message || message.length < 10 || message.length > 4000) {
    return { ok: false, message: locale === "en" ? "Message must be 10–4000 characters." : locale === "fr" ? "Le message doit contenir 10 à 4000 caractères." : "El mensaje debe tener entre 10 y 4000 caracteres." };
  }

  const formspreeId = process.env.FORMSPREE_ID;
  if (formspreeId) {
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, topic, message, _subject: `RutasMéxico contacto: ${topic}` }),
      });
      if (!res.ok) {
        return { ok: false, message: locale === "en" ? "Could not send. Please email us directly." : locale === "fr" ? "Envoi impossible. Écrivez-nous directement." : "No se pudo enviar. Escríbenos por correo directo." };
      }
    } catch {
      return { ok: false, message: locale === "en" ? "Network error. Try again or email us." : locale === "fr" ? "Erreur réseau. Réessayez ou écrivez-nous." : "Error de red. Intenta de nuevo o escríbenos por correo." };
    }
  } else {
    console.log("[contact:fallback]", { name, email, topic, len: message.length });
  }

  return {
    ok: true,
    message: locale === "en"
      ? "Thanks! We received your message and will reply within 24–48 hours."
      : locale === "fr"
        ? "Merci ! Nous avons reçu votre message et répondrons sous 24-48 heures."
        : "¡Gracias! Recibimos tu mensaje y responderemos en 24–48 horas.",
  };
}
