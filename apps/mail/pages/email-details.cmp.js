import { emailService } from '../services/email-service.js'
import { emitUpdate, showErrorMsg } from '../../../services/event-bus.service.js'
import { iconsService } from '../../../services/icons-service.js'

export default {
  template: `
        <section v-if="email" class="email-details">
          <pre> {{email}} </pre>
          <router-link to="/email/inbox">Back</router-link>
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
        .catch((err) => showErrorMsg('Cannot load email'))
    },
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
    remove(emailId) {
      emailService
        .remove(emailId)
        .then(() => {
          // const idx = this.emails.findIndex((email) => email.id === emailId)
          // this.emails.splice(idx, 1)
          this.$router.push('inbox')
          showSuccessMsg(`Conversation moved to Trash`)
        })
        .catch((err) => {
          console.log('OOPS', err)
          showErrorMsg('Cannot delete massege')
        })
    },
  },
  computed: {
    emailId() {
      return this.$route.params.id
    },
  },
  watch: {
    emailId() {
      console.log('Email Id changed')
      this.loadEmail()
    },
  },
}
