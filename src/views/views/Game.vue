<template>
    <div class="game-page">
        <div class="game-page-tabs">
            <!-- Hamburger Menu on Mobile -->
            <div class="hamburger" @click="showMenu = !showMenu">
                ☰
            </div>

            <div class="tab-groups" :class="{ open: showMenu }">
                <div class="game-page-tab-group">
                    <div class="game-page-tab-group-title">Personal</div>
                    <div>
                        <div class="game-page-tab" @click="view = 'manager'">Manager</div>
                        <div class="game-page-tab" @click="view = 'team'">Team</div>
                        <div class="game-page-tab" @click="view = 'items'">Items/Equipments</div>
                    </div>
                </div>
                <div class="game-page-tab-group">
                    <div class="game-page-tab-group-title">League</div>
                    <div>
                        <div class="game-page-tab" @click="view = 'standings'">Standings</div>
                        <div class="game-page-tab" @click="view = 'leaders'">Leaders</div>
                        <div class="game-page-tab" @click="view = 'calendar'">Calendar</div>
                    </div>
                </div>
            </div>

            <!-- "Play" tab/button always top right -->
            <button class="play-button" @click="view = 'play'">Play</button>
        </div>
        <div class="game-page-content">
            <transition name="slide-fade" mode="out-in">
                <component :is="currentView" :key="view" />
            </transition>
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
            "images",
        ]),
        currentView() {
            const map = {
                manager: 'Manager',
                team: 'Team',
                items: 'Items',
                standings: 'Standings',
                leaders: 'LeagueLeaders',
                calendar: 'Calendar',
                play: 'Play'
            }
            return map[this.view]
        }
    },
    data() {
        return {
            view: "team",
            showMenu: false
        }
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
/* Slide transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.4s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

/* Responsive layout */
.game-page-tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    position: relative;

    .tab-groups {
        display: flex;
        gap: 1rem;

        @media (max-width: 768px) {
            display: none;
            flex-direction: column;
            position: absolute;
            background: #222;
            top: 100%;
            left: 0;
            padding: 1rem;
            z-index: 10;

            &.open {
                display: flex;
            }
        }
    }

    .hamburger {
        display: none;
        cursor: pointer;
        font-size: 1.5rem;

        @media (max-width: 768px) {
            display: block;
        }
    }

    .play-button {
        background: #ff3b3f;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }

    .game-page-tab {
        cursor: pointer;
        padding: 0.5rem 1rem;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }
    }

    .game-page-tab-group-title {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
}
</style>