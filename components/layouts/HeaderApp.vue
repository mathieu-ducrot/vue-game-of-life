<template>
  <nav class="navbar is-primary">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link to="/" class="navbar-item">
          <fa-icon class="fa-2x" :icon="faTh" />
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
              <fa-icon :icon="link.icon" />
            </span>
            <span>{{ link.label }}</span>
          </nuxt-link>
          <a
            class="navbar-item"
            href="https://github.com/mathieu-ducrot/game-of-life"
            target="_blank"
            rel="noopener"
          >
            <span class="icon">
              <fa-icon :icon="faGithub" />
            </span>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {
  faTh,
  faHome,
  faChessBoard,
  faBook
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default {
  name: 'HeaderApp',
  data() {
    return {
      appLinks: [
        {
          label: 'Home',
          icon: faHome,
          to: 'index'
        },
        {
          label: 'The Game',
          icon: faChessBoard,
          to: 'game'
        },
        {
          label: 'Rules',
          icon: faBook,
          to: 'rules'
        }
      ]
    }
  },
  computed: {
    faTh() {
      return faTh
    },
    faGithub() {
      return faGithub
    }
  }
}
</script>
