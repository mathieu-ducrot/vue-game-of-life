<template>
  <nav class="navbar is-primary">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link to="/" class="navbar-item">
          <i class="fas fa-th fa-2x" />
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
              <i :class="link.icon"></i>
            </span>
            <span>{{ link.label }}</span>
          </nuxt-link>
          <a
            class="navbar-item"
            href="https://github.com/mathieu-ducrot/game-of-life"
            target="_blank"
          >
            <span class="icon">
              <i class="fab fa-github"></i>
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
          icon: 'fas fa-home',
          to: 'index'
        },
        {
          label: 'The Game',
          icon: 'fas fa-chess-board',
          to: 'game'
        },
        {
          label: 'Rules',
          icon: 'fas fa-book',
          to: 'rules'
        }
      ]
    }
  }
}
</script>
