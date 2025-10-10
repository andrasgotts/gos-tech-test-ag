import Image from "next/image";
import { fetchYorkWeather } from "@/lib/weather";

export default async function Home() {
  const weather = await fetchYorkWeather();
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <Image
          src="/greenhouseos.webp"
          alt="GreenhouseOS Logo"
          width={160}
          height={48}
          className="h-12 w-auto mb-4"
          priority
        />
        <header className="mb-6">
          <h1
            className="text-3xl font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Weather — {weather.location}
          </h1>
          <p className="mt-1 text-sm text-white">
            Observed: {weather.observedAt}
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <h2 className="text-xl font-medium mb-2 text-white">Temperature</h2>
            <p
              className="text-4xl font-bold"
              style={{ color: "var(--accent)" }}
            >
              {weather.temperatureF}°F{/*FARRENHEIT??*/}
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--foreground)" }}>
              {weather.summary}
              {/*
              <Image
          src={weather.summaryimg}
          alt="Weather Summary Image"
          width={160}
          height={48}
          className="h-12 w-auto mb-4"
          priority
        />
              */}
              
            </p>
          </div>

          {/* Wind card */}
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <h2 className="text-xl font-medium mb-2 text-white">Wind</h2>
            <div>
              <p
                className="text-4xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                {weather.windSpeedMph} mph
              </p>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--foreground)" }}
              >
                Direction: {Math.round(weather.windDirection)}°
              </p>
            </div>
          </div>

          {/* Extras card with data preview (still not used elsewhere) */}
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <h2 className="text-xl font-medium mb-2 text-white">At a glance</h2>
            <ul className="space-y-1 text-sm">
              <li style={{ color: "var(--foreground)" }}>
                Apparent: {Math.round(weather.apparentC)}°C{/*CELCIUS??*/}
              </li>
              <li style={{ color: "var(--foreground)" }}>
                Humidity: {Math.round(weather.humidity)}%
              </li>
              <li style={{ color: "var(--foreground)" }}>
                Cloud cover: {Math.round(weather.cloudCoverPct)}%
              </li>
              <li style={{ color: "var(--foreground)" }}>
                Precipitation: {weather.precipitationMm} mm
              </li>
            </ul>
          </div>
        </section>

        {/* Secondary row with sunrise/sunset/UV if present */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">Sunrise</h3>
            <p className="text-base" style={{ color: "var(--foreground)" }}>
              {weather.sunrise ?? "—"}
            </p>
          </div>
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">Sunset</h3>
            <p className="text-base" style={{ color: "var(--foreground)" }}>
              {weather.sunset ?? "—"}
            </p>
          </div>
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">
              UV Index (max)
            </h3>
            <p className="text-base" style={{ color: "var(--foreground)" }}>
              {weather.uvIndexMax ?? "—"}
            </p>
          </div>
        </section>

        {/* third row with daily info if present */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">Time</h3>
            <p className="text-base" style={{ color: "var(--foreground)" }}>
              {weather.time ?? "—"}
            </p>
          </div>
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">temperature_2m_max</h3>
            <p className="text-base" style={{ color: "var(--foreground)" }}>
              {weather.temperature_2m_max ?? "—"}
            </p>
          </div>
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">
              temperature_2m_min
            </h3>
            <p className="text-base" style={{ color: "var(--foreground)" }}>
              {weather.temperature_2m_min ?? "—"}
            </p>
          </div>
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">
              precipitation_sum
            </h3>
            <p className="text-base" style={{ color: "var(--foreground)" }}>
              {weather.precipitation_sum ?? "—"}
            </p>
          </div>
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">
              wind_speed_10m_max
            </h3>
            <p className="text-base" style={{ color: "var(--foreground)" }}>
              {weather.wind_speed_10m_max ?? "—"}
            </p>
          </div>
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">
              wind_gusts_10m_max
            </h3>
            <p className="text-base" style={{ color: "var(--foreground)" }}>
              {weather.wind_gusts_10m_max ?? "—"}
            </p>
          </div>
          <div
            className="rounded-xl shadow-xl shadow-green-950/25 border p-5"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">
              wind_direction_10m_dominant
            </h3>
            <p className="text-base" style={{ color: "var(--foreground)" }}>
              {weather.wind_direction_10m_dominant ?? "—"}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
