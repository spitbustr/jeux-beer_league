<template>
    <div class="main-container">
        <div class="deck-column">
            <div class="card-back-stack">
                <template v-if="deck.length">
                    <div v-for="(card, index) in deck" :key="`deck_card_back_${index}`" class="card-deck back-drop"
                        :style="getStackedStyle(index, true)"></div>
                </template>
            </div>
            <draggable :data-group="`deck-${type}`" :list="[]" :move="handleMove"
                :group="{ name: `deck-${type}`, pull: 'clone', put: false }" :clone="drawFromDeck" item-key="id"
                tag="div" class="card-deck-section">
                <div v-if="deck.length" class="card-deck" :class="getCardClass" :style="getStackedStyle(deck.length)"
                    @mousedown="startClick" @mouseup="endClick" @mouseleave="cancelClick">
                    <div class="card-name">
                        {{ deckName }}
                    </div>
                </div>
                <div v-else class="card-deck">
                    <div class="card-name empty">
                        NO CARDS LEFT
                    </div>
                </div>
            </draggable>
            <div class="deck-buttons">
                <button class="deck-discard-button" @click="redrawCards">Discard Pile Back in</button>
            </div>
        </div>

        <div v-if="stacked" class="card-draw-slot stacked-slot">
            <draggable ref="discard" :data-group="`deck-${type}`" :move="handleMove" v-model="drawnCards"
                :group="{ name: `deck-${type}`, pull: true, put: true }" class="discard-slot stacked-pile" tag="div"
                @change="listChanged">
                <div v-for="(card, index) in drawnCards" :key="`card-slot-${index}`" class="card-slot"
                    :style="getStackedStyle(index)">
                    <div class="card" :style="getStackedStyle(index)">
                        <component :is="type" :data="card" />
                    </div>
                </div>
            </draggable>
        </div>

        <!-- UNSTACKED LAYOUT -->
        <div v-else class="unstacked-slot">
            <!-- Discard pile column -->
            <div class="discard-column">
                <draggable :data-group="`deck-${type}`" ref="discard" v-model="discardedCards"
                    :group="{ name: `deck-${type}`, pull: true, put: true }" :clone="cloneCard" :move="handleMove"
                    @change="listChanged" class="discard-slot stacked-pile" tag="div">
                    <div v-for="(card, index) in discardedCards" :key="`discard-slot-${index}`" class="card-slot stacked"
                        :style="getStackedStyle(index)">
                        <div class="card">
                            <component :is="type" :data="card"></component>
                        </div>
                    </div>
                </draggable>
            </div>

            <!-- Drawn cards column -->
            <draggable :data-group="`deck-${type}`" :move="handleMove" v-model="drawnCards"
                :group="{ name: `deck-${type}`, pull: true, put: true }" class="slots" tag="div">
                <div v-for="(card, index) in drawnCards.slice(0, maxVisibleCards)" :key="`drawn-slot-${index}`"
                    class="card-slot not-stacked">
                    <div class="card">
                        <component :is="type" :data="card" />
                    </div>
                </div>
            </draggable>
        </div>
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
    props: {
        stacked: Boolean,
        originalDeck: Array,
        type: [String],
        deckName: String,
        goUnder: Boolean,
        size: String,
        maxVisibleCards: {
            type: Number,
            default: 5,
        }
    },
    data() {
        return {
            deck: [],
            drawnCards: [],
            discardedCards: [],
        }
    },
    computed: {
        getCardClass() {
            return [
                `card-style-${this.deckName}`,
                `card-size-${this.size}`,
            ]
        }
    },
    created() {
        this.resetDeck()
    },
    methods: {
        startClick() {
            this.clickTimeout = setTimeout(() => {
                this.clickTimeout = null; // drag has started
            }, 150); // threshold for distinguishing click vs drag
        },
        endClick() {
            if (this.clickTimeout) {
                clearTimeout(this.clickTimeout);
                this.drawCard(); // it was a click
            }
        },
        cancelClick() {
            clearTimeout(this.clickTimeout);
        },
        cloneCard(card) {
            return JSON.parse(JSON.stringify(card));
        },
        drawFromDeck() {
            if (this.deck.length === 0) return null;
            const card = this.deck.shift()
            return { ...card }
        },
        getStackedStyle(index, zIndex) {
            if (index > 24) {
                index = 24
            }
            return {
                top: `${index}px`,
                left: `${index}px`,
                zIndex: zIndex ? 0 : 1 + index,
                position: "absolute",

            }
        },
        handleMove(evt) {
            const { from, to, draggedContext, newIndex, oldIndex } = evt;

            const fromGroup = from?.dataset?.group;
            const toGroup = to?.dataset?.group;
            const draggedCard = draggedContext.element;
            if (toGroup === 'cards') {
                return true;
            }
            if (draggedCard?.type) {
                if (draggedCard.type !== this.type) return false
            }

            if (!toGroup || fromGroup !== toGroup) {
                return false;
            }
            // If moved from drawn to discard
            if (
                from === this.$refs.drawn &&
                to === this.$refs.discard &&
                draggedContext?.index !== undefined
            ) {
                this.drawnCards.splice(draggedContext.index, 1)
            }

            return true;
        },
        listChanged(evt) {
            console.log(evt, evt?.added,evt?.removed, evt?.added?.newIndex,evt?.removed?.oldIndex)
            const added = evt?.added;
            if (added && typeof added.newIndex === 'number') {
                this.drawnCards.splice(added.newIndex, 1)[0]
                this.drawnCards.push(added.element);
            }
            console.log(this.drawnCards)
        },
        resetDeck() {
            this.deck = [...this.originalDeck]
            this.shuffleDeck()
        },
        shuffleDeck(deck) {
            if (!deck) {
                deck = this.deck
            }
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                    ;[deck[i], deck[j]] = [deck[j], deck[i]]
            }
        },
        drawCard() {
            if (this.deck.length === 0) return;

            if (!this.stacked && this.drawnCards.length >= this.maxVisibleCards) {
                return
            }
            this.drawnCards.push(this.deck.shift())
        },
        redrawCards() {
            if (!this.stacked) {
                this.shuffleDeck(this.discardedCards)
                this.deck.push(...this.discardedCards)
                this.discardedCards = []
            }
            else {
                this.shuffleDeck(this.drawnCards)
                this.deck.push(...this.drawnCards)
                this.drawnCards = []
            }
            if (!this.discarderGoUnder) {
                this.shuffleDeck()
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.main-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    margin: 1rem 0.25rem;
}

.deck-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.deck-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.card-deck {
    width: 11rem;
    height: 18rem;
    padding: 0.5rem;
    border: 5px solid black;
    border-radius: 10px;
    position: relative;
    cursor: pointer;

    * {
        user-select: none; // Prevent text selection
        cursor: pointer;
    }

    &.card-style-players {
        background: blue;
    }

    &.card-style-events {
        background: green;
    }

    .card-name {
        font-size: 2rem;
        text-transform: uppercase;
        font-weight: bold;
        color: white;
    }
}

.slots {
    position: relative;
    display: flex;
    gap: 0.25rem;
    min-height: 18rem;
    justify-content: center;
    align-items: center;
}

.card-slot {
    width: 11rem;
    height: 18rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;

    &.not-stacked {
        position: relative;
    }
}

.unstacked-slot {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: flex-start;
}

.discard-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
}

.stacked-pile {
    border: 2px dashed #999;
    padding: 0.5rem;
    background: #f8f8f8;
    position: relative;
    width: 11rem;
    height: 18rem;
    padding: 0.5rem;
}

.card-deck-section {
    height: 18rem;
    width: 11rem;
    position: relative;
}

.deck-discard-button {
    padding: 1rem;
}

.deck-column {
    position: relative;

    .card-back-stack {
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>
