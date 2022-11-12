import { emitUpdate } from '../../../services/event-bus.service.js'
import { iconsService } from '../../../services/icons-service.js'
import { eventBus, emitRemove } from '../../../services/event-bus.service.js'


export default {
  name: 'emailPreview',
  props: ['email'],
  template: `
        <article class="email-preview flex align-center" :class="previewStyle">
            <button className="btn-star"  @click="toggleStarred">
                <img :src="email.isStarred ? setSvg('starActive') : setSvg('starBefore')" alt="star-icon" />
            </button>
            <button className="btn-important" @click="toggleImportant">
                <img :src="email.isImportant ? setSvg('importantActive') : setSvg('importantBefore')" alt="important-before-icon" />
            </button>
            <router-link :to="'/email/'+email.id" class="flex">   
                <p className="from">{{ email.from }}</p>
                <p className="subject">{{ email.subject}}</p>
                <p className="sent-time">{{ displaySentTime }}</p>
            </router-link>
            <section class="actions clean-list flex justify-center align-center">
              <button class="delete-btn" @click="remove(email.id)">
                <img :src="setSvg('trash')" alt="trash-icon" />
              </button>
              <button class="mark-read-btn" @click="toggleRead">
                <img :src="email.isRead ? setSvg('closeMail') : setSvg('openMail')" alt="mark-read-icon" />
              </button>
              <!-- <button class="mark-unread-btn" v-if="email.isRead">
                <img :src="setSvg('closeMail')" alt="mark-unread-icon" />
              </button> -->
            </section>
        </article>
    `,
   
  methods: {
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
    remove(emailId) {
      emitRemove(emailId)
      // this.$emit('remove', emailId)
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
    }
  },
  computed: {
    displaySentTime() {
      const sentTime = new Date(this.email.sentAt).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })
      return sentTime
    },
    previewStyle() {
      return { read: this.email.isRead, unread: !this.email.isRead }
    },
  },
}
