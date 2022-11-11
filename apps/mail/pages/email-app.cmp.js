import { emailService } from '../services/email-service.js'
import {
  eventBus,
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'
import { iconsService } from '../../../services/icons-service.js'

import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js'
import emailDetails from './email-details.cmp.js'
import emailCompose from './email-compose.cmp.js'
import emailHeader from '../cmps/email-header.cmp.js'

export default {
  name: 'email-app',
  template: `
    <section class="email-app">
        <email-header />

        <section className="email-app-main flex">
            <section className="email-app-aside flex-column">
                <router-link to="/email/inbox/compose">
                    <button class="btn-compose">
                        <img :src="setSvg('compose')" alt="compose-icon" />
                        <p>Compose</p>
                    </button>
                </router-link>

                <email-folder-list :unreadCount="unreadCount" />
            </section>
            <router-view 
            :emails="emailsToShow" 
            @removed="removeEmail"  
            @updateUnread="updateUnread"/>
                <!-- <email-list 
                @remove="removeEmail"
                :emails="emailsToShow"
                @updateUnread="updateUnread"/>

                <router-link to="/email + '/email.id' ">
                  <email-details 
                      :email="selectedEmail"
                      @close="selectedEmail = null" 
                      v-else />
                </router-link> -->
           
        </section>
    </section>
    `,
  data() {
    return {
      emails: null,
      selectedEmail: null,
      filterBy: {
        keyword: ''
      },
      listIsShown: true
    }
  },
  created() {
    eventBus.on('filter', this.setFilter)
    eventBus.on('updated', this.updateEmail)
    eventBus.on('removed', this.removeEmail)
    this.getEmails()
  },
  methods: {
    getEmails() {
      emailService.query().then((emails) => {
        this.emails = emails
      })
    },
    setFilter(filterBy) {
      if(filterBy.keyword) this.filterBy.keyword = filterBy.keyword
      // if(filterBy.isStared)
      // this.filterBy = filterBy
    },
    selectEmail(emailId) {
      emailService.get(emailId).then((email) => (this.selectedEmail = email))
    },
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
    updateEmail(email){
      emailService.save(email).then(email => {
        console.log(email);
        const emailId = email.id
        const idx = this.emails.findIndex((email) => email.id === emailId)
        this.emails.splice(idx, 1, email)
      })
    },
    sendEmail(email){
      // Sending email(adding)
    },
    // updateUnread(email) {
    //   email.isRead = true
    //   emailService.save(email).then((email) => {
    //     // this.getEmails() // one option
    //     // better option
    //     const emailId = email.id
    //     const idx = this.emails.findIndex((email) => email.id === emailId)
    //     this.emails.splice(idx, 1, email)
    //   })
    // },
    removeEmail(emailId){

    }
  },
  computed: {
    emailsToShow() {
      // if (!this.filterBy) return this.emails
      if(!this.emails) return null
      let emails = this.emails
      const { keyword } = this.filterBy
      if(keyword) {
        const regex = new RegExp(keyword, 'i')
        emails =  this.emails.filter((email) => {
          regex.test(email.from) || regex.test(email.to) || regex.test(email.subject) || regex.test(email.body)
        })
      }
      return emails
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
