export default {
  props: ['info'],
  template: `<article class="keep-img-container">
                <img :src="info.url" >
                <h2>{{ info.title }}</h2>
            </article>`,
}
