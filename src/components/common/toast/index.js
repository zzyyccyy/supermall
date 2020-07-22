import Toast from './Toast'

const obj ={}

// install会默认传入vue
obj.install = function(Vue){
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.new的方式，根据组件构造器，可以创建出来组件对象
  const toast = new toastConstructor()

  // 3.将组件对象手动挂载到某一元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是div，添加到body上
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj