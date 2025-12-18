export function reportWebVitals(metric: any) {
  if (typeof window === "undefined") return

  const url = new URL("/api/vitals", window.location.origin)

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, JSON.stringify(metric))
  } else {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(metric),
      keepalive: true,
    }).catch(() => {
      // Silently fail if metrics endpoint is unavailable
    })
  }
}
