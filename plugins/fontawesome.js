// https://github.com/FortAwesome/vue-fontawesome#nuxtjs
import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHome,
  faChessBoard,
  faBook,
  faTh,
  faQuestion,
  faPlay,
  faEdit,
  faStepForward,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faDice,
  faTrashAlt,
  faExclamation
} from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faStopCircle } from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
  faHome,
  faChessBoard,
  faBook,
  faTh,
  faQuestion,
  faPlay,
  faEdit,
  faStepForward,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faDice,
  faTrashAlt,
  faExclamation,
  faPlayCircle,
  faStopCircle,
  faGithub
)

// Register the component globally
Vue.component('fa-icon', FontAwesomeIcon)
