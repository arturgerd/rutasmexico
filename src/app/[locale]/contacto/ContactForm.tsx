"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "./actions";
import { t3 } from "@/lib/utils";

function SubmitButton({ locale }: { locale: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-semibold shadow-lg shadow-terracotta-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
    >
      {pending
        ? t3(locale, "Enviando…", "Sending…", "Envoi…")
        : t3(locale, "Enviar mensaje", "Send message", "Envoyer le message")}
    </button>
  );
}

export default function ContactForm({ locale }: { locale: string }) {
  const [state, formAction] = useFormState<ContactState, FormData>(submitContact, null);

  if (state?.ok) {
    return (
      <div role="status" aria-live="polite" className="bg-jade-50 border border-jade-200 rounded-2xl p-6 text-jade-800">
        <div className="flex items-start gap-3">
          <div className="text-2xl">✅</div>
          <div>
            <h3 className="font-display font-bold text-lg mb-1">
              {t3(locale, "Mensaje enviado", "Message sent", "Message envoyé")}
            </h3>
            <p className="text-sm leading-relaxed">{state.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot anti-spam (hidden from users, bots fill it) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-arena-800 mb-1.5">
          {t3(locale, "Nombre", "Name", "Nom")} *
        </label>
        <input
          id="contact-name"
          name="name"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          className="w-full px-4 py-2.5 rounded-xl border border-arena-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-transparent text-arena-900"
          placeholder={t3(locale, "Tu nombre", "Your name", "Votre nom")}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-arena-800 mb-1.5">
          {t3(locale, "Correo", "Email", "E-mail")} *
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-4 py-2.5 rounded-xl border border-arena-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-transparent text-arena-900"
          placeholder="tu@correo.com"
        />
      </div>

      <div>
        <label htmlFor="contact-topic" className="block text-sm font-semibold text-arena-800 mb-1.5">
          {t3(locale, "Tema", "Topic", "Sujet")}
        </label>
        <select
          id="contact-topic"
          name="topic"
          defaultValue="general"
          className="w-full px-4 py-2.5 rounded-xl border border-arena-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-transparent text-arena-900"
        >
          <option value="general">{t3(locale, "Pregunta general", "General question", "Question générale")}</option>
          <option value="colaboracion">{t3(locale, "Colaboración / Partnership", "Partnership", "Collaboration")}</option>
          <option value="contenido">{t3(locale, "Sugerencia de contenido", "Content suggestion", "Suggestion de contenu")}</option>
          <option value="error">{t3(locale, "Reportar un error", "Report a bug", "Signaler un bug")}</option>
          <option value="prensa">{t3(locale, "Prensa / Medios", "Press / Media", "Presse / Médias")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-arena-800 mb-1.5">
          {t3(locale, "Mensaje", "Message", "Message")} *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          className="w-full px-4 py-2.5 rounded-xl border border-arena-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-transparent text-arena-900 resize-y"
          placeholder={t3(locale,
            "Cuéntanos en qué te podemos ayudar...",
            "Tell us how we can help...",
            "Dites-nous comment nous pouvons vous aider..."
          )}
        />
      </div>

      {state?.ok === false && (
        <div role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {state.message}
        </div>
      )}

      <SubmitButton locale={locale} />

      <p className="text-xs text-arena-500">
        {t3(locale,
          "Solo usamos tus datos para responder a tu mensaje. No los compartimos con terceros. Lee nuestra ",
          "We only use your data to reply to your message. We don't share it with third parties. Read our ",
          "Nous n'utilisons vos données que pour répondre. Nous ne les partageons pas. Lisez notre "
        )}
        <a href={`/${locale}/privacidad`} className="underline hover:text-terracotta-600">
          {t3(locale, "Política de Privacidad", "Privacy Policy", "Politique de confidentialité")}
        </a>.
      </p>
    </form>
  );
}
