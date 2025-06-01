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
            <div class="gender-selection">
                <div @click="genderSelect('m')" :class="{'selected':selectedGender === 'm'}">
                    <img :src="require('@/assets/images/gender/man.png')">
                </div>
                <div @click="genderSelect('w')" :class="{'selected':selectedGender === 'w'}">
                    <img :src="require('@/assets/images/gender/woman.png')">
                </div>
            </div>
        </div>
        <div>
            <InputText
                :value="manager.infos.fullName"
                @update="update('fullName', $event)"
                placeholder="Enter Manager Full name"
                center
                label-top
                label="Manager's Full name"
            ></InputText>
        </div>
        <div class="available-points">
            Available Points : <span>{{ attributePoints }}</span>
        </div>
        <div class="scroll-selector-section">
            <div class="scroll-selector">
                <ScrollSelector v-model="score" :min="0" :max="5" :step="1" />
            </div>
        </div>
        <div class="action-buttons">
            <Button secondary @click="back">Back</Button>
            <Button @click="nextStep">Start Game!</Button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Manager from '@/models/Manager';
export default {
    computed: {
        ...mapGetters([
            "images",
        ]),
        selectedFace() {
            return this.manager.infos.image
        },
        numberOfFaces() {
            const getImages = require.context("@/assets/images/managers", true, /\.png$/)
            const currentGenderImages = getImages.keys().filter(i => i.includes("_m"))
            return currentGenderImages.length
        },
        selectedGender() {
             return this.manager.infos.gender
        }
    },
    data() {
        return {
            currentFace: 0,
            score: 0,
            attributePoints: 0,
            manager: new Manager()
        }
    },
    methods: {
        back() {
            this.$emit("back")
            this.$emit("reset")
        },
        nextStep() {
            this.$emit("update:manager", this.manager)
            this.$store.dispatch("saveGame")
            this.$router.push(`game/${this.$store.state.id}`)
        },
        changeFace(val) {
            const currentVal = this.currentFace + val
            if (currentVal <= -1 || currentVal >= this.numberOfFaces) return
            this.manager.infos.image = `face_${currentVal}_${this.selectedGender}`
            this.currentFace = currentVal
            this.$emit("update", this.selectedFace)
        },
        genderSelect(value) {
            this.manager.infos.gender = value
            this.changeFace(0)
        },
        update(prop,value) {
            this.manager.infos[prop] = value
        }
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
    .gender-selection {
        display: flex;
        justify-content: center;
        > div {
            align-items: center;
            border-radius: 0.5rem;
            display: flex;
            justify-content: center;
            margin: 1rem 0.5rem;
            max-width: 4rem;
            opacity: 0.9;
            img {
                width: 100%;
            }
            &.selected {
                border: 3px solid black;
                opacity: 1;
            }
            &:hover {
                cursor: pointer;
                opacity: 1;
            }
        }
    }
    .scroll-selector-section {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem 0 ;
        .scroll-selector {
            width: 12rem;
        }
    }

    .available-points {
        font-weight: bold;
        span {
            font-size: 1.25rem;
        }
    }
</style>