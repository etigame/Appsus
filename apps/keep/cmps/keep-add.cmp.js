export default {
  template: `<section class="keep-add" > 
      <h2 class="title"  @blur="getInput($event,'title')" :contenteditable="true">note title</h2>
      <p class="txt" @blur="getInput($event,'txt')" :contenteditable="true">edit me</p>
      <button @click="saveKeep" >Save Note</button>
</section>
`,
  data() {
    return {
      info: { title: 'title', txt: 'some text' },
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
