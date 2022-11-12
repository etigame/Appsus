export default {
  name: 'keep-header',
  props: ['keeps'],
  template: `<header class="keep-header full">
    <img src="assets/images/koogle.png" width="100"/>
    <input v-model="keywords" @input="getKeywords"  placeholder="Search..." type="text">
                </header>`,
  data() {
    return {
      keywords: null,
    }
  },
  methods: {
    getKeywords() {
      this.$emit('getKeywords', this.keywords)
    },
  },
}
