<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        &copy; {{ new Date().getFullYear() }} <b>Effect Dashboard</b> by <a href="https://effect.network" target="_blank">Effect Network</a>
      </p>
    </div>
    <div class="content has-text-centered">
      <a href="https://github.com/effectai/effect-dao" target="_blank" class="has-text-grey-light"><font-awesome-icon :icon="['fab', 'github']" class="icon is-medium mx-3"/></a>
      <a href="https://t.me/EffectNetworkDAO" target="_blank" class="has-text-grey-light"><font-awesome-icon :icon="['fab', 'telegram']" class="icon is-medium mx-3"/></a>
      <a href="https://discord.gg/5QxXdmgU" target="_blank" class="has-text-grey-light"><font-awesome-icon :icon="['fab', 'discord']" class="icon is-medium mx-3"/></a>
      <a href="https://twitter.com/effectaix" target="_blank" class="has-text-grey-light"><font-awesome-icon :icon="['fab', 'twitter']" class="icon is-medium mx-3"/></a>
    </div>
  </footer>
</template>
