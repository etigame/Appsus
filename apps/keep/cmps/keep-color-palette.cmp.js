export default {
  template: `
  <section class='flex'>
  <button class="color-palette" @click="isOpen=!isOpen">🎨</button>
  <div class="box" v-if="isOpen">
    <button v-for="color in colors"  :style="getStyleObject(color)" @click="changeColor(color)"></button>
  </div>
</section>
  `,
  data() {
    return {
      colors: [
        'rgb(242, 139, 130)',
        'rgb(247, 212, 199)',
        'rgb(255, 244, 117)',
        'rgb(204, 255, 144)',
        'rgb(167, 255, 235)',
        'rgb(203, 240, 248)',
      ],
      isOpen: false,
    }
  },
  methods: {
    getStyleObject(color) {
      const color2 = color
      return { backgroundColor: color2 }
    },
    changeColor(color) {
      this.$emit('color', color)
    },
  },
}
