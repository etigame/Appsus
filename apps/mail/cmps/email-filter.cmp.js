import { eventBus } from '../../../services/event-bus.service.js'
import { iconsService } from '../../../services/icons-service.js'

export default {
  template: `
    <section className="email-filter">
        <div className="sprite"></div>
        <div className="sprite2"></div>
            <span v-html="setSvg('search')"></span>
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
