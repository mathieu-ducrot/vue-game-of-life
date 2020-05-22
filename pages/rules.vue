<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="content">
          <h1 class="title">Game of Life's Rules</h1>
          <h2>Description</h2>
          <p itemscope itemtype="http://schema.org/CreativeWork">
            The
            <a
              href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
              target="_blank"
              rel="noopener"
              class="has-text-primary"
            >
              <span itemprop="name">Game of Life</span>
            </a>
            is a <strong>cellular automaton</strong> created by
            <a
              href="https://en.wikipedia.org/wiki/John_Horton_Conway"
              target="_blank"
              rel="noopener"
              class="has-text-primary"
              itemprop="creator"
              itemscope
              itemtype="https://schema.org/Person"
            >
              <span itemprop="givenName">John Horton</span>
              <span itemprop="familyName">Conway</span>
            </a>
            in <span itemprop="dateCreated">1970</span>. <br />
            This simulation, which is not really a game, allows you to see the
            evolution of the state of several cells (dead or alive) according to
            a set of simple rules.
          </p>
          <p>
            The cells, represented by squares, are arranged on a
            <b>2-dimensional grid</b> of theoretically infinite size. <br />
            A <b>dead cell</b> is represented by a white square, in contrast a
            <b>living cell</b> is represented by a colored square.
          </p>
          <div class="box is-radiusless demo-grid is-marginless">
            <game-grid
              :cells-per-row="cellsPerRow"
              :cells-per-column="cellsPerColumn"
            ></game-grid>
          </div>
          <p>
            <i>
              Example of a grid with 8 deads cell and 1 living cell in the
              center.
            </i>
          </p>
          <p>
            The only interaction of the "player", or the user, is to define the
            <b>starting state of the grid</b>.<br />
            <b
              >The simulation evolves by itself by applying the evolution
              rules</b
            >
            to each grid cell, while the player observes its evolution.
          </p>
          <h2>Rules</h2>
          <p>
            The rules of the <strong>Game of Life</strong> define in what state
            will be a cell in the next round. <br />
            They are all based from analysising the state of her
            <b>8 cells neightbors</b><br />
            The rules applied are:
          </p>
          <ol>
            <li>
              A living cell with 2 or 3 neighbors remains alive. Represents a
              <b>stable state of life</b>
            </li>
            <li>
              A living cell with less than 2 neighbors or more than 3 neighbors
              dies. Represents cell
              <b>death by subpopulation or overcrowding</b>
            </li>
            <li>
              A dead cell with exactly 3 neighbors becomes alive. Represents the
              <b>birth</b> of a cell
            </li>
            <li>
              In all other cases a dead cell remains dead. Represents a
              <b>stable state of death</b>
            </li>
          </ol>
          <p>
            The moment when all the rules are applied to each cell, or when the
            whole state of the grid changes visually, is called a <b>tick</b>.
          </p>
          <h2>Video</h2>
          <p>
            Here are some videos to learn more about the subject.
          </p>
        </div>
        <div class="columns">
          <div class="column">
            <figure class="image is-16by9">
              <iframe
                class="has-ratio"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/S-W0NX97DB0?hl=en&amp;cc_lang_pref=en&amp;cc_load_policy=1"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </figure>
            <div class="has-text-centered">
              <i>
                A really good explaination from the french Youtube channel
                ScienceEtonnante.
              </i>
            </div>
          </div>
          <div class="column has-text-centered">
            <figure class="image is-16by9">
              <iframe
                class="has-ratio"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/E8kUJL04ELA?hl=en&amp;cc_lang_pref=en&amp;cc_load_policy=1"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </figure>
            <div class="has-text-centered">
              <i>
                Some words by the man itself and what he thinks about it.
              </i>
            </div>
          </div>
        </div>
        <hr />
        <nuxt-link class="button is-primary" :to="{ name: 'game' }">
          <span>Try it</span>
          <span class="icon">
            <fa-icon :icon="faExclamation" />
          </span>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import GameGrid from '@/components/game/GameGrid'

export default {
  name: 'RulesPage',
  components: {
    GameGrid
  },
  data() {
    return {
      cellsPerRow: 3,
      cellsPerColumn: 3
    }
  },
  computed: {
    faExclamation() {
      return faExclamation
    }
  },
  mounted() {
    this.$store.dispatch('cells-grid/toggleCellState', {
      x: 1,
      y: 1
    })
  },
  head() {
    return {
      title: 'Rules',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'The goal of the Game of Life is to watch how cells, represented by squares on a grid, evolve. The rules are center about the state of their neighbors.'
        }
      ]
    }
  }
}
</script>
