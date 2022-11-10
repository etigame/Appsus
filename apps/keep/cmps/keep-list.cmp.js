import keepTxt from './keep-preview/keep-txt.cmp.js'
import keepImg from './keep-preview/keep-img.cmp.js'

export default {
  props: ['keeps'],
  template: ` <section  className="keep-list" >
                <div v-for="keep in keeps" :key="keep.id" >
                <component :is= "keep.type" :info="keep.info"></component>
            </div>      
        </section>
    `,
  components: {
    keepTxt,
    keepImg,
  },
}
