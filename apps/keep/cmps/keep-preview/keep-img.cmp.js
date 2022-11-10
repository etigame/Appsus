export default {
  props: ['info'],
  template: `<article @click="isEditable" class="keep-img-container">
                <img :src="info.url" >
                <h2>{{ info.title }}</h2>
            </article>`,
  methods: {
    isEditable() {
      this.$emit('edit', true)
    },
  },
}
