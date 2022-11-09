import { keepService } from '../services/keep-service.js'
import keepList from '../cmps/keep-list.cmp.js'

export default {
  template: ` <section className="keep-app">
  <h1>keep app</h1>
  <keep-list :keeps= "this.keeps" />
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
  },
}
