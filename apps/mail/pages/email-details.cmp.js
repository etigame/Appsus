import { emailService } from '../services/email-service.js'
import { emitUpdate, emitRemove, showErrorMsg } from '../../../services/event-bus.service.js'
import { iconsService } from '../../../services/icons-service.js'

export default {
  name: 'emailDetails',
  template: `
        <section v-if="email" class="email-details">
          <pre> {{email}} </pre>
          <router-link to="/email/inbox">
            <button class="back-btn">
              <img :src="setSvg('back')" alt="back-icon" />
            </button>
          </router-link>
          <button class="delete-btn" @click="remove(email.id)">
            <img :src="setSvg('trash')" alt="trash-icon" />
          </button>
        </section>
        <h3 v-else>Loading...</h3>
    `,
  data() {
    return {
      email: null,
    }
  },
  created() {
    this.loadEmail()
  },
  methods: {
    loadEmail() {
      emailService
        .get(this.emailId)
        .then((email) => {
          email.isRead = true
          this.email = email
          emitUpdate(email)
        })
        // .catch((err) => showErrorMsg('Cannot load email' + err))
    },
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
    remove(emailId) {
      emitRemove(emailId)
      this.$router.push('inbox')
    },
  },
  computed: {
    emailId() {
      return this.$route.params.id
    },
  },
  watch: {
    emailId() {
      if (!this.emailId) return
      this.loadEmail()
    },
  },
}
