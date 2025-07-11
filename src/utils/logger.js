const LOG_API_URL = "http://20.244.56.144/evaluation-server/logs";

// Optional: If the API needs token
const AUTH_TOKEN = ""; // Replace with token if needed

const allowedStacks = ["frontend", "backend"];
const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
const allowedPackages = {
  frontend: ["api", "component", "hook", "page", "state", "style"],
  backend: ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "service"],
  common: ["auth", "config", "middleware", "utils"]
};

export async function Log(stack, level, logPackage, message) {
  const s = stack?.toLowerCase();
  const l = level?.toLowerCase();
  const p = logPackage?.toLowerCase();

  const isValidStack = allowedStacks.includes(s);
  const isValidLevel = allowedLevels.includes(l);
  const isValidPackage =
    allowedPackages[s]?.includes(p) || allowedPackages.common.includes(p);

  if (!isValidStack || !isValidLevel || !isValidPackage) {
    console.error("❌ Invalid log parameters");
    return;
  }

  const payload = {
    stack: s,
    level: l,
    package: p,
    message
  };

  try {
    const res = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(AUTH_TOKEN && { "Authorization": `Bearer ${AUTH_TOKEN}` })
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    console.log("✅ Log sent:", data);
    return data;
  } catch (err) {
    console.error("❌ Logger failed:", err.message);
  }
}
