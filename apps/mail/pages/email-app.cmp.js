import { emailService } from '../services/email-service.js'
import { eventBus, showErrorMsg, showSuccessMsg, } from '../../../services/event-bus.service.js'
import { iconsService } from '../../../services/icons-service.js'

import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js'
import emailDetails from './email-details.cmp.js'
import emailCompose from './email-compose.cmp.js'
import emailHeader from '../cmps/email-header.cmp.js'

export default {
  template: `
    <section class="email-app">
        <email-header />
        <section className="email-app-main flex">
            <section className="email-app-aside flex-column">
                <router-link to="/email/compose">
                    <button class="btn-compose">
                        <img :src="setSvg('compose')" alt="compose-icon" />
                        <p>Compose</p>
                    </button>
                </router-link>
                <email-folder-list :unreadCount="unreadCount" />
            </section>
            <email-list 
                :emails="emailsToShow"
                @updateUnread="updateUnread"/>
            <email-details 
                :email="selectedEmail"
                @close="selectedEmail = null" 
                v-if="selectedEmail" />
            </section>
    </section>
    `,
  data() {
    return {
      emails: null,
      selectedEmail: null,
      filterBy: null
    }
  },
  created() {
    eventBus.on('filter', this.filter)
    this.getEmails()
  },
  methods: {
    getEmails() {
      emailService.query().then((emails) => {
        this.emails = emails
      })
    },
    filter(keyword) {
      console.log(keyword)
    },
    selectEmail(emailId) {
      emailService.get(emailId).then((email) => (this.selectedEmail = email))
    },
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
    updateUnread(email) {
      email.isRead = true
      emailService.save(email).then(() => {
        // this.getEmails() // one option
        // better option
        const emailId = email.id
        const idx = this.emails.findIndex(email => email.id === emailId)
        this.emails.splice(idx, 1, email)
      })
    },
    removeEmail() {
        console.log('removeEmail');
    },
  },
  computed: {
    emailsToShow() {
        // const regex = new RegExp(this.filterBy, 'i')
        // var emails = this.emails.filter(email => regex.test(email.filterBy))
        return this.emails
    },
    unreadCount() {
      if (!this.emails) return ''
      return this.emails.filter((email) => email.isRead === false).length
    },
  },
  components: {
    emailFilter,
    emailList,
    emailFolderList,
    emailDetails,
    emailCompose,
    emailHeader,
  },
}
