<template>
    <div :class="{'secondary':secondary}">
        <button @click="click($event)" :disabled="disabled">
            <slot></slot>
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        click(event) {
            this.$emit("click",event)
        }
    },
    props: {
        secondary: Boolean,
        disabled: Boolean,
    },
};
</script>

<style lang="scss" scoped>
button {
    margin: 0.5rem;
    padding: 1rem;

    background: linear-gradient(135deg, black, #0072ff);
    color: white;
    padding: 1.75rem 3.5rem;
    font-size: 2rem;
    font-weight: bold;
    border: 5px solid black;
    border-radius: 9999px;
    box-shadow: 0 4px 15px rgba(0, 114, 255, 0.4);
    cursor: pointer;
    transition: all 0.3s ease;


    &:not(:disabled):hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(0, 114, 255, 0.6);
    }

    &:active {
        transform: scale(0.98);
    }

    .secondary & {
        background: linear-gradient(135deg, #FFFFFF, #FFFFFF);
        color: black;
    }
    &:disabled {
        opacity: 0.7;
        &:hover {
            cursor: default;
        }
    }

}
</style>
