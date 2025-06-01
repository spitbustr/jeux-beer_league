<template>
    <div class="input-wrapper" :class="{'center':center,'label-top':labelTop}">
        <label v-html="label"></label>
        <input
            :placeholder="placeholder"
            :value="value"
            @input="$emit('update', $event.target.value)"
            class="input"
            type="text"
        />
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "Type something...",
        },
        label: String,
        center: Boolean,
        labelTop: Boolean,
    },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
    padding: 0.5rem 1rem;

    &.center {
        align-items: center;
        justify-content: center;
        input {
            text-align: center;
        }
    }
    &.label-top {
        display: flex;
        flex-direction: column;
        text-align: center;
        label {
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
    }

    .input {
        border: none;
        border-bottom: 2px solid #3498db;
        border-radius: 2rem;
        outline: none;
        padding: 1rem;
        font-family: jersey;
        font-size: 1.25rem;
        transition: border-color 0.3s;
        width: 100%;
        max-width: 30rem;
        box-sizing: border-box;
        &::placeholder {
            color: rgb(227, 236, 239);
        }
        &:focus {
            border-bottom-color: #e67e22;
        }
    }


}
</style>
