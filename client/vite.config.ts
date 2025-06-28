import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { templateCompilerOptions } from "@tresjs/core";
// https://vite.dev/config/

const isDevelopment = process.env.NODE_ENV !== "production";

export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
  ],
  css: {
    preprocessorOptions: {
      //자주 쓰는 변수,mixin 등을 전역scss로 설정할 때
      scss: {
        additionalData: `
          @use "@styles/_reset.scss";
          @use "@styles/index.scss";
          @use "@styles/_utils.scss" as *;
          @use "@styles/_mixin.scss" as *;
          @use "@styles/_variables.scss" as *; //❗ MEMO: '* as' 이거 안붙히면 .vue <style> 안에서 안불러와짐ㅜㅠ
        `,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("src", import.meta.url)),
      },
      {
        find: "@assets",
        replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
      {
        find: "@components",
        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
      },
      {
        find: "@styles",
        replacement: fileURLToPath(new URL("./src/styles", import.meta.url)),
      },
      {
        find: "@stores",
        replacement: fileURLToPath(new URL("./src/stores", import.meta.url)),
      },
      {
        find: "@router",
        replacement: fileURLToPath(new URL("./src/router", import.meta.url)),
      },
      {
        find: "@layouts",
        replacement: fileURLToPath(new URL("./src/layouts", import.meta.url)),
      },
      {
        find: "@pages",
        replacement: fileURLToPath(new URL("./src/pages", import.meta.url)),
      },
      {
        find: "@types",
        replacement: fileURLToPath(new URL("./src/types", import.meta.url)),
      },
    ],
  },
  server: {
    proxy: {
      "/api/": {
        target: "http://localhost:3095",
        changeOrigin: true,
        ws: true, //websocket
      },
    },
  },
});
