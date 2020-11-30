// we need our modal component
import Vue from 'vue'
import ModalComponent from '@/components/Modal.vue'
import events from '@/plugins/events.js'

const Modal = {
  // every plugin for Vue.js needs install method
  // this method will run after Vue.use(<your-plugin-here>) is executed
  install (Vue) {
    // making our modal component global
    Vue.component('modal', ModalComponent)

    // exposing global $modal object with method show()
    // method show() takes object params as argument
    // inside this object we can have modal title, text, styles... and also our callback confirm function
    Vue.prototype.$modal = {
      show (params) {
        // if we use this.$modal.show(params) inside our original Vue instance
        // we will emit 'show' event with parameters 'params'
        events.$emit('showModal', params)
      },
      close () {
        // if we use this.$modal.show(params) inside our original Vue instance
        // we will emit 'show' event with parameters 'params'
        events.$emit('closeModal')
      }
    }
  }
}
Vue.use(Modal)

export default Modal
