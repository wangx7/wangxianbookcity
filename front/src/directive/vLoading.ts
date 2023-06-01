import { type Directive, type DirectiveBinding } from 'vue'

const createLoadingOverlay = (): HTMLDivElement => {
  const overlay = document.createElement('div')
  overlay.classList.add('loading-overlay')

  const text = document.createElement('div')
  text.classList.add('loading-text')
  text.innerHTML = '加载中...'

  const spinner = document.createElement('div')
  spinner.classList.add('loading-spinner')
  overlay.appendChild(spinner)
  overlay.appendChild(text)

  return overlay
}

const setLoadingOverlay = (el: HTMLElement, binding: DirectiveBinding<boolean>): void => {
  if (binding.value) {
    const overlay = createLoadingOverlay()
    el.appendChild(overlay)
  } else {
    const overlay = el.querySelector('.loading-overlay')
    if (overlay) {
      el.removeChild(overlay)
    }
  }
}

const directive: Directive = {
  mounted(el, binding) {
    setLoadingOverlay(el, binding)
  },
  updated(el, binding) {
    setLoadingOverlay(el, binding)
  }
}
export default {
  name: 'loading',
  directive
}
