<template>
    <div>
        <template>
            <div class="color-picker">
                <div class="label">Logo color</div>
                <div class="swatches">
                    <div
                        v-for="(color, index) in colors"
                        :key="'main-' + index"
                        class="color-swatch"
                        :class="{ 'selected': color === selected.logo.colors.main }"
                        :style="{ backgroundColor: color }"
                        @click="selectColor('main','logo',color)">
                    </div>
                </div>

                <div class="label">Jersey colors</div>
                <div class="swatches">
                    <div
                        v-for="(color, index) in colors"
                        :key="'secondary-jersey-' + index"
                        class="color-swatch"
                        :class="{ 'selected': color === selected.jersey.colors.main }"
                        :style="{ backgroundColor: color }"
                        @click="selectColor('main', 'jersey', color)">
                    </div>
                </div>
                <div class="swatches">
                    <div
                        v-for="(color, index) in colors"
                        :key="'main-jersey-' + index"
                        class="color-swatch"
                        :class="{ 'selected': color === selected.jersey.colors.secondary }"
                        :style="{ backgroundColor: color }"
                        @click="selectColor('secondary', 'jersey', color)"></div>
                </div>
                <div class="label">Select Logo</div>
            </div>
        </template>
        <template>
            <div class="carousel-wrapper">
                <button class="carousel-btn left" @click="scrollLeft">&lt;</button>

                <div ref="carousel" class="carousel-container">
                    <div
                        v-for="logo in images.logos"
                        :key="logo"
                        @click="selectLogo(logo)"
                        class="team-logo"
                        :class="{ 'selected': selected.logo.image === logo }"
                    >
                        <img
                        width="40"
                        height="40"
                        :src="require(`@/assets/images/logos/${logo}.png`)"
                        :alt="logo"
                        />
                    </div>
                </div>

                <button class="carousel-btn right" @click="scrollRight">&gt;</button>
            </div>
        </template>

        <JerseyGenerator
            edit
            @update="updateSelected"
            :selected="selected"
        ></JerseyGenerator>

    </div>
</template>

<script>
import Jersey from "@/models/Jersey"
import { mapGetters } from "vuex"
import colors from "@/data/colors"

export default {
    computed: {
        ...mapGetters([
            "images"
        ]),
        colors() {
            return colors
        }
    },
    data() {
        return {
            selected: new Jersey(),
            isDragging: false,
            startX: 0,
            scrollLeftStart: 0,
        }
    },
    methods: {
        back() {
            this.$events.$emit("back")
        },
        selectColor(pos, sel,color) {
            this.selected[sel].colors[pos] = color
        },
        selectLogo(logo) {
            this.selected.logo.image = logo
        },
        getLogoPath(logo) {
            return require(`@/assets/images/logos/${logo}.png`);
        },
        scrollLeft() {
            this.$refs.carousel.scrollBy({ left: -120, behavior: 'smooth' });
        },
        scrollRight() {
            this.$refs.carousel.scrollBy({ left: 120, behavior: 'smooth' });
        },
        startDrag(e) {
            this.isDragging = true;
            this.startX = e.pageX - this.$refs.carousel.offsetLeft;
            this.scrollLeftStart = this.$refs.carousel.scrollLeft;
            this.$refs.carousel.style.cursor = 'grabbing';
        },
        onDrag(e) {
            if (!this.isDragging) return;
            e.preventDefault();
            const x = e.pageX - this.$refs.carousel.offsetLeft;
            const walk = (x - this.startX) * 1.5; // adjust scroll speed
            this.$refs.carousel.scrollLeft = this.scrollLeftStart - walk;
        },
        stopDrag() {
            this.isDragging = false;
            this.$refs.carousel.style.cursor = 'grab';
        },
        updateSelected(value) {
            this.selected = value
        },

    },
    mounted() {
        this.$refs.carousel.style.cursor = 'grab';
    },
}
</script>

<style lang="scss" scoped>
.color-picker {
    font-family: sans-serif;

}

.label {
    margin: 0.25rem auto;
    font-weight: bold;
}

.team-icon {
    margin-top: 1rem;
}

.swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
    margin: auto;
    justify-content: center;
}

.color-swatch {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    border: 4px solid white;
    box-shadow: 0 0 2px #000;
    margin-bottom: 1rem;
    cursor: pointer;

    &:hover {
        outline: 2px solid #333;
    }

    &.selected {
        border: 4px solid black;
    }
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: auto;
  overflow: hidden;
}

.carousel-container {
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  padding: 10px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin: 1rem 2rem;

}

.carousel-container::-webkit-scrollbar {
  display: none;
}

.team-logo {
  flex: 0 0 auto;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.team-logo.selected {
  outline: 2px solid #007bff;
  transform: scale(1.1);
}

.carousel-btn {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 20px;
  width: 32px;
  height: 60px;
  cursor: pointer;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
}

.carousel-btn.left {
  left: 0;
}

.carousel-btn.right {
  right: 0;
}

.carousel-wrapper::before,
.carousel-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  z-index: 1;
  pointer-events: none;
}

.carousel-wrapper::before {
  left: 0;
  background: linear-gradient(to right, #d3d3d3 0%, transparent 100%);
}

.carousel-wrapper::after {
  right: 0;
  background: linear-gradient(to left, #d3d3d3 0%, transparent 100%);
}

</style>