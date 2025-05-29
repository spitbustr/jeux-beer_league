<!-- components/SvgSprite.vue -->
<template>
    <span
        class="svg-container"
        v-html="svgContent"
        :style="`fill:${fill};color: ${fill};`"></span>
</template>

<script>
export default {
    props: {
        src: { type: String, required: true },
        width: { type: [String, Number], default: null },
        height: { type: [String, Number], default: null },
        fill: String,
        folders: String,
    },
    data() {
        return {
            svgContent: '',
        }
    },
    watch: {
        src: 'loadSvg',
        width: 'loadSvg',
        height: 'loadSvg',
        fill: 'loadSvg',
    },
    mounted() {
        this.loadSvg()
    },
    methods: {
        async loadSvg() {
            if (!this.src) {
                this.svgContent = ''
                return
            }
            const path = `/icons/${this.folders ? this.folders : ""}${this.src}.svg`

            try {
                const response = await fetch(path)
                const svgText = await response.text()

                const parser = new DOMParser()
                const doc = parser.parseFromString(svgText, 'image/svg+xml')
                const svg = doc.querySelector('svg')

                if (!svg) {
                    this.svgContent = ''
                    return
                }

                if (this.width) svg.setAttribute('width', this.width)
                if (this.height) svg.setAttribute('height', this.height)

                const serializer = new XMLSerializer()
                this.svgContent = serializer.serializeToString(svg)
            } catch (error) {
                console.error('Error loading SVG:', error)
                this.svgContent = ''
            }
        },
    },
}
</script>

<style scoped>
.svg-container svg {
    display: block;
    max-width: 100%;
}
</style>
