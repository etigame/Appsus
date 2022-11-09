import keepPreview from './keep-preview.cmp.js'

export default {
  props: ['keeps'],
  template: ` <section className="keep-list">
              <ul>
                <li v-for="keep in keeps">
                  <component :is= "keep.type" :info="keep.info"></component>
                
                </li>
              </ul>
    </section>
    `,
  components: {
    keepPreview,
  },
}
