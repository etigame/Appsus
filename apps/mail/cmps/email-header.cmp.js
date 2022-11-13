import emailFilter from './email-filter.cmp.js'
import { iconsService } from '../../../services/icons-service.js'

export default {
  name: 'emailHeader',
  template: `
  
        <header class="email-header flex justify-between">
            <img src="assets/images/koogle.png" alt="logo" />
            <email-filter />
            <button>
                <span v-html="setSvg('koogleApps')"></span>
            </button>
        </header>
    `,
  methods: {
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
  },
  components: {
    emailFilter,
  },
}
