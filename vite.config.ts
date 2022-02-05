import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

const projectRootDir = resolve(__dirname);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(projectRootDir, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/scss/colors.scss";`,
      },
    },
  },
});
