<template>
    <div class="load-intro-page">
        <h1>Load Game</h1>
        <div class="load-button-container" :class="{'delete-mode' : deleteMode}">
            <div class="load-button-box" v-for="game in games" :key="`game_id_${game.id}`">
                <div class="delete-me" v-if="deleteMode" @click="deleteMode && deleteGame(game)">DELETE</div>
                <div class="load-button" @click="!deleteMode && loadGame(game)">
                    <div>
                        {{ game.user.infos.fullName }} - {{ game.user.team.location }} {{ game.user.team.name }}
                    </div>
                    <div>
                        {{ game.date }}
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Button smaller class="delete-button" v-if="games.length" @click="deleteMode = !deleteMode">{{deleteMode ? "DONE":"DELETE MODE"}}</Button>
        </div>
        <div class="action-buttons">
            <Button secondary @click="back">Back</Button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            "games"
        ]),
        teamsList() {
            return this.teams
        }
    },
    data() {
        return {
            steps: 0,
            deleteMode: false
        }
    },
    methods: {
        back() {
            this.$router.push("/")
        },
        loadGame(game) {
            this.$store.dispatch("loadGame", {
                savedState: game,
                store: this.$store
            })
            this.$router.push(`/game/${this.$store.state.id}`)
        },
        deleteGame(game) {
            this.$store.dispatch("removeGame", game.id)
        }
    }
}
</script>
<style lang="scss" scoped>
.load-intro-page {
    height: 100%;
    text-align: center;

    .load-button-container {

        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &.delete-mode {
            .load-button {
                border: 5px solid red;
                cursor: default;
            }
        }
        .load-button {
            background: white;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            border: 5px solid blue;
            padding: 1rem;
            margin: 0.25rem 0;
            width: 30rem;
            max-width: 100%;
        }

    }
    .load-button-box {
        position: relative;
        .delete-me {
            cursor: pointer;
            background: red;
            border-radius: 20px;
            padding: 1rem;
            position: absolute;
            top: 0.75rem;
            right: 0.5rem;
        }
    }

}
</style>