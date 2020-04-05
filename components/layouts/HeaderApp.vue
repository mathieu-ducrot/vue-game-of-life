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
            v-for="(link, index) in links"
            :key="index"
            class="navbar-item"
            :class="link.to === $nuxt.$route.name ? 'is-active' : ''"
            :to="{ name: link.to }"
          >
            {{ link.label }}
          </nuxt-link>
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
      links: [
        {
          label: 'Home',
          to: 'index'
        },
        {
          label: 'The Game',
          to: 'game'
        },
        {
          label: 'Rules',
          to: 'rules'
        }
      ]
    }
  }
}
</script>
