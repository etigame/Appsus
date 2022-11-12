export default {
  name: 'keep-txt',
  props: ['keep'],
  template: `<article class="keep-txt-container" :style="keep.style">
                <h2 :contenteditable="true" @blur="getInput($event,'title')">{{keep.info.title}}</h2>
                <p :contenteditable="true" @blur="getInput($event,'txt')">{{keep.info.txt}}</p>
            </article>`,
  methods: {
    getInput({ target }, type) {
      switch (type) {
        case 'txt':
          this.keep.info.txt = target.innerText
          break
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
