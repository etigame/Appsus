export default {
    props: ['unreadCount'],
  template: `
    <section class= "email-folder-list">
        <ul class="clean-list">
            <li>
              Inbox <span> {{unreadCount}} </span>
            </li>
            <li>
              Sent 
            </li>
            <li>
              Trash 
            </li>
            <li>
              Draft 
            </li>
          </ul>
    </section>`,
}
