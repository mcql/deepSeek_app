import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VantResolver } from '@vant/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
    resolvers: [ElementPlusResolver(), VantResolver({})],
  }),
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()],
    })],
  server: {
    host: '0.0.0.0',
    port: 3000,
  }
})
