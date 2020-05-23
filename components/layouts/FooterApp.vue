<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <span><strong>Build with</strong></span>
        <span v-for="(dep, index) in dependencies" :key="index">
          <a :href="dep.link" target="_blank" rel="noopener">
            <figure class="image is-32x32">
              <img
                :src="require('assets/images/logo/' + dep.logo)"
                :alt="dep.alt"
              />
            </figure>
          </a>
        </span>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <a
          class="button is-link"
          href="https://github.com/mathieu-ducrot/game-of-life"
          target="_blank"
          rel="noopener"
        >
          <span class="icon">
            <fa-icon class="fa-lg" :icon="['fab', 'github']"></fa-icon>
          </span>
          <span>mathieu-ducrot</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterApp',
  data() {
    return {
      dependencies: [
        {
          link: 'https://vuejs.org/',
          logo: 'vue.png',
          alt: 'Vue.js Logo'
        },
        {
          link: 'https://fr.nuxtjs.org/',
          logo: 'nuxt.svg',
          alt: 'Nuxt.js Logo'
        },
        {
          link: 'https://bulma.io/',
          logo: 'bulma.png',
          alt: 'Bulma Logo'
        }
      ]
    }
  }
}
</script>
