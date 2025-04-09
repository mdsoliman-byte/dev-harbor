
import React from 'react'; // Add explicit React import
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// This ensures we have a valid root element to mount the app
const rootElement = document.getElementById("root");
if (!rootElement) {
  const newRoot = document.createElement("div");
  newRoot.id = "root";
  document.body.appendChild(newRoot);
}

try {
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("App mounted successfully");
} catch (error) {
  console.error("Failed to mount app:", error);
  // Fallback error display
  const errorDiv = document.createElement("div");
  errorDiv.style.padding = "20px";
  errorDiv.style.color = "red";
  errorDiv.innerHTML = `<h1>Error mounting application</h1><pre>${error}</pre>`;
  document.body.appendChild(errorDiv);
}
