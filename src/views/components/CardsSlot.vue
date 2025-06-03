<template>
    <div class="slot-tray">
        <draggable
            v-model="localCards"
            :group="{ name: 'cards', pull: true, put: true }"
            class="drop-zone"
            item-key="id"
            data-group="cards"
            @change="emitUpdate"
            :move="handleMove"
            tag="div"
        >
            <div v-for="(card, index) in localCards" :key="card?.id || index" class="card-slot">
                <div class="card">
                    <component :is="card.type" :data="card" />
                </div>
            </div>
        </draggable>
    </div>
</template>


<script>
import draggable from 'vuedraggable';

import PlayerCard from '@/views/cards/PlayerCard.vue'
import EventCard from '@/views/cards/EventCard.vue'

export default {
    components: {
        draggable,
        PlayerCard,
        EventCard,
    },
    computed: {
    },
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
        },
        handleMove(evt) {
            const { from, to, draggedContext, relatedContext } = evt;

            const fromGroup = from?.dataset?.group;
            const toGroup = to?.dataset?.group;
            const draggedCard = draggedContext.element;
            if (`deck-${draggedCard.type}` !== toGroup) {
                return false
            }

            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
.slot-tray {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 2px solid #ccc;
    padding: 1.5rem 1rem;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
    max-height: 8rem;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
    z-index: 1000;

    &:hover {
        max-height: 40rem;
        padding: 1rem;
    }
}


.drop-zone {
    display: flex;
    gap: 0.25rem;
}
</style>
