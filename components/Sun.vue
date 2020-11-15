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
  animation: rise 60s forwards ease-out;
  width: 800px;
  height: 800px;
  opacity: 0.04;
  position: fixed;
  bottom: -800px;
  left: -500px;
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
    animation: glow 45s infinite alternate ease-out;
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
    bottom:-800px;
    left: -500px;
  }
  to {
    bottom:-300px;
    left: -200px;
  }
}
</style>
