export default {
  template: `<section class= "keep-folder-list">
            <ul>
            <li @click="filterBy">
                All 
            </li>
            <li @click="filterBy('keep-img')">
                Images 
            </li>
            <li>
                Videos 
            </li>
            <li>
                Checklists 
            </li>
        </ul>
        </section>`,
  methods: {
    filterBy(filter) {
      this.$emit('filtered', filter)
    },
  },
}
