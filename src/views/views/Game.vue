<template>
    <div class="game-intro-page">
        <div class="main-menu" v-if="!steps">
            <div class="game-logo">
                <img src="@/assets/images/logo-beer-league-hockey.png" alt="" />
            </div>
            <div class="button-actions">
                <Button @click="advance">Start New</button>
                <Button>Load Game</button>
            </div>
        </div>
        <div class="team-selection" v-if="steps === 1">
            <TeamSelection @back="back" @next="advance"></TeamSelection>
        </div>
        <div class="team-selection" v-if="steps === 2">
            <GMSelection @reset="reset" @back="back" @next="advance"></GMSelection>
        </div>
        <div class="grid-selection">
            <Event v-for="(event,index) in events" :key="`event_${index}`" :event="event"></Event>
        </div>
        <div class="grid-selection">
            <Player v-for="(player,index) in players" :key="`player_${index}`" :player="player"></Player>
        </div>
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