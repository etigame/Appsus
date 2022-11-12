export default {
  name: 'emailFolderList',
  props: ['unreadCount'],
  template: `
    <section class= "email-folder-list">
        <ul class="clean-list">
            <li>
              Inbox <span> {{unreadCount}} </span>
            </li>
            <li>
              Starred
            </li>
            <li>
              Important
            </li>
            <li>
              Sent 
            </li>
            <li>
              Drafts 
            </li>
            <li>
              Trash 
            </li>
          </ul>
    </section>`,
}
