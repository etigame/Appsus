import { eventBus } from '../../../services/event-bus.service.js'
import { iconsService } from '../../../services/icons-service.js'

export default {
  template: `
    <section className="email-filter">
            <img src="setSvg('search')" alt="search-icon" />
            <input 
            type="search"  
            @input="filter" 
            v-model="keyword" 
            ref="filter"
            placeholder="Search mail" />
    </section>
    `,
  mounted() {
    this.$refs.filter.focus()
  },
  methods: {
    filter() {
      eventBus.emit('filter', this.keyword)
    },
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
  },
}
