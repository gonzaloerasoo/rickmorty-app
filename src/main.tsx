import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="p-8 rounded-xl bg-gray-900 shadow-2xl border border-gray-700">
        <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">
          Tailwind está funcionando ✅
        </h1>
        <App />
      </div>
    </div>
  </React.StrictMode>
);
