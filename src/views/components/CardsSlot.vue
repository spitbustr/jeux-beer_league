<template>
    <div ref="dropZone" class="slot-tray">
        <draggable
            v-model="localCards"
            :group="{ name: 'cards', pull: true, put: true }"
            item-key="id"
            data-group="cards"
            class="card-container"
            @change="emitUpdate"
            @end="onDragEnd"
            :move="handleMove"
            tag="div"
            >
            <div
                v-for="(card, index) in localCards"
                :key="`card_hand_${index}`"
                class="card-slot"
                :class="{ 'zoomed-on-hover': shiftPressed }"
                ref="cardSlots"
                :style="getCardStyle(index)">
                <div class="card">
                    <component :is="card.type" :data="card" />
                </div>
            </div>
        </draggable>
    </div>
</template>



<script>
import draggable from 'vuedraggable'

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
    mounted() {
        window.addEventListener('keydown', this.onKeyDown)
        window.addEventListener('keyup', this.onKeyUp)
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('keyup', this.onKeyUp)
    },
    data() {
        return {
            localCards: [...this.cards],
            shiftPressed: false,
        };
    },
    watch: {
        cards(newVal) {
            this.localCards = [...newVal]
        }
    },
    methods: {
        emitUpdate(evt) {
            this.$emit('update:cards', this.localCards)
        },
        handleMove(evt) {
            const { from, to, draggedContext, relatedContext } = evt

            const fromGroup = from?.dataset?.group
            const toGroup = to?.dataset?.group
            const draggedCard = draggedContext.element
            if (`deck-${draggedCard.type}` !== toGroup) {
                return false
            }

            return true;
        },
        getCardStyle(index) {
            const zone = this.$refs.dropZone
            const cardEls = this.$refs.cardSlots
            if (!zone || !cardEls?.length) return {}

            const zoneWidth = zone.clientWidth
            const cardWidth = cardEls[0].offsetWidth
            const cardCount = this.localCards.length
            const scaledCardWidth = cardWidth * 1
            const normalGap = 8

            const totalNormalWidth = cardCount * scaledCardWidth + (cardCount - 1) * normalGap

            if (totalNormalWidth <= zoneWidth) {

                return {
                    marginLeft: index === 0 ? '0px' : normalGap + 'px',
                    zIndex: 1,
                }
            } else {
                const overflow = totalNormalWidth - zoneWidth
                const maxOverlap = cardWidth * 0.7

                let overlapPerGap = overflow / (cardCount - 1)
                overlapPerGap = Math.min(overlapPerGap, cardWidth)

                const negativeMargin = -overlapPerGap
                return {
                    marginLeft: index === 0 ? '0px' : negativeMargin + 'px',
                    zIndex: index + 10,
                }
            }
        },
        onDragEnd(evt) {

        },
        onKeyDown(e) {
            if (e.key === 'Shift') this.shiftPressed = true
        },
        onKeyUp(e) {
            if (e.key === 'Shift') this.shiftPressed = false
        }
    }
}
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
    overflow: visible;
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
    gap: 0;
    transition: gap 0.2s ease;
}

.card-slot {
    flex-shrink: 0;
    transition: transform 0.2s ease;
    position: relative;
    transform: scale(.75);
    &.zoomed-on-hover {
        &:hover {
        transform: scale(1.2);
        z-index: 1000 !important;
        top: -40px;
    }
    }
    &:hover {
        transform: scale(0.8);
        z-index: 1000 !important;
    }
}
</style>
