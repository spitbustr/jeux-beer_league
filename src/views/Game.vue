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
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(["teams"]),
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
}

</style>