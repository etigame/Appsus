export default {
  name: 'keep-filter',
  props: ['keywords'],
  template: ` <section className="keep-filter"></section>`,
  data() {
    return {
      filterBy: { keywords: null },
    }
  },
}
