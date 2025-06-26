import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TodoWithJsonServer from "./TodoWithJsonServer.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <TodoWithJsonServer />
    </StrictMode>
);
