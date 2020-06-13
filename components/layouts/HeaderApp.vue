<template>
  <nav class="navbar is-primary">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link to="/" class="navbar-item">
          <fa-icon class="fa-2x" :icon="['fas', 'th']"></fa-icon>
        </nuxt-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <nuxt-link
            v-for="(link, index) in appLinks"
            :key="index"
            class="navbar-item"
            :class="link.to === $nuxt.$route.name ? 'is-active' : ''"
            :to="{ name: link.to }"
          >
            <span class="icon">
              <fa-icon :icon="link.icon"></fa-icon>
            </span>
            <span>{{ link.label }}</span>
          </nuxt-link>
          <a
            class="navbar-item"
            href="https://github.com/mathieu-ducrot/vue-game-of-life"
            target="_blank"
            rel="noopener"
          >
            <span class="icon">
              <fa-icon :icon="['fab', 'github']"></fa-icon>
            </span>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderApp',
  data() {
    return {
      appLinks: [
        {
          label: 'Home',
          icon: ['fas', 'home'],
          to: 'index'
        },
        {
          label: 'The Game',
          icon: ['fas', 'chess-board'],
          to: 'game'
        },
        {
          label: 'Rules',
          icon: ['fas', 'book'],
          to: 'rules'
        }
      ]
    }
  }
}
</script>
