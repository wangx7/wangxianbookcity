import { type App } from 'vue'

const components = import.meta.glob('./*.vue')

export default {
  install(app: App) {
    for (const key in components) {
      app.directive(key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.')), components[key])
    }
  }
}
