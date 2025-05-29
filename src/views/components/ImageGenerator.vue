<template>
  <div class="canvas-section">
    <canvas ref="canvas" style="display: none;"></canvas>
    <img :width="width" :height="height" :src="canvasImage" />
  </div>
</template>

<script>
export default {
  props: {
    colors: Object,
    path: String,
    image: String,
    height: [String, Number],
    width: [String, Number],
    targetColor: String,
  },
  data() {
    return {
      canvasImage: "",
    };
  },
  mounted() {
    this.handleImage();
  },
  watch: {
    colors: { handler: 'handleImage', deep: true },
    image: 'handleImage',
  },
  methods: {
    handleImage() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = require(`@/assets/images/${this.path || ""}${this.image}.png`)
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];

          if (this.colors.secondary && r > 110 && g > 100 && b < 100) {
            const color = this.hexToRgb(this.colors.secondary);
            data[i] = color.r;
            data[i + 1] = color.g;
            data[i + 2] = color.b;
          }

          if (this.colors.main && r > 100 && g > 100 && b > 100) {
            const color = this.hexToRgb(this.colors.main);
            data[i] = color.r;
            data[i + 1] = color.g;
            data[i + 2] = color.b;
          }
          if(this.targetColor === "black"
            && this.colors.main
            && r < 100 && g < 100 && b < 100) {
            const color = this.hexToRgb(this.colors.main);
            data[i] = color.r;
            data[i + 1] = color.g;
            data[i + 2] = color.b;
          }
        }

        ctx.putImageData(imageData, 0, 0);
        this.canvasImage = canvas.toDataURL("image/png");
      };
    },
    hexToRgb(hex) {
      const bigint = parseInt(hex.replace("#", ""), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.canvas-section {
    max-width: 100%;
}
</style>