import { keepService } from '../services/keep-service.js'
import keepHeader from '../../keep/cmps/keep-header.cmp.js'
import keepList from '../cmps/keep-list.cmp.js'
import keepFolderList from '../cmps/keep-folder-list.cmp.js'
import keepAdd from '../cmps/keep-add.cmp.js'

export default {
  name: 'keep-app',
  template: ` 
  <section className="keep-layout" >
   <keep-header @getKeywords="searchKeywords"  />
   <div class= "keep-lists-container">
      <keep-add @saved="addKeep"/>
      <keep-folder-list @filtered="filter" />
      <keep-list  childClass="keep-list"  @removed="removeKeep" @updated="updateKeep" @colorChanged="changeKeepColor" :keeps= "keepsToDisplay"  />
    </div>
 </section>
 `,
  data() {
    return {
      keeps: null,
      filterBy: { keywords: '', type: null },
    }
  },
  created() {
    keepService.query().then((keeps) => {
      this.keeps = keeps
    })
  },
  methods: {
    addKeep(info) {
      const keep = keepService.getEmptyKeep()
      keep.info = info
      keepService.save(keep).then((keep) => this.keeps.unshift(keep))
    },
    removeKeep(keepId) {
      const idx = this.keeps.findIndex((keep) => keep.id === keepId)
      keepService.remove(keepId).then(() => this.keeps.splice(idx, 1))
    },
    updateKeep(keep) {
      const keepId = keep.id
      const keepIdx = this.keeps.findIndex((keep) => keep.id === keepId)
      keepService.save(keep).then((keep) => this.keeps.splice(keepIdx, 1, keep))
    },
    changeKeepColor(color, keepId) {
      const keepIdx = this.keeps.findIndex((keep) => keep.id === keepId)
      this.keeps[keepIdx].style.backgroundColor = color
      keepService
        .save(this.keeps[keepIdx])
        .then((keep) => this.keeps.splice(keepIdx, 1, keep))
    },
    searchKeywords(keywords) {
      this.filterBy.keywords = keywords
    },

    filter(type) {
      this.filterBy.type = type
    },
  },
  computed: {
    keepsToDisplay() {
      let keeps = this.keeps
      if (!this.filterBy.keywords) return keeps
      const regex = new RegExp(this.filterBy.keywords, 'i')
      let filteredKeeps = keeps.filter(
        (keep) => regex.test(keep.info.title) || regex.test(keep.info.txt)
      )
      if (!filteredKeeps) return keeps
      if (!this.filterBy.type) return filteredKeeps
      filteredKeeps = filteredKeeps.filter(
        (keep) => keep.type === this.filterBy.type
      )

      return filteredKeeps
    },
  },
  components: {
    keepHeader,
    keepList,
    keepFolderList,
    keepAdd,
  },
}
