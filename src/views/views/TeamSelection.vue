<template>
    <div class="team-selection-page">
        <div>
            <h1>Team selection</h1>
        </div>
        <div>
            <InputText
                :value="teamName"
                @update="update('teamName', $event)"
                placeholder="Team name"
                center
                label-top
                label="Enter team name"
            ></InputText>
        </div>
        <div>
            <InputText
                :value="teamLocation"
                @update="update('teamLocation', $event)"
                placeholder="Team location"
                center
                label-top
                label="Enter team location"
            ></InputText>
        </div>
        <div>
            <LogoGenerator></LogoGenerator>
        </div>
        <div class="action-buttons">
            <Button secondary @click="back">Back</Button>
            <Button @click="nextStep" :disabled="disabled">Next</Button>
        </div>
        <div class="teams-jerseys-list">
        <div class="jersey-grid">
            <div class="jersey-item" v-for="team in allTeams" :key="`team_${team.id}`">
                <h3>{{ team.city }} {{ team.name }}</h3>
                <JerseyGenerator :selected="team" />
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            "teams",
        ]),
        allTeams() {
            return this.teams
        },
        disabled() {
            return this.teamName.trim() === "" || this.teamLocation.trim() === ""
        },
    },
    data() {
        return {
            teamName: "",
            teamLocation: "",
        }
    },
    methods: {
        back() {
            this.$emit("back")
        },
        nextStep() {
            this.$emit("next")
        },
        update(prop, value) {
            return this[prop] = value
        },
    }
}
</script>
<style lang="scss" scoped>
.game-intro-page {
    height: 100%;
}

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

    button {
        margin: 0.5rem;
        padding: 1rem;

        background: linear-gradient(135deg, black, #0072ff);
        color: white;
        padding: 1.75rem 3.5rem;
        font-size: 2rem;
        font-weight: bold;
        border: 5px solid black;
        border-radius: 9999px;
        box-shadow: 0 4px 15px rgba(0, 114, 255, 0.4);
        cursor: pointer;
        transition: all 0.3s ease;


        &:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0, 114, 255, 0.6);
        }

        &:active {
            transform: scale(0.98);
        }
    }
}
.teams-jerseys-list {
  padding: 1rem;
}

.jersey-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); // Responsive
  gap: 1.5rem;
}

.jersey-item {
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>