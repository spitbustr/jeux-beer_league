<template>
    <div class="game-intro-page">
        <div>
            <CardDeck
                :originalDeck="events"
                type="EventCard"
                deckName="events"
                :maxVisibleCards="5"></CardDeck>
        </div>
         <div>
            <CardDeck
                stacked
                :originalDeck="playersList"
                type="PlayerCard"
                deckName="players"></CardDeck>
        </div>

        <CardsSlot :cards="cardsInHand" @update:cards="updateCards"></CardsSlot>
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
        },
        playersList() {
            return this.players.filter((p,i) => i< 10)
        },
    },
    data() {
        return {
            steps: 0,
            manager: new Manager(),
            cardsInHand: []
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
        updateCards(value) {
            this.cardsInHand = value
        }
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
    padding-bottom: 18rem;
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