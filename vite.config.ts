// @ts-ignore
import { defineConfig } from "vite";
// @ts-ignore
import react from "@vitejs/plugin-react";
// @ts-ignore
import tsconfigPaths from "vite-tsconfig-paths";
// @ts-ignore
import tailwindcss from "@tailwindcss/vite";
// @ts-ignore
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
// @ts-ignore
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    tanstackStart({ server: { entry: "server" } }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
