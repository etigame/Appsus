import { emailService } from '../services/email-service.js'
import { emitUpdate, emitRemove, showErrorMsg } from '../../../services/event-bus.service.js'
import { iconsService } from '../../../services/icons-service.js'

export default {
  name: 'emailDetails',
  template: `
        <section v-if="email" class="email-details">
          <section className="actions">
            <router-link to="/email/inbox">
                <button class="back-btn">
                  <img :src="setSvg('back')" alt="back-icon" />
                </button>
              </router-link>

              <button class="mark-read-btn" @click="toggleRead">
                    <img :src="email.isRead ? setSvg('closeMail') : setSvg('openMail')" alt="mark-read-icon" />
              </button>

              <button class="delete-btn" @click="remove(email.id)">
                <img :src="setSvg('trash')" alt="trash-icon" />
              </button>

              <button className="btn-star"  @click="toggleStarred">
                    <img :src="email.isStarred ? setSvg('starActive') : setSvg('starBefore')" alt="star-icon" />
                </button>

                <button className="btn-important" @click="toggleImportant">
                    <img :src="email.isImportant ? setSvg('importantActive') : setSvg('importantBefore')" alt="important-before-icon" />
                </button>
            </section>

          <section class="content">
            <h1>{{email.subject}}</h1>
            <p v-if="isInbox" class="from">{{email.from}}</p>
            <p v-if="isSent" class="to">{{email.to}}</p>
            <p>{{displaySentTime}}</p>
            <p>{{email.body}}</p>
          </section>
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
    toggleRead(){
      const email = JSON.parse(JSON.stringify(this.email)) // create clone to property
      email.isRead = !email.isRead
      emitUpdate(email)
      // this.$emit('updated', email) - also option
    },
    toggleStarred() {
      const email = JSON.parse(JSON.stringify(this.email))
      email.isStarred = !email.isStarred
      emitUpdate(email)
    },
    toggleImportant() {
      const email = JSON.parse(JSON.stringify(this.email))
      email.isImportant = !email.isImportant
      emitUpdate(email)
    },
    isInbox() {
      return this.email.status ==='inbox' ? true : false
    },
    isSent() {
      return this.email.status ==='sent' ? true : false
    }

  },
  computed: {
    emailId() {
      return this.$route.params.id
    },
    displaySentTime() {
      const sentTime = new Date(this.email.sentAt).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })
      return sentTime
    },
  },
  watch: {
    emailId() {
      if (!this.emailId) return
      this.loadEmail()
    },
  },
}
