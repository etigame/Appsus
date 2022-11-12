export default {
  name: 'emailFolderList',
  props: ['unreadCount'],
  template: `
    <section class= "email-folder-list">
        <ul class="clean-list">
            <li @click="filter(filterBy.isInbox(true))">
              Inbox <span> {{unreadCount}} </span>
            </li>
            <li @click="filter(filterBy.isStarred(true))">
              Starred
            </li>
            <li @click="filter(filterBy.isImportant(true))">
              Important
            </li>
            <li @click="filter(filterBy.isInbox(false))">
              Sent 
            </li>
            <li @click="filter(filterBy.isDraft(true))">
              Drafts 
            </li>
            <li @click="filter(filterBy.isTrash(true))">
              Trash 
            </li>
          </ul>
    </section>
    `,
  data() {
    return {
      filterBy: {
        isInbox: '',
        isStarred: '',
        isImportant: '',
        isDraft: '',
        isTrash: '',
      },
    }
  },
  methods: {
    filter() {
      emitFilter({ ...this.filterBy })
    },
  },
}
