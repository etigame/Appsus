import { emitFilter } from '../../../services/event-bus.service.js'
import { iconsService } from '../../../services/icons-service.js'

export default {
  name: 'emailFolderList',
  props: ['unreadCount'],
  template: `
    <section class= "email-folder-list">
        <ul class="clean-list">
          <router-link to="/email/inbox">
            <li @click="filter('inbox')">
            <button className="btn-inbox">
                <img :src="setSvg('inbox')" alt="inbox-icon" />
            </button>
              Inbox <span class="count-unread"> {{unreadCount}} </span>
            </li>
          </router-link>

          <router-link to="/email/inbox">
            <li @click="filter('starred')">
            <button className="btn-starred">
                <img :src="setSvg('starBefore')" alt="star-icon" />
            </button>
              Starred
            </li>
          </router-link>

          <router-link to="/email/inbox">
            <li @click="filter('important')">
            <button className="btn-important">
                <img :src="setSvg('importantBefore')" alt="important-icon" />
            </button>
              Important
            </li>
          </router-link>

          <router-link to="/email/inbox">
            <li @click="filter('sent')">
            <button className="btn-sent">
                <img :src="setSvg('sent')" alt="sent-icon" />
            </button>
              Sent 
            </li>
          </router-link>

          <router-link to="/email/inbox">
            <li @click="filter('draft')">
            <button className="btn-drafts">
                <img :src="setSvg('drafts')" alt="drafts-icon" />
            </button>
              Drafts 
            </li>
          </router-link>

          <router-link to="/email/inbox">
            <li @click="filter('trash')">
            <button className="btn-trash">
                <img :src="setSvg('trash')" alt="trash-icon" />
            </button>
              Trash 
            </li>
          </router-link>

          </ul>
    </section>
    `,
  data() {
    return {
      filterBy: {
        status:'',
        isStarred: false,
        isImportant: false,
      }
    }
  },
  methods: {
    filter(status) {
      console.log(status);
      if(status === 'starred') {
        this.filterBy.isStarred = true
      } else if(status === 'important') {
        this.filterBy.isImportant = true
      } else {
        this.filterBy.status = status
      } 
      
      console.log(this.filterBy);
      emitFilter({ ...this.filterBy })

      this.filterBy.isImportant = false
      this.filterBy.isStarred = false
      this.filterBy.status = ''
    },
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
  },
}
