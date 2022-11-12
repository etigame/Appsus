export default {
  template: `<section class="keep-add full" > 
      <h2 class="title"  @blur="getInput($event,'title')" :contenteditable="true">Title</h2>
      <p class="txt" @blur="getInput($event,'txt')" :contenteditable="true">take a note...</p>
      <button @click="saveKeep" >Save Note</button>
</section>
`,
  data() {
    return {
      info: { title: 'title', txt: 'take a note...' },
    }
  },
  methods: {
    saveKeep() {
      this.$emit('saved', this.info)
    },
    getInput({ target }, type) {
      switch (type) {
        case 'txt':
          this.info.txt = target.innerText
          break
        case 'title':
          this.info.title = target.innerText
          break

        default:
          break
      }
    },
  },
}
