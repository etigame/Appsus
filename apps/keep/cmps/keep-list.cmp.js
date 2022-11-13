import keepTxt from './keep-preview/keep-txt.cmp.js'
import keepImg from './keep-preview/keep-img.cmp.js'
import { iconsService } from '../../../services/icons-service.js'
import keepColorPalette from './keep-color-palette.cmp.js'

export default {
  name: 'keep-list',
  props: ['keeps', 'childClass'],
  // emits: ['removed', 'updated', 'colorChanged'],
  template: ` 
        
          <section :className="childClass">
                <div v-for="keep in keeps" :key="keep.id" >
                <component :is= "keep.type" :keep="keep"  @edited="updateKeep"></component>
                <div class="keep-tools">
                  <button @click="removeKeep(keep.id)">
                      <img :src="setSvg('trash')" />
                  </button> 
                  <keep-color-palette @color="changeKeepColor($event,keep.id)" />
                  <button>✉
                    
                  </button>
                </div>
            </div>  
          
        </section>
    `,
  methods: {
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
    removeKeep(keepId) {
      this.$emit('removed', keepId)
    },
    updateKeep(keep) {
      this.$emit('updated', keep)
    },
    changeKeepColor(color, keepId) {
      this.$emit('colorChanged', color, keepId)
    },
    pinKeep(keepId) {
      this.$emit('pinned', keepId)
    },
  },

  components: {
    keepTxt,
    keepImg,
    keepColorPalette,
  },
}
