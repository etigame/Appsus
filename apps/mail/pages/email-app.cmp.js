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
  name: 'emailApp',
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
            <router-view v-if="emailsToShow" :emails="emailsToShow" />
              <!-- the router view contains: email-list or email-details  -->
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
      filterBy: null,
      listIsShown: true,
      sortDirection: 1,
    }
  },
  created() {
    eventBus.on('filtered', this.setFilter)
    eventBus.on('updated', this.updateEmail)
    eventBus.on('sent', this.sendEmail)
    eventBus.on('removed', this.removeEmail)
    eventBus.on('sorted', this.setEmailsSort)
    this.getEmails()
  },
  methods: {
    getEmails() {
      emailService.query().then((emails) => {
        this.emails = emails
      })
    },
    setFilter(filterBy) {
      // console.log(filterBy);
      // this model of "if"s allows to get different filters together (this and also this)

      // filterBy={
      //   keyword:'s',
      //   isRead:true,

      // }
      // this.filter={...filterBy}
      this.filterBy = filterBy
      // if(filterBy.keyword) this.filterBy ={...this.filterBy, filterBy}

      // if(filterBy.isStared)
    },
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
    updateEmail(email) {
      // update for change unread, sent email, stared etc..
      emailService.save(email).then((email) => {
        const emailId = email.id
        const idx = this.emails.findIndex((email) => email.id === emailId)
        this.emails.splice(idx, 1, email)
      })
    },
    sendEmail(email) {
      this.emails.unshift(email)
    },
    removeEmail(emailId) {
      emailService
        .remove(emailId)
        .then(() => {
          const idx = this.emails.findIndex((email) => email.id === emailId)
          this.emails.splice(idx, 1)
          showSuccessMsg(`Conversation moved to Trash`)
        })
        .catch((err) => {
          console.log('OOPS', err)
          showErrorMsg('Cannot delete massege')
        })
    },
    setEmailsSort(sortBy) {
      if (sortBy === 'from') this.emails.sort((e1, e2) => e1.from.localeCompare(e2.from) * this.sortDirection)
      if (sortBy === 'subject') this.emails.sort((e1, e2) => e1.subject.localeCompare(e2.subject) * this.sortDirection)
      if (sortBy === 'sentAt') this.emails.sort((e1, e2) => e1.sentAt - e2.sentAt)
    },
  },
  computed: {
    emailsToShow() {
      // - won't happen ever because filterBy exists
      if (!this.filterBy) return this.emails
      // don't filter until get all emails from server
      const { keyword, isRead } = this.filterBy

      console.log(this.filterBy)

      const regex = new RegExp(keyword, 'i')
      let emails = this.emails.filter(
        (email) =>
          regex.test(email.from) ||
          regex.test(email.to) ||
          regex.test(email.subject) ||
          regex.test(email.body)
      )
      if (isRead !== '') {
        emails = emails.filter((email) => email.isRead === isRead)
      }
      return emails

      // if(keyword) {
      //   const regex = new RegExp(keyword, 'i')
      //   this.emails= this.emails = this.emails.filter((email) => {
      //     regex.test(email.from) || regex.test(email.to) || regex.test(email.subject) || regex.test(email.body)
      //   })
      // }
      // if(unread){} etc..
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
