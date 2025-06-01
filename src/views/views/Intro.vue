<template>
    <div class="game-intro-page">
        <div class="main-menu" v-if="!steps">
            <div class="game-logo">
                <img src="@/assets/images/logo-beer-league-hockey.png" alt="" />
            </div>
            <div class="button-actions">
                <Button @click="advance" :disabled="games.length >= 3">Start New</button>
                <Button @click="load">Load Game</button>
            </div>
        </div>
        <div class="team-selection" v-if="steps === 1">
            <TeamSelection
                @back="back"
                @next="advance"
                @update:team="updateTeam"></TeamSelection>
        </div>
        <div class="team-selection" v-if="steps === 2">
            <GMSelection
                @reset="reset"
                @back="back"
                @next="advance"
                @update:manager="updateManager"></GMSelection>
        </div>
        <!-- <div class="grid-selection">
            <Event v-for="(event,index) in events" :key="`event_${index}`" :event="event"></Event>
        </div>
        <div class="grid-selection">
            <Player v-for="(player,index) in players" :key="`player_${index}`" :player="player"></Player>
        </div> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Manager from '@/models/Manager'
import Team from '@/models/Team'
export default {
    computed: {
        ...mapGetters([
            "teams",
            "events",
            "players",
            "games"
        ]),
        teamsList() {
            return this.teams
        }
    },
    data() {
        return {
            steps: 0,
            manager: new Manager(),
        }
    },
    methods: {
        advance() {
            this.steps++
        },
        back() {
            this.steps--
        },
        load() {
            this.$router.push('/load')
        },
        reset() {
            this.$emit("reset")
        },
        updateTeam(value) {
            this.manager.team = value
        },
        updateManager(value) {
            const team = this.manager.team
            this.manager = value
            this.manager.team = new Team(team)
            this.manager.team.logo = team.jersey.logo.image,
            this.manager.team.mainColor = team.jersey.jersey.colors.main
            this.$store.dispatch("setUser", this.manager)
        },
    },
    mounted() {
          this.$events.$emit("toast","Théo pu!")
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