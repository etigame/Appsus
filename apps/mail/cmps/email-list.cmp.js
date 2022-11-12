import emailPreview from './email-preview.cmp.js'

export default {
  name: 'emailList',
  props: ['emails'],
  emits: ['updateUnread', 'removed'],
  template: `
        <router-view/>
        <section v-if="isListShown" class="email-list">
          <section class="email-list-sort-bar flex justify-between">
            <div className="sort-from" @click="sortList">From</div>
            <div className="sort-subject" @click="sortList">Subject</div>
            <div className="sort-date" @click="sortList">Date</div>
          </section>
            <ul class="clean-list">
                <li v-for="email in emails" :key="email.id">
                    <email-preview :email="email"/>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
        isListShown: true,
    }
    },
  methods: {
    sortList() {
      console.log(123);
    }

  },
  computed: {
    emailId() {
        return this.$route.params.id
      },
  },
  watch: {
    emailId() {
        this.$route.params.id ? this.isListShown = false : this.isListShown = true        
    },
  },
  components: {
    emailPreview,
  },
}
