import { keepService } from '../services/keep-service.js'
import keepList from '../cmps/keep-list.cmp.js'
import keepFolderList from '../cmps/keep-folder-list.cmp.js'
import keepAdd from '../cmps/keep-add.cmp.js'

export default {
  template: ` <section className="keep-app" >
   
    <keep-add @saved="addKeep"/>
    <div class= "keep-lists-container">
      <keep-folder-list />
      <keep-list @removed="removeKeep"  :keeps= "this.keeps"  />
</div>

</section>
`,
  data() {
    return {
      keeps: null,
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
  },

  components: {
    keepList,
    keepFolderList,
    keepAdd,
  },
}
