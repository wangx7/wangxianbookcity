import { type App } from 'vue'

interface Imod {
  default: {
    name: string
    directive: Object
  }
}

const modules: Record<string, Imod> = import.meta.glob('./*.ts', { eager: true })

export default {
  install(app: App) {
    for (const path in modules) {
      const mod = modules[path].default
      app.directive(mod.name, mod.directive)
    }
  }
}
