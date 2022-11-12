export default {
  props: ['keep'],
  template: `<article  class="keep-img-container" :style="keep.style">
                <img :src="keep.info.url" >
                <h2  :contenteditable="true" @blur="getInput($event,'title')">{{ keep.info.title }}</h2>
            </article>`,
  methods: {
    getInput({ target }, type) {
      switch (type) {
        case 'title':
          this.keep.info.title = target.innerText
          break

        default:
          break
      }
      this.$emit('edited', this.keep)
    },
  },
}
