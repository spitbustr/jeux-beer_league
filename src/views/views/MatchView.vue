<template>
    <div class="game-page">
        
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            "teams",
            "events",
            "players",
            "images",
        ]),
        teamsList() {
            console.log(this.teams)
            return this.teams
        }
    },
    data() {
        return {
            steps: 0,
        }
    },
    methods: {
        advance() {
            this.steps++
        },
        back() {
            this.steps--
        },
        reset() {
            this.$emit("reset")
        }
    }
}
</script>
<style lang="scss" scoped>
.game-intro-page {
    height: 100%;
    text-align: center;
    .game-logo {
        max-width: 20rem;
        margin: auto;

        img {
            width: 100%;
        }
    }

    .button-actions {
        display: flex;
        flex-direction: column;
        margin: 1rem auto;
        width: fit-content;
    }
    .team-selection {
        margin: 0 auto;
        h2 {
            margin: 1rem auto;
        }
    }
    .grid-selection {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); // Responsive
        gap: 1.5rem;
    }
}

</style>