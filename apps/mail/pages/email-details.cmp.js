import { emailService } from '../services/email-service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

export default {
  template: `
        <section v-if="email" class="email-details">
        <!-- <router-link :to="'/email/' + nextEmailId">Next Email</router-link> -->
        <pre> {{email}} </pre>
            <router-link to="/email">Back</router-link>
        </section>
        <h3 v-else>Loading...</h3>
    `,
  data() {
    return {
      email: null,
      // nextEmailId: null
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
          this.email = email
          // emailService.getNextEmailId(email.id)
          //     .then(nextEmailId => this.nextEmailId = nextEmailId)
        })
        .catch((err) => showErrorMsg('Cannot load email'))
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
