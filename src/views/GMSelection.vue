<template>
    <div>
        <div>
            <h1>Manager/Head Coach Selection</h1>
            <div class="manager-section">
                <div>
                    <button @click="changeFace(-1)" :disabled="currentFace <= 0">&lt;</button>
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
            this.$emit("update", this.selectedFace)
        },
    },
}
</script>
<style lang="scss" scoped>
.manager-section {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
        font-size: 2rem;
        padding: 1rem;
        margin: 0 1rem;
    }
    .manager-face-section {
        display: flex;
        justify-content: center;

        .manager-face {
            position: relative;
            width: 12rem;
            height: 13rem;
            border: none;
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: 1rem solid black;
                z-index: 2;
                pointer-events: none;
                box-sizing: border-box;
            }

            .manager-face-image-container {
                position: relative;
                width: 100%;
                height: 100%;
                z-index: 1;
                display: flex;
                justify-content: center;
                align-items: self-end;
                img {
                    width: auto;
                    height: 12rem;
                    max-height: 100%;
                    display: block;
                }
            }
        }
    }
}



</style>