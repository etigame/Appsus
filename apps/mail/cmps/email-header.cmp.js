import emailFilter from './email-filter.cmp.js'
import { iconsService } from '../../../services/icons-service.js'

export default {
  template: `
        <header class="email-header flex justify-between">
            <h1 id="check">Logo</h1>
            <email-filter />
            <button>
                <span v-html="setSvg('koogleApps')"></span>
            </button>
        </header>
    `,
    mounted() {
      console.log(document.querySelector('#check'))
    },
  methods: {
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
  },
  components: {
    emailFilter,
  },
}
