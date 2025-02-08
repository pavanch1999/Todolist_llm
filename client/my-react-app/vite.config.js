import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Todolist_llm/", // 👈 Replace this with your GitHub repo name
});
