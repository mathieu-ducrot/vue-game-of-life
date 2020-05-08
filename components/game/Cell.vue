<template>
  <div
    class="cell"
    :style="isAlive ? 'background-color: ' + aliveColor + ';' : ''"
  >
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'GridCell',
  props: {
    xPosition: {
      type: Number,
      required: true
    },
    yPosition: {
      type: Number,
      required: true
    },
    aliveColor: {
      type: String,
      required: true
    },
    isAlive: {
      type: Number,
      required: true
    }
  },
  methods: {}
}
</script>

<style scoped>
.cell {
  display: block;
  padding-bottom: calc(100% - 2px);
  border-right: 2px dashed #959595;
  border-bottom: 2px dashed #959595;
  cursor: pointer;
  position: relative;
}
.cell:hover > .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
  z-index: 100;
  display: block;
}
</style>
