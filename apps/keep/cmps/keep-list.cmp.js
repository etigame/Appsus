import keepPreview from './keep-preview.cmp.js'

export default {
  props: ['keeps'],
  template: ` <section className="keep-list">
              <ul>
                <li v-for="keep in keeps" :key="keep.id" >
                <keep-preview :keep="keep"/>
                </li>
              </ul>
    </section>
    `,
  components: {
    keepPreview,
  },
}
