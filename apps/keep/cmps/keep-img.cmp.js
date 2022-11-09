export default {
  props: ['info'],
  template: `<div class="keep-img-container">
                <h2>{{ info.title }}</h2>
                <img :src="info.url" >
              </div>`,
}
