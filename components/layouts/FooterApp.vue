<template>
  <div class="level">
    <div class="level-left">
      <p class="level-item"><strong>Build with</strong></p>
      <div v-for="(dep, index) in dependencies" :key="index" class="level-item">
        <a :href="dep.link" target="_blank">
          <figure class="image is-32x32">
            <img :src="require('assets/images/logo/' + dep.logo)" />
          </figure>
        </a>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <a
          class="button is-primary"
          href="https://github.com/mathieu-ducrot/game-of-life"
          target="_blank"
        >
          <span class="icon">
            <i class="fab fa-github fa-lg"></i>
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
          logo: 'vue.png'
        },
        {
          link: 'https://fr.nuxtjs.org/',
          logo: 'nuxt.svg'
        },
        {
          link: 'https://bulma.io/',
          logo: 'bulma.png'
        }
      ]
    }
  }
}
</script>

<style>
.level {
  padding: 0 30px 20px 30px;
}
</style>
