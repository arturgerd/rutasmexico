"use server";

import { serverEnv } from "@/lib/env";
import { TEMAS_OPINION } from "./temas";

/**
 * Recepción de opiniones de lectores.
 *
 * ESTA ACCIÓN NO PUBLICA NADA. Sólo hace llegar la opinión a la bandeja de
 * Formspree. Para que aparezca en el sitio hay que leerla, decidir, y añadirla
 * a mano a src/data/opiniones.json.
 *
 * Es deliberado y no es pereza: publicar texto de terceros sin revisarlo en un
 * sitio comercial es cómo entran el spam, la difamación y las reseñas falsas, y
 * cómo se pierde una solicitud de AdSense. El paso humano no se puede saltar
 * porque no existe el código que lo saltaría.
 */

export type OpinionState = { ok: boolean; message: string } | null;

const NOMBRE_MIN = 2;
const NOMBRE_MAX = 60;
const CIUDAD_MAX = 60;
const TEXTO_MIN = 40;
const TEXTO_MAX = 1500;

export async function submitOpinion(
  _prev: OpinionState,
  formData: FormData
): Promise<OpinionState> {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const ciudad = String(formData.get("ciudad") ?? "").trim();
  const tema = String(formData.get("tema") ?? "");
  const visita = String(formData.get("visita") ?? "").trim();
  const texto = String(formData.get("texto") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const consentimiento = formData.get("consentimiento") === "on";
  const honeypot = String(formData.get("website") ?? "");
  const locale = String(formData.get("locale") ?? "es");
  const isEn = locale === "en";

  // Los bots rellenan todos los campos, incluido el que está oculto. Se les
  // responde con éxito para que no reintenten.
  if (honeypot) return { ok: true, message: "" };

  if (nombre.length < NOMBRE_MIN || nombre.length > NOMBRE_MAX) {
    return {
      ok: false,
      message: isEn
        ? "Please enter the name you want shown, between 2 and 60 characters."
        : "Escribe el nombre con el que quieres aparecer, entre 2 y 60 caracteres.",
    };
  }
  if (ciudad.length > CIUDAD_MAX) {
    return {
      ok: false,
      message: isEn ? "That city name is too long." : "Ese nombre de ciudad es demasiado largo.",
    };
  }
  if (!TEMAS_OPINION.some((t) => t.id === tema)) {
    return {
      ok: false,
      message: isEn ? "Pick what your opinion is about." : "Elige sobre qué es tu opinión.",
    };
  }
  if (texto.length < TEXTO_MIN || texto.length > TEXTO_MAX) {
    return {
      ok: false,
      message: isEn
        ? `Your opinion must be between ${TEXTO_MIN} and ${TEXTO_MAX} characters.`
        : `Tu opinión debe tener entre ${TEXTO_MIN} y ${TEXTO_MAX} caracteres.`,
    };
  }
  // El correo es opcional, pero si lo dan tiene que servir para responderles.
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      ok: false,
      message: isEn ? "That email doesn't look valid." : "Ese correo no parece válido.",
    };
  }
  if (!consentimiento) {
    return {
      ok: false,
      message: isEn
        ? "We need your permission to publish your opinion."
        : "Necesitamos tu permiso para publicar tu opinión.",
    };
  }

  const formspreeId = serverEnv.FORMSPREE_ID;
  if (formspreeId) {
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          tipo: "opinion",
          nombre,
          ciudad: ciudad || "(no indicada)",
          tema,
          visita: visita || "(no indicada)",
          texto,
          email: email || "(no proporcionado)",
          _subject: `RutasMéxico opinión: ${tema}`,
        }),
      });
      if (!res.ok) {
        return {
          ok: false,
          message: isEn
            ? "We couldn't send it. Please try again in a moment."
            : "No se pudo enviar. Inténtalo de nuevo en un momento.",
        };
      }
    } catch {
      return {
        ok: false,
        message: isEn
          ? "Network error. Try again in a moment."
          : "Error de red. Inténtalo de nuevo en un momento.",
      };
    }
  } else {
    // Sin Formspree configurado no se pierde la opinión en silencio, pero
    // tampoco se escriben datos personales en los logs del servidor.
    // eslint-disable-next-line no-console
    console.log("[opinion:fallback]", { tema, largo: texto.length });
  }

  return {
    ok: true,
    message: isEn
      ? "Thanks. We read every opinion before publishing it, so it won't appear straight away — and if we publish it, only the name and city you gave us will be shown."
      : "Gracias. Leemos cada opinión antes de publicarla, así que no aparecerá de inmediato — y si la publicamos, sólo se mostrarán el nombre y la ciudad que nos diste.",
  };
}
