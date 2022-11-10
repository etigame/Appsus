import emailPreview from './email-preview.cmp.js'

export default {
  name: 'emailList',
  props: ['emails'],
  emits: ['updateUnread'],
  template: `
        <router-view></router-view>
        <section v-if="isListShown" class="email-list">
            <ul class="clean-list">
                <li v-for="email in emails" :key="email.id">
                    <email-preview :email="email" @click="updateUnread(email)"/>
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
    updateUnread(email) {
      if (!email.isRead) this.$emit('updateUnread', email)
      else return
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
