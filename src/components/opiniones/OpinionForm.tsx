"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { submitOpinion, type OpinionState } from "./opinion-actions";
import { TEMAS_OPINION } from "./temas";
import { t3 } from "@/lib/utils";

function SubmitButton({ locale }: { locale: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 px-6 py-3 font-semibold text-white shadow-lg shadow-terracotta-500/25 transition-all hover:from-terracotta-600 hover:to-terracotta-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending
        ? t3(locale, "Enviando…", "Sending…")
        : t3(locale, "Enviar mi opinión", "Send my opinion")}
    </button>
  );
}

interface Props {
  locale: string;
  /** Preselecciona el tema cuando el formulario va dentro de una página concreta. */
  temaPorDefecto?: string;
}

export default function OpinionForm({ locale, temaPorDefecto }: Props) {
  const [state, formAction] = useFormState<OpinionState, FormData>(submitOpinion, null);
  const isEs = locale === "es";

  if (state?.ok) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-jade-200 bg-jade-50 p-6 text-jade-800"
      >
        <h3 className="font-display text-lg font-bold">
          {isEs ? "Recibimos tu opinión" : "We got your opinion"}
        </h3>
        <p className="mt-1 text-sm leading-relaxed">{state.message}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-arena-200 px-4 py-2.5 text-sm text-arena-900 placeholder:text-arena-400 focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-200";
  const labelClass = "mb-1.5 block text-sm font-semibold text-arena-800";

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: invisible para personas, irresistible para bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {state && !state.ok && state.message && (
        <p
          role="alert"
          className="rounded-xl border border-terracotta-200 bg-terracotta-50 px-4 py-3 text-sm text-terracotta-800"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="opinion-nombre" className={labelClass}>
            {isEs ? "Nombre" : "Name"} *
          </label>
          <input
            id="opinion-nombre"
            name="nombre"
            required
            maxLength={60}
            className={inputClass}
            placeholder={isEs ? "Como quieres aparecer" : "How you want to appear"}
          />
        </div>
        <div>
          <label htmlFor="opinion-ciudad" className={labelClass}>
            {isEs ? "De dónde eres" : "Where you're from"}
          </label>
          <input
            id="opinion-ciudad"
            name="ciudad"
            maxLength={60}
            className={inputClass}
            placeholder={isEs ? "Opcional" : "Optional"}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="opinion-tema" className={labelClass}>
            {isEs ? "¿Sobre qué?" : "About what?"} *
          </label>
          <select
            id="opinion-tema"
            name="tema"
            required
            defaultValue={temaPorDefecto ?? ""}
            className={inputClass}
          >
            <option value="">{isEs ? "Elige un tema…" : "Pick a topic…"}</option>
            {TEMAS_OPINION.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {isEs ? tema.label.es : tema.label.en}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="opinion-visita" className={labelClass}>
            {isEs ? "Cuándo fuiste" : "When you went"}
          </label>
          <input
            id="opinion-visita"
            name="visita"
            maxLength={40}
            className={inputClass}
            placeholder={isEs ? "Ej. marzo de 2026" : "e.g. March 2026"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="opinion-texto" className={labelClass}>
          {isEs ? "Tu opinión" : "Your opinion"} *
        </label>
        <textarea
          id="opinion-texto"
          name="texto"
          required
          rows={6}
          minLength={40}
          maxLength={1500}
          className={inputClass}
          placeholder={
            isEs
              ? "Lo que te habría servido saber antes de ir: cuánto pagaste de verdad, qué te sorprendió, qué harías distinto."
              : "What you'd have wanted to know beforehand: what you actually paid, what surprised you, what you'd do differently."
          }
        />
        <p className="mt-1 text-xs text-arena-500">
          {isEs
            ? "Entre 40 y 1500 caracteres. Lo concreto sirve más que lo bonito: un precio, una hora, un número de camión."
            : "Between 40 and 1500 characters. Specifics beat adjectives: a price, a time, a bus number."}
        </p>
      </div>

      <div>
        <label htmlFor="opinion-email" className={labelClass}>
          {isEs ? "Tu correo" : "Your email"}
        </label>
        <input
          id="opinion-email"
          type="email"
          name="email"
          maxLength={120}
          className={inputClass}
          placeholder={isEs ? "Opcional, no se publica" : "Optional, never published"}
        />
        <p className="mt-1 text-xs text-arena-500">
          {isEs
            ? "Sólo lo usamos si necesitamos preguntarte algo sobre tu opinión. No se publica ni se usa para enviarte nada más."
            : "We only use it if we need to ask you something about your opinion. It's never published, and never used to send you anything else."}
        </p>
      </div>

      <div className="rounded-xl border border-arena-200 bg-arena-50 p-4">
        <label htmlFor="opinion-consentimiento" className="flex cursor-pointer items-start gap-3">
          <input
            id="opinion-consentimiento"
            type="checkbox"
            name="consentimiento"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-arena-300 text-terracotta-600 focus:ring-terracotta-400"
          />
          <span className="text-sm leading-relaxed text-arena-700">
            {isEs
              ? "Autorizo a RutasMéxico a publicar mi opinión junto con el nombre y la ciudad que escribí arriba."
              : "I authorise RutasMéxico to publish my opinion along with the name and city I entered above."}{" "}
            <Link href={`/${locale}/privacidad`} className="underline hover:text-terracotta-600">
              {isEs ? "Aviso de privacidad" : "Privacy notice"}
            </Link>
          </span>
        </label>
      </div>

      <SubmitButton locale={locale} />

      <p className="text-xs leading-relaxed text-arena-500">
        {isEs
          ? "Leemos todas las opiniones antes de publicarlas y no todas se publican: descartamos las que no aportan un dato comprobable, las que insultan y las promocionales. Podemos recortar por longitud, nunca cambiar el sentido."
          : "We read every opinion before publishing and not all get published: we drop the ones with no checkable detail, the abusive ones and the promotional ones. We may trim for length, never change the meaning."}
      </p>
    </form>
  );
}
