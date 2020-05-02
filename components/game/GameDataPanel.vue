<template>
  <div class="level is-mobile has-background-white">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Cells</p>
        <p class="is-size-4">{{ getNbCells }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Living cells</p>
        <p class="is-size-4">{{ getNbLivingCells }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Birth</p>
        <p class="is-size-4">{{ getNbCellBirth }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Death</p>
        <p class="is-size-4">{{ getNbCellDeath }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Tick</p>
        <p class="is-size-4">{{ getTick }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GameDataPanel',
  computed: {
    ...mapGetters('cells-grid', [
      'getNbCells',
      'getNbLivingCells',
      'getNbCellBirth',
      'getNbCellDeath',
      'getTick'
    ])
  }
}
</script>

<style scoped>
.level {
  padding-top: 0.5rem;
  padding-bottom: 0;
}
.heading {
  margin-bottom: 0;
}
</style>
