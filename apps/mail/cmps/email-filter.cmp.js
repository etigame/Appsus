import { eventBus, emitFilter } from '../../../services/event-bus.service.js'
import { iconsService } from '../../../services/icons-service.js'

export default {
  name: 'emailFilter',
  template: `
    <section className="email-filter">
        <!-- <div className="sprite"></div>
        <div className="sprite2"></div> -->
            <span v-html="setSvg('search')"></span>
            <input 
            type="search"  
            @input="filter" 
            v-model="filterBy.keyword" 
            ref="filter"
            placeholder="Search mail" />
            <select v-model="filterBy.isRead" @change="filter" placeholder="All">
              <option value="">All</option>
              <option :value="true">Read</option>
              <option :value="false">Unread</option>
            </select>
    </section>
    `,
    data() {
      return {
        filterBy: {
          keyword: '',
          isRead: ''
        }
      }
    },
  mounted() {
    this.$refs.filter.focus()
  },
  methods: {
    filter() {
      emitFilter({...this.filterBy})
    },
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
  },
  // watch: {
  //   filterBy:{
  //       handler(){
  //           console.log('Something changed')
  //       },
  //       deep: true
  //   }

}
