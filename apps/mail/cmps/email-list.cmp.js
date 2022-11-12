import emailPreview from './email-preview.cmp.js'
import { eventBus, emitSort } from '../../../services/event-bus.service.js';

export default {
  name: 'emailList',
  props: ['emails'],
  emits: ['updateUnread', 'removed'],
  template: `
        <router-view/>
        <section v-if="isListShown" class="email-list">
          <section class="email-list-sort-bar flex justify-between">
            <div className="sort-from" @click="sortList('from')">From</div>
            <div className="sort-subject" @click="sortList('subject')">Subject</div>
            <div className="sort-date" @click="sortList('sentAt')">Date</div>
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
    sortList(sortBy) {
      emitSort(sortBy)
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
