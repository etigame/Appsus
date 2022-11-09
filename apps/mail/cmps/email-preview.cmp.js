export default {
  props: ['email'],
  template: `
        <article class="email-preview flex" :class="fontStyle">
            <button className="btn-star">star</button>
            <button className="btn-important">important</button>
            <p className="from">{{ email.from }}</p>
            <p className="subject">{{ email.subject}}</p>
            <p className="sent-time">{{ displaySentTime }}</p>
        </article>
    `,
  computed: {
    displaySentTime() {
      const sentTime = new Date(this.email.sentAt).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })
      return sentTime
    },
    fontStyle() {
      // return this.email.isRead ? 'read' : 'unread'
      return { read: this.email.isRead, unread: !this.email.isRead }
    },
  },
}
