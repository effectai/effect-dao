<template>
  <div class="modal" :class="{ 'is-active': visible }">
    <div class="modal-background" @click="!persistent ? hide() : null"></div>
    <div class="modal-content content box has-no-shadow" :class="['has-background-' + color]">
      <h2 v-if="title && title.length" :class="{'has-text-white': color !== 'white'}">{{ title }}</h2>
      <div>
        <ul v-if="text instanceof Array" class="headline" :class="{'has-text-white': color !== 'white'}">
          <!-- eslint-disable-next-line -->
          <li v-for="textValue in text" v-html="textValue" />
        </ul>
        <h5 v-else style="white-space:pre-wrap;" :class="{'has-text-white': color !== 'white'}" v-html="text" />
      </div>
      <div class="has-text-right">
        <button v-if="cancel" class="button" @click="hide"  :class="{'is-loading': loading}">
          {{ cancelText }}
        </button>
        <button class="button is-primary" @click="confirm" :class="{'is-loading': loading}">
          {{ confirmText }}
        </button>
      </div>
    </div>
    <button v-if="!persistent" class="modal-close is-large" aria-label="close" @click="hide"></button>
  </div>
</template>

<script>
// we must import our Modal plugin instance
// because it contains reference to our Eventbus
import events from '@/plugins/events.js'

export default {
  data () {
    return {
      visible: false,
      title: 'Info',
      text: '',
      color: 'white',
      cancel: true,
      persistent: false,
      confirmText: 'OK',
      cancelText: 'Cancel',
      onConfirm: {},
      loading: false
    }
  },
  beforeMount () {
    // here we need to listen for emited events
    // we declared those events inside our plugin
    events.$on('showModal', (params) => {
      this.show(params)
    })
    events.$on('closeModal', () => {
      this.hide()
    })
  },
  methods: {
    hide () {
      // method for closing modal
      this.visible = false
    },
    resetValues () {
      this.visible = false
      this.title = 'Info'
      this.text = ''
      this.color = 'white'
      this.cancel = true
      this.persistent = false
      this.confirmText = 'OK'
      this.cancelText = 'Cancel'
      this.onConfirm = {}
    },
    async confirm () {
      // we must check if this.onConfirm is function
      if (typeof this.onConfirm === 'function') {
        // run passed function and then close the modal
        this.loading = true
        try {
          if (await this.onConfirm() !== false) {
            this.hide()
          }
        } catch (e) {
          console.error(e)
          let error = 'something went wrong, try again later'
          console.log(e.response)
          if (e.response && e.response.data && e.response.data.message) {
            error = e.response.data.message
          }
          this.$modal.show({
            color: 'error',
            text: error,
            title: 'Error'
          })
        }
        this.loading = false
      } else {
        // we only close the modal
        this.hide()
      }
    },
    show (params) {
      this.resetValues()
      // making modal visible
      this.visible = true
      // setting title and text
      this.title = params.title
      if (params.text instanceof Error) {
        const e = params.text
        let error = 'something went wrong'
        if (e.response && e.response.data) {
          if (e.response.data.error) {
            error = e.response.data.error
          } else if (e.response.data.message) {
            error = e.response.data.message
          } else if (e.response.data.errorMessage) {
            error = e.response.data.errorMessage
          } else if (typeof e.response.data === 'string') {
            error = e.response.data
          }
        } else if (e.message) {
          error = e.message
        }
        this.text = error
      } else {
        this.text = params.text
      }

      // setting callback function
      this.onConfirm = params.onConfirm
      if (typeof this.onConfirm !== 'function') { this.cancel = false }
      if (params.confirmText) { this.confirmText = params.confirmText }
      if (params.cancelText) { this.cancelText = params.cancelText }
      // eslint-disable-next-line
      if (params.hasOwnProperty('cancel')) { this.cancel = params.cancel }
      // eslint-disable-next-line
      if (params.hasOwnProperty('persistent')) { this.persistent = params.persistent }
      if (params.color) { this.color = params.color }
      if (params.title) { this.title = params.title } else if (params.color === 'error') { this.title = 'Error' }
    }
  }
}
</script>
