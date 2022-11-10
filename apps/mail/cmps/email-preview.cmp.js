import { iconsService } from '../../../services/icons-service.js'

export default {
  props: ['email'],
  template: `
        <article class="email-preview flex align-center" :class="previewStyle">
            <button className="btn-star">
                <img :src="setSvg('starBefore')" alt="star-icon" />
            </button>
            <button className="btn-important">
                <img :src="setSvg('importantBefore')" alt="important-before-icon" />
            </button>
            <router-link :to="'/email/'+email.id" class="flex">   
                <p className="from">{{ email.from }}</p>
                <p className="subject">{{ email.subject}}</p>
                <p className="sent-time">{{ displaySentTime }}</p>
            </router-link>
        </article>
    `,
  methods: {
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
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
