export default {
  props: ['info'],
  template: `<article class="keep-txt-container">
                <h2>{{info.title}}</h2>
                <p>{{info.txt}}</p>
            </article>`,
  methods: {
    isEditable() {
      this.$emit('edit', true)
    },
  },
}
