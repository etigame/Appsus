import emailPreview from './email-preview.cmp.js'

export default {
  props: ['emails'],
  template: `
        <router-view></router-view>
        <section v-if="isListShown" class="email-list">
            <ul class="clean-list">
                <li v-for="email in emails" :key="email.id">
                    <router-link :to="'/email/'+email.id">
                        <email-preview :email="email"/>
                    </router-link>
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
