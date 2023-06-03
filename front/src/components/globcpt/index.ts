import { type App } from 'vue'

const components: Record<string, any> = import.meta.glob('./*.vue', { eager: true })

export default {
  install(app: App) {
    for (const key in components) {
      app.component(
        key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.')),
        components[key].default
      )
    }
  }
}
