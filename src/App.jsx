import React, { useEffect } from "react";
import { Log } from "./utils/logger";

function App() {
  useEffect(() => {
    // Log lifecycle
    Log("frontend", "info", "component", "App mounted");

    // Simulate error
    setTimeout(() => {
      Log("backend", "error", "handler", "received string, expected bool");
    }, 2000);

    // Simulate DB error
    setTimeout(() => {
      Log("backend", "fatal", "db", "critical database connection failure.");
    }, 4000);
  }, []);

  return (
    <div>
      <h1>React Logging Middleware</h1>
      <p>Logs are being sent to the server. Check console.</p>
    </div>
  );
}

export default App;
