import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/critical.css";
import "./index.css";
import "./styles/navigation.css";

createRoot(document.getElementById("root")!).render(<App />);
