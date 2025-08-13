import { defineConfig } from "@rsbuild/core";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginVue } from "@rsbuild/plugin-vue";
import { VantResolver } from "@vant/auto-import-resolver";
import path from "path";
import AutoImport from "unplugin-auto-import/rspack";
import Components from "unplugin-vue-components/rspack";


export default defineConfig({
  plugins: [pluginVue(), pluginLess()],
  tools: {
    rspack: {
       resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"), // 让 @ 指向 src
        },
      },
      plugins: [
        AutoImport({
          resolvers: [VantResolver()],
          imports: ['vue', 'vue-router'], 
        }),
        Components({
          resolvers: [VantResolver()],
        }),
      ],
    },
  },
});
