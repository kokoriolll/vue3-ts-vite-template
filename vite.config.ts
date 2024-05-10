import { defineConfig } from 'vite';
// @ts-ignore
import path from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

function resolve(dir) {
  // @ts-ignore
  return path.join(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      vueTemplate: true,
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'dayjs': [
            // default imports
            ['default', 'dayjs'],
          ],
        }
      ],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  // 配置别名
  resolve: {
    alias: {
      // @ts-ignore
      '@': path.join(__dirname, './src'),
      static: resolve('public/static'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  //启动服务配置
  server: {
    // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0" 也可设置成你的ip地址
    host: '0.0.0.0',
    port: 8080,
    open: false,
    https: false,
    cors: true,
    // 代理跨域（模拟示例）
    proxy: {
      '/api': {
        target: 'http://192.168.100.95:9997',
        changeOrigin: true,
        ws: true
      }
    }
  }
});
