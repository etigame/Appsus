import emailFilter from './email-filter.cmp.js'
import { iconsService } from '../../../services/icons-service.js'

export default {
  name: 'emailHeader',
  template: `
  
        <header class="email-header flex justify-between">
            <img src="assets/images/koogle.png" alt="logo" />
            <email-filter />
            <section class="route-btns">
                <router-link to="/email/inbox">
                    <button class="email-btn">
                      <img :src="setSvg('gmailImg')" alt="email-icon" />
                    </button>
                </router-link>
                <router-link to="/keep">
                    <button class="keep-btn">
                      <img :src="setSvg('keepImg')" alt="keep-icon" />
                    </button>
                </router-link>
            </section>
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
