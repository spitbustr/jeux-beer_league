<template>
    <div ref="dropZone" class="slot-tray">
        <draggable  v-model="localCards" :group="{ name: 'cards', pull: true, put: true }" item-key="id"
            data-group="cards" class="card-container" @change="emitUpdate" :move="handleMove" tag="div"
            :style="{ gap: computedGap + 'px' }">
            <div v-for="(card, index) in localCards" :key="card?.id || index" class="card-slot" ref="cardSlots">
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
        type: String,
    },
    data() {
        return {
            localCards: [...this.cards],
            computedGap: 4
        };
    },
    mounted() {
        this.updateGap()
        window.addEventListener('resize', this.updateGap)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateGap)
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
        },
        updateGap() {
            this.$nextTick(() => {
                const zone = this.$refs.dropZone;
                const cardEls = this.$refs.cardSlots;

                if (!zone || !cardEls?.length) return;

                const zoneWidth = zone.clientWidth;
                const cardWidth = cardEls[0].offsetWidth;
                const cardCount = this.localCards.length;

                const totalCardWidth = cardWidth * cardCount;
                console.log(zoneWidth,totalCardWidth,cardCount)
                if (totalCardWidth < zoneWidth) {
                    this.computedGap = 4
                } else {
                    const availableGap = (zoneWidth - totalCardWidth) / (cardCount - 1);
                    console.log(availableGap)
                    this.computedGap = availableGap
                }
            });
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
    max-height: 10rem;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
    z-index: 1000;

    &:hover {
        max-height: 40rem;
        padding: 1rem;
    }
}

.card-container {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    transition: gap 0.2s ease;
}

.card-slot {
    flex-shrink: 0;
    transition: transform 0.2s ease;
    position: relative;
    transform: scale(.5);
    &:hover {
        transform: scale(1.05);
        z-index: 10;
    }
}
</style>
