import keepTxt from './keep-preview/keep-txt.cmp.js'
import keepImg from './keep-preview/keep-img.cmp.js'
import backDrop from '../../../cmps/UI/back-drop.cmp.js'
import { iconsService } from '../../../services/icons-service.js'

export default {
  props: ['keeps'],
  template: ` 
        
          <section  className="keep-list" >
                <div v-for="keep in keeps" :key="keep.id" >
                <component :is= "keep.type" :info="keep.info" :contenteditable="editable"  @edit="isEditable"></component>
                <div class="keep-tools">
                  <button @click="removeKeep(keep.id)">
                      <img :src="setSvg('trash')" />
                  </button> 
                </div>
            </div>  
          
        </section>
    `,
  data() {
    return { editable: true }
  },
  methods: {
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
    removeKeep(keepId) {
      this.$emit('removed', keepId)
    },
    isEditable(ans) {
      this.editable = ans
    },
  },
  components: {
    keepTxt,
    keepImg,
  },
}
