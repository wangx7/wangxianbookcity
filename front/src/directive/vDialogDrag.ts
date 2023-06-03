export default {
  name: 'dialog-drag',
  directive: {
    mounted: (el: HTMLElement) => {
      const width = Math.floor(+el.style.width / 2)
      el.style.margin = '0'
      el.style.left = `calv('50%' - ${width})`
      el.style.position = 'absolute'

      el.onmousedown = function (e) {
        // 鼠标初始坐标
        const mouseX = e.clientX
        const mouseY = e.clientY

        // 鼠标初始坐标
        const eleX = el.offsetLeft
        const eleY = el.offsetTop

        document.onmousemove = function (e) {
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
      }
    }
  }
}
