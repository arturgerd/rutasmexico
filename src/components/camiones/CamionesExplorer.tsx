"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { t3 } from "@/lib/utils";
import { CAMION_PLACES, filterCamionSummaries } from "@/lib/camiones-lugares";
import { formatMeters, formatMinutes } from "@/lib/camiones-geo";
import { planTrip } from "@/lib/camiones-planner";
import {
  CamionFilter,
  CamionLine,
  CamionPlace,
  CamionPlan,
  CamionSummary,
  LngLat,
} from "@/types/camion";
import CamionesMapLoader from "./CamionesMapLoader";

interface Props {
  routes: CamionSummary[];
  locale: string;
}

type Tab = "rutas" | "viaje";
type Endpoint = { label: string; point: LngLat };

const FILTERS: { value: CamionFilter; es: string; en: string }[] = [
  { value: "todas", es: "Todas", en: "All" },
  { value: "hotelera", es: "Zona Hotelera", en: "Hotel Zone" },
  { value: "urbana", es: "Sólo ciudad", en: "City only" },
  { value: "24h", es: "24 horas", en: "24 hours" },
  { value: "combi", es: "Combis", en: "Shared vans" },
];

export default function CamionesExplorer({ routes, locale }: Props) {
  const t = (es: string, en: string) => t3(locale, es, en);

  const [tab, setTab] = useState<Tab>("rutas");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CamionFilter>("todas");
  const [selected, setSelected] = useState<string | null>(null);

  // La geometría no viaja en las props: se baja aparte y sólo una vez, para que
  // la página siga siendo ligera para quien nunca abre el mapa.
  const [lines, setLines] = useState<CamionLine[] | null>(null);
  const [linesError, setLinesError] = useState(false);

  const [origin, setOrigin] = useState<Endpoint | null>(null);
  const [dest, setDest] = useState<Endpoint | null>(null);
  const [picking, setPicking] = useState<"origin" | "dest" | null>(null);
  const [activePlan, setActivePlan] = useState<CamionPlan | null>(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/camiones-cancun-lineas.json")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data: { routes: CamionLine[] }) => {
        if (!cancelled) setLines(data.routes);
      })
      .catch(() => {
        if (!cancelled) setLinesError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(
    () => filterCamionSummaries(routes, query, filter),
    [routes, query, filter]
  );

  const plans = useMemo(() => {
    if (!lines || !origin || !dest) return [];
    return planTrip(lines, origin.point, dest.point, origin.label, dest.label, locale);
  }, [lines, origin, dest, locale]);

  // Al cambiar origen o destino se muestra la mejor opción de entrada.
  useEffect(() => {
    setActivePlan(plans[0] ?? null);
  }, [plans]);

  function setEndpoint(which: "origin" | "dest", end: Endpoint) {
    if (which === "origin") setOrigin(end);
    else setDest(end);
    // Tras fijar el origen lo siguiente que quiere el usuario es el destino.
    setPicking(which === "origin" ? "dest" : null);
  }

  function handleMapClick(point: LngLat) {
    if (!picking) return;
    // Si el clic cae encima de un punto conocido, se usa su nombre en vez de
    // unas coordenadas que no le dicen nada a nadie.
    const near = CAMION_PLACES.find(
      (p) => (p.lat - point.lat) ** 2 + (p.lng - point.lng) ** 2 < 0.00008
    );
    setEndpoint(picking, {
      label: near?.name ?? `${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}`,
      point,
    });
  }

  function choosePlace(which: "origin" | "dest", place: CamionPlace) {
    setEndpoint(which, { label: place.name, point: { lng: place.lng, lat: place.lat } });
  }

  function locate() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setEndpoint("origin", {
          label: t("Donde estoy", "Where I am"),
          point: { lng: pos.coords.longitude, lat: pos.coords.latitude },
        });
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
      {/* Panel */}
      <div className="order-2 lg:order-1">
        <div
          role="tablist"
          aria-label={t("Vistas del mapa", "Map views")}
          className="mb-4 inline-flex rounded-xl border border-arena-200 bg-white p-1"
        >
          {(["rutas", "viaje"] as Tab[]).map((value) => (
            <button
              key={value}
              role="tab"
              aria-selected={tab === value}
              onClick={() => {
                setTab(value);
                if (value === "viaje") setSelected(null);
                else setPicking(null);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === value
                  ? "bg-arena-900 text-white"
                  : "text-arena-700 hover:text-terracotta-600"
              }`}
            >
              {value === "rutas" ? t("Rutas", "Routes") : t("Cómo llego", "Get me there")}
            </button>
          ))}
        </div>

        {tab === "rutas" ? (
          <div>
            <label htmlFor="camion-buscar" className="sr-only">
              {t("Buscar ruta", "Search route")}
            </label>
            <input
              id="camion-buscar"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("R1, Mercado 28, Delfines…", "R1, Mercado 28, Delfines…")}
              className="w-full rounded-xl border border-arena-200 px-4 py-2.5 text-sm text-arena-900 placeholder:text-arena-400 focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-200"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  aria-pressed={filter === f.value}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    filter === f.value
                      ? "border-arena-900 bg-arena-900 text-white"
                      : "border-arena-200 bg-white text-arena-600 hover:border-arena-400"
                  }`}
                >
                  {t(f.es, f.en)}
                </button>
              ))}
            </div>

            <p className="mt-3 text-xs text-arena-500">
              {visible.length === routes.length
                ? t(`${routes.length} rutas en el catálogo`, `${routes.length} routes in the catalogue`)
                : t(
                    `${visible.length} de ${routes.length} rutas`,
                    `${visible.length} of ${routes.length} routes`
                  )}
            </p>

            <ul className="mt-3 max-h-[520px] space-y-2 overflow-y-auto pr-1">
              {visible.map((route) => (
                <li key={route.slug}>
                  <div
                    className={`rounded-xl border bg-white p-3 transition-all ${
                      selected === route.slug
                        ? "border-terracotta-400 shadow-md"
                        : "border-arena-200 hover:border-arena-400"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => setSelected(selected === route.slug ? null : route.slug)}
                        aria-pressed={selected === route.slug}
                        className="mt-0.5 inline-flex h-9 min-w-[2.75rem] shrink-0 items-center justify-center rounded-lg px-1.5 text-sm font-bold text-white"
                        style={{ backgroundColor: route.color }}
                        title={t("Ver en el mapa", "Show on the map")}
                      >
                        {route.code}
                      </button>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/${locale}/camiones-cancun/${route.slug}`}
                          className="block truncate font-display text-sm font-bold text-arena-900 hover:text-terracotta-600"
                        >
                          {route.name}
                        </Link>
                        <p className="mt-0.5 truncate text-xs text-arena-600">
                          {t("Letrero", "Sign")}: {route.sign}
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          <span className="rounded-full bg-arena-100 px-2 py-0.5 text-[11px] font-medium text-arena-700">
                            ${route.fareMxn} MXN
                          </span>
                          {route.allDay && (
                            <span className="rounded-full bg-jade-50 px-2 py-0.5 text-[11px] font-medium text-jade-800">
                              {t("24 h", "24 h")}
                            </span>
                          )}
                          {route.vehicleType === "combi" && (
                            <span className="rounded-full bg-oro-50 px-2 py-0.5 text-[11px] font-medium text-oro-800">
                              {t("Combi", "Shared van")}
                            </span>
                          )}
                          {route.coverage === "hotelera" && (
                            <span className="rounded-full bg-azul-50 px-2 py-0.5 text-[11px] font-medium text-azul-800">
                              {t("Zona Hotelera", "Hotel Zone")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {visible.length === 0 && (
              <p className="mt-4 rounded-xl border border-arena-200 bg-arena-50 p-4 text-sm text-arena-700">
                {t(
                  "Ninguna ruta coincide. Prueba con el número del camión o con el nombre de una parada.",
                  "No route matches. Try the bus number or the name of a stop."
                )}
              </p>
            )}
          </div>
        ) : (
          <TripPlanner
            locale={locale}
            origin={origin}
            dest={dest}
            picking={picking}
            onPick={setPicking}
            onChoosePlace={choosePlace}
            onLocate={locate}
            locating={locating}
            plans={plans}
            activePlan={activePlan}
            onSelectPlan={setActivePlan}
            ready={Boolean(lines)}
          />
        )}
      </div>

      {/* Mapa */}
      <div className="order-1 lg:order-2">
        {linesError ? (
          <div className="flex h-[560px] w-full items-center justify-center rounded-2xl border border-arena-200 bg-arena-50 p-6 text-center">
            <p className="text-sm text-arena-700">
              {t(
                "No se pudo cargar el mapa. La lista de rutas de al lado sigue funcionando.",
                "The map failed to load. The route list beside it still works."
              )}
            </p>
          </div>
        ) : !lines ? (
          <div className="h-[560px] w-full animate-pulse rounded-2xl bg-arena-100" />
        ) : (
          <>
            {tab === "viaje" && picking && (
              <p className="mb-2 rounded-lg bg-azul-50 px-3 py-2 text-xs font-medium text-azul-800">
                {picking === "origin"
                  ? t("Toca el mapa para marcar dónde empiezas.", "Tap the map to mark where you start.")
                  : t("Toca el mapa para marcar a dónde vas.", "Tap the map to mark where you are going.")}
              </p>
            )}
            <CamionesMapLoader
              lines={lines}
              visibleIds={visible.map((r) => r.slug)}
              selectedId={tab === "rutas" ? selected : null}
              onSelect={setSelected}
              plan={tab === "viaje" ? activePlan : null}
              origin={tab === "viaje" ? (origin?.point ?? null) : null}
              dest={tab === "viaje" ? (dest?.point ?? null) : null}
              picking={tab === "viaje" && picking !== null}
              onMapClick={handleMapClick}
              locale={locale}
            />
          </>
        )}
      </div>
    </div>
  );
}

interface PlannerProps {
  locale: string;
  origin: Endpoint | null;
  dest: Endpoint | null;
  picking: "origin" | "dest" | null;
  onPick: (which: "origin" | "dest" | null) => void;
  onChoosePlace: (which: "origin" | "dest", place: CamionPlace) => void;
  onLocate: () => void;
  locating: boolean;
  plans: CamionPlan[];
  activePlan: CamionPlan | null;
  onSelectPlan: (plan: CamionPlan) => void;
  ready: boolean;
}

function TripPlanner({
  locale,
  origin,
  dest,
  picking,
  onPick,
  onChoosePlace,
  onLocate,
  locating,
  plans,
  activePlan,
  onSelectPlan,
  ready,
}: PlannerProps) {
  const t = (es: string, en: string) => t3(locale, es, en);

  return (
    <div className="space-y-4">
      <EndpointPicker
        locale={locale}
        which="origin"
        label={t("Desde", "From")}
        value={origin}
        active={picking === "origin"}
        onPick={onPick}
        onChoosePlace={onChoosePlace}
      />

      <button
        onClick={onLocate}
        disabled={locating}
        className="w-full rounded-xl border border-arena-200 bg-white px-4 py-2 text-sm font-medium text-arena-700 transition-colors hover:border-arena-400 disabled:opacity-60"
      >
        {locating ? t("Ubicando…", "Locating…") : t("Usar mi ubicación", "Use my location")}
      </button>

      <EndpointPicker
        locale={locale}
        which="dest"
        label={t("Hasta", "To")}
        value={dest}
        active={picking === "dest"}
        onPick={onPick}
        onChoosePlace={onChoosePlace}
      />

      {!origin || !dest ? (
        <p className="rounded-xl border border-arena-200 bg-arena-50 p-4 text-sm text-arena-700">
          {t(
            "Elige un punto de salida y uno de llegada. Puedes escogerlos de la lista o tocándolos en el mapa.",
            "Pick a start and an end point. Choose them from the list or tap them on the map."
          )}
        </p>
      ) : !ready ? (
        <p className="text-sm text-arena-600">{t("Calculando…", "Working it out…")}</p>
      ) : plans.length === 0 ? (
        <p className="rounded-xl border border-oro-200 bg-oro-50 p-4 text-sm text-oro-900">
          {t(
            "No encontramos una combinación razonable entre esos dos puntos. Suele pasar cuando uno de ellos queda lejos de cualquier ruta: prueba moviéndolo a una avenida.",
            "We couldn't find a reasonable combination between those two points. That usually means one of them is far from any route: try moving it onto a main avenue."
          )}
        </p>
      ) : (
        <ul className="space-y-3">
          {plans.map((plan) => {
            const isActive = activePlan?.id === plan.id;
            return (
              <li key={plan.id}>
                <button
                  onClick={() => onSelectPlan(plan)}
                  aria-pressed={isActive}
                  className={`w-full rounded-xl border bg-white p-4 text-left transition-all ${
                    isActive
                      ? "border-terracotta-400 shadow-md"
                      : "border-arena-200 hover:border-arena-400"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-lg font-bold text-arena-900">
                      {formatMinutes(plan.minutes)}
                    </span>
                    <span className="text-sm font-semibold text-terracotta-600">
                      {plan.fareMxn === 0 ? t("Sin costo", "Free") : `$${plan.fareMxn} MXN`}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-arena-600">
                    {plan.transfers === 0
                      ? t("Sin trasbordos", "No transfers")
                      : t(
                          `${plan.transfers} trasbordo${plan.transfers > 1 ? "s" : ""}`,
                          `${plan.transfers} transfer${plan.transfers > 1 ? "s" : ""}`
                        )}{" "}
                    · {formatMeters(plan.meters, locale)}
                  </p>

                  <ol className="mt-3 space-y-2">
                    {plan.legs.map((leg, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs">
                        {leg.kind === "bus" ? (
                          <span
                            className="mt-0.5 inline-flex h-6 min-w-[2.25rem] shrink-0 items-center justify-center rounded px-1 text-[11px] font-bold text-white"
                            style={{ backgroundColor: leg.routeColor ?? "#e96424" }}
                          >
                            {leg.routeCode}
                          </span>
                        ) : (
                          <span className="mt-0.5 inline-flex h-6 w-9 shrink-0 items-center justify-center rounded bg-arena-100 text-[11px] font-medium text-arena-700">
                            {t("A pie", "Walk")}
                          </span>
                        )}
                        <span className="text-arena-700">
                          {leg.kind === "bus"
                            ? t(
                                `Sube en ${leg.fromLabel} y baja en ${leg.toLabel}`,
                                `Board at ${leg.fromLabel}, get off at ${leg.toLabel}`
                              )
                            : t(
                                `Camina hasta ${leg.toLabel}`,
                                `Walk to ${leg.toLabel}`
                              )}
                          <span className="text-arena-500">
                            {" "}
                            · {formatMinutes(leg.minutes)}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-xs leading-relaxed text-arena-500">
        {t(
          "Tiempos estimados por distancia y velocidad comercial. No hay horarios publicados ni GPS abierto del transporte urbano de Cancún: esto te dice por dónde pasa cada ruta, no a qué hora pasa.",
          "Times are estimated from distance and average operating speed. Cancún city transport publishes no timetable and no open GPS feed: this tells you where each route goes, not when it comes."
        )}
      </p>
    </div>
  );
}

function EndpointPicker({
  locale,
  which,
  label,
  value,
  active,
  onPick,
  onChoosePlace,
}: {
  locale: string;
  which: "origin" | "dest";
  label: string;
  value: Endpoint | null;
  active: boolean;
  onPick: (which: "origin" | "dest" | null) => void;
  onChoosePlace: (which: "origin" | "dest", place: CamionPlace) => void;
}) {
  const t = (es: string, en: string) => t3(locale, es, en);
  const selectId = `camion-${which}`;

  return (
    <div className="rounded-xl border border-arena-200 bg-white p-3">
      <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-wide text-arena-500">
        {label}
      </label>
      <select
        id={selectId}
        value=""
        onChange={(e) => {
          const place = CAMION_PLACES.find((p) => p.id === e.target.value);
          if (place) onChoosePlace(which, place);
        }}
        className="mt-1.5 w-full rounded-lg border border-arena-200 px-3 py-2 text-sm text-arena-900 focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-200"
      >
        <option value="">{t("Elige un lugar…", "Pick a place…")}</option>
        {CAMION_PLACES.map((place) => (
          <option key={place.id} value={place.id}>
            {place.name} — {locale === "es" ? place.hint.es : place.hint.en}
          </option>
        ))}
      </select>

      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="min-w-0 flex-1 truncate text-sm text-arena-800">
          {value ? value.label : <span className="text-arena-400">{t("Sin elegir", "Not set")}</span>}
        </p>
        <button
          onClick={() => onPick(active ? null : which)}
          className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            active
              ? "bg-azul-600 text-white"
              : "border border-arena-200 text-arena-700 hover:border-arena-400"
          }`}
        >
          {active ? t("Toca el mapa", "Tap the map") : t("En el mapa", "On the map")}
        </button>
      </div>
    </div>
  );
}
