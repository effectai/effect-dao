<template>
  <div>
    <NavBar />
    <div class="container is-max-widescreen content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  components: {
    NavBar
  },

  data () {
    return {

    }
  }
}
</script>

<style>
  .content {
    margin-top: 20px;
  }
</style>
