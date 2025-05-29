<template>
    <div class="canvas-section">
        <div class="jersey-generator-section">
            <div v-if="edit">
                <button @click="changeJersey(-1)" :disabled="currentJersey === 0">&lt;</button>
            </div>
            <ImageGenerator :width="430" :height="445" :colors="selectedOptions.jersey.colors" path="jerseys/"
                :image="selectedOptions.jersey.image"></ImageGenerator>
            <div v-if="edit">
                <button @click="changeJersey(1)" :disabled="numberOfJerseys === (currentJersey + 1)">&gt;</button>
            </div>
            <div class="team-logo-section">
                <ImageGenerator
                    :width="140"
                    :height="140"
                    targetColor="black"
                    :colors="selectedOptions.logo.colors"
                    path="logos/"
                    :image="selectedOptions.logo.image"
                ></ImageGenerator>
            </div>
        </div>
    </div>
</template>

<script>
import Jersey from "@/models/Jersey"
export default {
    computed: {
        numberOfJerseys() {
            const getImages = require.context("@/assets/images/jerseys", true, /\.png$/)
            return getImages.keys().length
        },
    },
    data() {
        return {
            currentJersey: 0,
            selectedOptions: new Jersey(),
        };
    },
    mounted() {
        this.selectedOptions = this.selected
    },
    watch: {
        selected: {
            handler() {
                this.selectedOptions = this.selected
            },
            deep: true,
        }
    },
    methods: {
        changeJersey(val) {
            const currentVal = this.currentJersey + val
            if (currentVal <= -1 || currentVal >= this.numberOfJerseys) return
            this.selectedOptions.jersey.image = `jersey_${currentVal}`
            this.currentJersey = currentVal
            this.$emit("update", this.selectedOptions)
        },
    },
    props: {
        edit: Boolean,
        selected: Object,
    },
};
</script>
<style lang="scss" scoped>
:deep(.canvas-section) {
  max-width: 190%;

  img {
    max-width: 100%;
    height: auto;
  }
}

.jersey-generator-section {
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
    max-width: 100%;
    img,canvas {
        width: 100%;
    }
    button {
        font-size: 2rem;
        border: 1px solid black;
        padding: 1rem;
    }
}
:deep(.team-logo-section) {
    position: absolute;
    z-index: 2;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 22%;
    img {
        max-width: 100%;
    }
  
}
</style>