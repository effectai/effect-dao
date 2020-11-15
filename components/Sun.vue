<template>
  <div class="sun is-hidden-mobile">
    <img src="@/assets/img/effect_logo_yellow.png" />
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.sun {
  position: fixed;
  animation: rise 30s forwards ease-out;
  width: 600px;
  height: 600px;
  opacity: 0.1;
  position: fixed;
  bottom: -600px;
  left: -300px;
  z-index: -1;

  &:before {
    content: "";
    display: block;
    opacity: 1;
    width: 0;
    height: 0;
    position: absolute;
    top:50%;
    left:50%;
    border-radius: 100%;
    box-shadow: 0px 0px 500px 400px #fcff30;
    animation: glow 15s infinite alternate ease-out;
  }
}
@keyframes glow {
  from {
    box-shadow: 0px 0px 100px 40px #fcff30;
  }
  to {
    box-shadow: 0px 0px 500px 400px #fcff30;
  }
}
@keyframes rise {
  from {
    bottom:-600px;
    left: -300px;
  }
  to {
    bottom:-300px;
    left: -150px;
  }
}
</style>
