import { createVNode, render } from 'vue'
import AppMessage from "./app-message.vue"
const div = document.createElement('div')
div.setAttribute('class', 'app-message-container')
document.body.appendChild(div)
let timer = null
export default ({ type, text }) => {
  const vnode = createVNode(AppMessage, { type, text })
  render(vnode, div)
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 2000)
}
