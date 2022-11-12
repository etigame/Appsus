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

        <section className="email-app-aside flex-column">
            <router-link to="/email/inbox/compose">
                <button class="btn-compose flex justify-between">
                    <img :src="setSvg('compose')" alt="compose-icon" />
                    <p>Compose</p>
                </button>
            </router-link>
            <email-folder-list :unreadCount="unreadCount" />
        </section>

        <router-view v-if="emails" :emails="emailsToShow" />
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
    `,
  data() {
    return {
      emails: null,
      selectedEmail: null,
      filterBy: {
        status: 'inbox',
        keyword: '',
        isRead: '',
        isStarred: '',
        isImportant: '',
      },
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
    setFilter({keyword, isRead, status, isStarred = false, isImportant = false}) {
      this.filterBy.isStarred = isStarred
      this.filterBy.isImportant = isImportant
      if(isRead !== undefined)this.filterBy.isRead = isRead
      if(keyword !== undefined) this.filterBy.keyword = keyword
      if(status !== undefined) this.filterBy.status = status
      
      // this.filterBy = filterBy
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
      // if (!this.filterBy) return this.emails
      // don't filter until get all emails from server
      // if(!this.emails) return []
      const { keyword, isRead, status, isImportant, isStarred } = this.filterBy
      console.log(status);
      let emails = this.emails
      console.log(isStarred, isImportant)

      const regex = new RegExp(keyword, 'i')
      if(keyword){
        emails = emails.filter(
          (email) =>
            regex.test(email.from) ||
            regex.test(email.to) ||
            regex.test(email.subject) ||
            regex.test(email.body)
        )
      }
      
      if (isRead !== '') {
        emails = emails.filter((email) => email.isRead === isRead)
      }

      if(status){
        emails = emails.filter((email) => email.status === status)
      }
      
      if(isStarred){
        emails = emails.filter((email) => email.isStarred)
      }

      if(isImportant){
        emails = emails.filter((email) => email.isImportant)
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
