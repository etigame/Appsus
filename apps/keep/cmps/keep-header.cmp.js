import { iconsService } from '../../../services/icons-service.js'
export default {
  name: 'keep-header',
  props: ['keeps'],
  template: `<header class="keep-header full">
    <router-link to="/">
      <img src="assets/images/koogle.png" width="250" style="margin-top: 10px"/>
    </router-link>
    <input v-model="keywords" @input="getKeywords"  placeholder="Search note..." type="text">
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

                </header>`,
  data() {
    return {
      keywords: null,
    }
  },
  methods: {
    getKeywords() {
      this.$emit('getKeywords', this.keywords)
    },
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
  },
}
