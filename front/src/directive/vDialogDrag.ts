export default {
  name: 'dialog-drag',
  directive: {
    mounted: (el: HTMLElement) => {
      el.style.margin = '0'
      el.style.left = '50%'
      

      el.onmousedown = function (e) {
        e = e || window.event // 兼容 IE

        // 鼠标初始坐标
        const mouseX = e.clientX
        const mouseY = e.clientY

        // 鼠标初始坐标
        const eleX = el.offsetLeft
        const eleY = el.offsetTop

        document.onmousemove = function (e) {
          e = e || window.event

          // 鼠标新坐标
          const newMouseX = e.clientX
          const newMouseY = e.clientY

          el.style.left = eleX + newMouseX - mouseX + 'px'
          el.style.top = eleY + newMouseY - mouseY + 'px'
        }

        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
        }

        e.preventDefault && e.preventDefault()
        return false // 处理高级浏览器 ctrl+A
      }
    }
  }
}
