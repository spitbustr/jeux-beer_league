<template>
    <div class="slot">
        <h3>Slot</h3>
        <draggable v-model="localCards" :group="{ name: 'cards' }" @change="emitUpdate" tag="div"
            class="card-container">
            <div v-for="(card) in localCards" :key="card.id" class="card">
                <component :is="type"></component>
            </div>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
    name: 'Slot',
    components: { draggable },
    props: {
        cards: {
            type: Array,
            required: true
        },
        type: String
    },
    data() {
        return {
            localCards: [...this.cards]
        };
    },
    watch: {
        cards(newVal) {
            this.localCards = [...newVal]
        }
    },
    methods: {
        emitUpdate() {
            this.$emit('update:cards', this.localCards)
        }
    }
};
</script>

<style scoped>
.card-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.card {
    background: #f2f2f2;
    border: 1px solid #ccc;
    padding: 10px;
    width: 80px;
    text-align: center;
    border-radius: 4px;
}
</style>
