import { keepService } from '../services/keep-service.js'
import keepList from '../cmps/keep-list.cmp.js'
import keepFolderList from '../cmps/keep-folder-list.cmp.js'

export default {
  template: ` <section className="keep-app">
      <keep-folder-list />
  <keep-list :keeps= "this.keeps"  />

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

  components: {
    keepList,
    keepFolderList,
  },
}
