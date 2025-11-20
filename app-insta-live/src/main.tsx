import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAllPixels } from "./config/pixels-tracking";

// Initialize tracking pixels
initAllPixels();

createRoot(document.getElementById("root")!).render(<App />);
