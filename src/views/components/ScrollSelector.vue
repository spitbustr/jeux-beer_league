<template>
    <div class="snap-slider-section">
        <div class="snap-slider" @mousedown="onMouseDown" @touchstart="onTouchStart">
            <div class="track"></div>
            <div class="ticks">
                <div v-for="(val, i) in values" :key="val" class="tick"
                    :style="{ left: `${(i / (values.length - 1)) * 100}%` }" @click="selectValue(val)">
                    <div class="value">
                        {{ val }}
                    </div>
                </div>
            </div>
            <div class="thumb" :style="{ left: `${thumbPosition}%` }" ref="thumb"></div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        value: Number,
        min: { type: Number, default: 0 },
        max: { type: Number, default: 10 },
        step: { type: Number, default: 1 }
    },
    data() {
        return {
            dragging: false,
            trackWidth: 0,
            thumbPosition: 0
        };
    },
    computed: {
        values() {
            const vals = [];
            for (let i = this.min; i <= this.max; i += this.step) {
                vals.push(i);
            }
            return vals;
        }
    },
    watch: {
        value(val) {
            this.thumbPosition = this.valueToPosition(val);
        }
    },
    mounted() {
        this.updateTrackWidth();
        window.addEventListener("resize", this.updateTrackWidth);
        this.thumbPosition = this.valueToPosition(this.value || this.min);
    },
    destroyed() {
        window.removeEventListener("resize", this.updateTrackWidth);
    },
    methods: {
        updateTrackWidth() {
            this.trackWidth = this.$el.offsetWidth;
            this.thumbPosition = this.valueToPosition(this.value);
        },
        valueToPosition(val) {
            const index = this.values.indexOf(val);
            if (index === -1) return 0;
            return (index / (this.values.length - 1)) * 100;
        },
        positionToValue(posX) {
            const relativeX = posX - this.$el.getBoundingClientRect().left;
            const ratio = Math.max(0, Math.min(relativeX / this.trackWidth, 1));
            const index = Math.round(ratio * (this.values.length - 1));
            return this.values[index];
        },
        selectValue(val) {
            this.$emit("input", val);
            this.thumbPosition = this.valueToPosition(val);
        },
        onMouseDown(e) {
            this.dragging = true;
            document.addEventListener("mousemove", this.onMouseMove);
            document.addEventListener("mouseup", this.onMouseUp);
            this.onMouseMove(e);
        },
        onMouseMove(e) {
            if (!this.dragging) return;
            const val = this.positionToValue(e.clientX);
            this.selectValue(val);
        },
        onMouseUp() {
            this.dragging = false;
            document.removeEventListener("mousemove", this.onMouseMove);
            document.removeEventListener("mouseup", this.onMouseUp);
        },
        onTouchStart(e) {
            this.dragging = true;
            document.addEventListener("touchmove", this.onTouchMove);
            document.addEventListener("touchend", this.onTouchEnd);
            this.onTouchMove(e.touches[0]);
        },
        onTouchMove(e) {
            if (!this.dragging) return;
            const val = this.positionToValue(e.clientX);
            this.selectValue(val);
        },
        onTouchEnd() {
            this.dragging = false;
            document.removeEventListener("touchmove", this.onTouchMove);
            document.removeEventListener("touchend", this.onTouchEnd);
        }
    }
};
</script>

<style scoped>
.snap-slider-section {
    background: lightblue;
    border: 4px solid black;
    border-radius: 40px;
    padding: 0.25rem 2rem;
}

.snap-slider {
    position: relative;
    top: -10px;
    height: 40px;
    width: 100%;
    user-select: none;
}

.track {
    position: absolute;
    top: 1.25rem;
    left: 0;
    right: 0;
    height: 4px;
    background: gray;
    margin: 0 -0.25rem;
    transform: translateY(-50%);
    border-radius: 2px;
}

.ticks {
    position: absolute;
    top: 1.25rem;
    left: 0;
    right: 0;
    height: 100%;
    pointer-events: none;
}

.tick {
    position: absolute;
    top: 0.75rem;
    width: 1px;
    height: 5px;
    background: black;
    transform: translate(-50%, -50%);
    pointer-events: auto;
    cursor: pointer;
}

.thumb {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    background: #007bff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: grab;
    transition: left 0.2s;
}
.value {
    display: flex;
    font-weight: bold;
    justify-content: center;
    position: relative;
    top: 6px;
    font-size: 0.85rem;
}
</style>
