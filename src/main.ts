import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
import 'uview-plus/index.scss'
import * as Pinia from 'pinia'
import App from './App.vue'

import { createUnistorage } from 'pinia-plugin-unistorage'

export function createApp() {
  const app = createSSRApp(App)
  const store = Pinia.createPinia()
  app.use(uviewPlus)
  // 如此配置即可
  store.use(createUnistorage())
  uni.$u.config.unit = 'rpx'
  app.use(store)

  return {
    app,
    Pinia,
  }
}
