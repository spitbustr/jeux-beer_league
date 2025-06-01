<template>
    <div class="page-view">
        <h1>Standings</h1>
        <div class="page-content">
            <div class="standings-table-container">
                <table class="standings-table">
                    <thead>
                        <tr>
                            <td></td>
                            <th @click="sortBy('name')">Team</th>
                            <th @click="sortBy('gp')">GP</th>
                            <th @click="sortBy('wins')">W</th>
                            <th @click="sortBy('losses')">L</th>
                            <th @click="sortBy('ties')">T</th>
                            <th @click="sortBy('pts')">PTS</th>
                            <th @click="sortBy('gf')">GF</th>
                            <th @click="sortBy('ga')">GA</th>
                            <th @click="sortBy('diff')">DIFF</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="team in sortedTeams" :key="team.id">
                            <td>{{ team.fullName }}</td>
                            <td>{{ team.stats.gamesPlayed }}</td>
                            <td>{{ team.stats.wins }}</td>
                            <td>{{ team.stats.losses }}</td>
                            <td>{{ team.stats.ties }}</td>
                            <td>{{ team.stats.points }}</td>
                            <td>{{ team.stats.goalsFor }}</td>
                            <td>{{ team.stats.goalsAgainst }}</td>
                            <td>{{ team.stats.diff }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'StandingsTable',
    data() {
        return {
            currentSort: 'pts',
            currentSortDir: 'desc'
        }
    },
    computed: {
        ...mapGetters([
            "teams",
        ]),
        sortedTeams() {
            const teamsCopy = [...this.teams]

            // Add computed "diff" to each team
            teamsCopy.forEach(t => (t.diff = t.gf - t.ga))

            // Sort with fallback logic
            return teamsCopy.sort((a, b) => {
                const direction = this.currentSortDir === 'asc' ? 1 : -1

                if (this.currentSort !== 'auto') {
                    const valA = a[this.currentSort]
                    const valB = b[this.currentSort]
                    if (valA !== valB) return (valA > valB ? 1 : -1) * direction
                }

                // Default sort order: PTS > WINS > DIFF > GF > random
                if (b.pts !== a.pts) return b.pts - a.pts
                if (b.wins !== a.wins) return b.wins - a.wins
                const diffA = a.gf - a.ga
                const diffB = b.gf - b.ga
                if (diffB !== diffA) return diffB - diffA
                if (b.gf !== a.gf) return b.gf - a.gf

                return Math.random() < 0.5 ? -1 : 1
            })
        }
    },
    methods: {
        sortBy(field) {
            if (this.currentSort === field) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
            } else {
                this.currentSort = field
                this.currentSortDir = 'desc'
            }
        }
    }
}
</script>

<style scoped>
.standings-table-container {
    max-width: 100%;
    overflow-x: auto;
    margin: 1rem auto;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.standings-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    background-color: #fff;
}

.standings-table th,
.standings-table td {
    padding: 0.75rem 1rem;
    text-align: center;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}

.standings-table th {
    background-color: #f7f7f7;
    font-weight: 600;
    user-select: none;
    position: relative;
}

.standings-table th:hover::after {
    content: ' ⬍';
    font-size: 0.8rem;
    position: absolute;
    right: 10px;
    color: #666;
}

.standings-table tr:hover {
    background-color: #f0f8ff;
}

@media (max-width: 768px) {

    .standings-table th,
    .standings-table td {
        padding: 0.5rem 0.6rem;
        font-size: 0.85rem;
    }
}
</style>