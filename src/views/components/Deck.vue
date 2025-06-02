<template>
    <div class="main-container">
        <div class="deck-actions">
            <button @click="drawCard">Draw</button>
            <button @click="shuffleDeck">Shuffle</button>
            <button @click="redrawCards">Redraw</button>
        </div>
        <div class="card-draw-slot">
            <draggable v-model="drawnCards" :group="{ name: 'cards', pull: true, put: true }" class="slots" tag="div">
                <div v-for="(card, index) in drawnCards" :key="card?.id || index" class="card-slot" :style="stacked ? getStackedStyle(index) : {}">
                    <div v-if="card" class="card">
                        <component :is="type" :data="card"></component>
                    </div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import PlayerCard from '@/views/cards/Player.vue'

export default {
    name: 'MainDeck',
    components: {
        draggable,
        PlayerCard
     },
    data() {
        return {
            deck: [],
            drawnCards: [],
        }
    },
    created() {
        this.resetDeck()
    },
    methods: {
        getStackedStyle(index) {
            return {
                top: `${index}px`,
                left: `${index}px`,
                zIndex: 1 + index,
                position: 'absolute'
            }
        },
        resetDeck() {
            this.deck = [...this.originalDeck]
            this.shuffleDeck()
        },
        shuffleDeck() {
            for (let i = this.deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]
            }
        },
        drawCard() {
            if (this.deck.length === 0) return;
            this.drawnCards.push(this.deck.shift())
        },
        redrawCards() {
            this.deck.push(...this.drawnCards)
            this.drawnCards = []
            this.shuffleDeck()
        }
    },
    props: {
        stacked: Boolean,
        originalDeck: Array,
        type: [Object, Function, String],
    }
};
</script>

<style scoped>
.main-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.slots {
    display: flex;
    margin-top: 1em;
    gap: 1em;
}

.card-slot {
    width: 100px;
    height: 140px;
    border: 1px solid #ccc;
    background: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    font-weight: bold;
}
.card-draw-slot {
    position: relative;
}
</style>
