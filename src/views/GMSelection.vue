<template>
    <div>
        <div>
            <h1>Manager/Head Coach Selection</h1>
           <div>
                <button @click="changeFace(-1)" :disabled="currentFace <= 0">&gt;</button>
            </div>
            <div class="manager-face-section">
                <div class="manager-face">
                    <div class="manager-face-image-container">
                        <img :src="require(`@/assets/images/managers/${selectedFace}.png`)" alt=""/>
                    </div>
                </div>
            </div>
            <div >
                <button @click="changeFace(1)" :disabled="numberOfFaces === (currentFace + 1)">&gt;</button>
            </div>
        </div>
        <div class="action-buttons">
            <Button secondary @click="back">Back</Button>
            <Button @click="nextStep">Next</Button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            "images",
        ]),
        numberOfFaces() {
            const getImages = require.context("@/assets/images/managers", true, /\.png$/)
            return getImages.keys().length
        },
    },
    data() {
        return {
            currentFace: 0,
            selectedFace: "face_0",
        }
    },
    methods: {
        back() {
            this.$emit("back")
            this.$emit("reset")
        },
        nextStep() {
            this.$emit("next")
        },
        changeFace(val) {
            const currentVal = this.currentFace + val
            if (currentVal <= -1 || currentVal >= this.numberOfFaces) return
            this.selectedFace = `face_${currentVal}`
            this.currentFace = currentVal
            this.$emit("update", this.selectedOptions)
        },
    }
}
</script>
<style lang="scss" scoped>
.manager-face-section {
    display: flex;
    justify-content: center;
    .manager-face {

        background: orange;
        position: relative;
        border: 1rem solid black;
        width: 10rem;
        height: 10rem;
        z-index: 3;
        .manager-face-image-container {
            position: relative;
            bottom: -1rem;
            width: 100%;
            height: 100%;
            z-index: 3;
            img {
                width: auto;
                height: 100%;
                margin-bottom: -1rem;
            }
        }

    }
}

</style>