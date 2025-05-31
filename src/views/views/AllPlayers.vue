<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>INT</th>
                    <th>SKL</th>
                    <th>SPD</th>
                    <th>SHT</th>
                    <th>PAS</th>
                    <th>DEX</th>
                    <th>FO</th>
                    <th>AGG</th>
                    <th>Beer</th>
                    <th>Charm</th>
                    <th>Money</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="player in playersList" :key="player.id">
                    <td>{{ player.info.name }}</td>
                    <td>{{ player.info.position }}</td>
                    <td>{{ player.stats.INT }}</td>
                    <td>{{ player.stats.SKL }}</td>
                    <td>{{ player.stats.SPD }}</td>
                    <td>{{ player.stats.SHT }}</td>
                    <td>{{ player.stats.PAS }}</td>
                    <td>{{ player.stats.DEX }}</td>
                    <td>{{ player.stats.FO }}</td>
                    <td>{{ player.stats.AGG }}</td>
                    <td>{{ player.acquire.beer }}</td>
                    <td>{{ player.acquire.charm }}</td>
                    <td>{{ player.acquire.money }}</td>
                </tr>
            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>ANG</th>
                    <th>REF</th>
                    <th>ANT</th>
                    <th>Beer</th>
                    <th>Charm</th>
                    <th>Money</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="player in goaliesList" :key="player.id">
                    <td>{{ player.info.name }}</td>
                    <td>{{ player.info.position }}</td>
                    <td>{{ player.goalieStats.ANG }}</td>
                    <td>{{ player.goalieStats.REF }}</td>
                    <td>{{ player.goalieStats.ANT }}</td>
                    <td>{{ player.acquire.beer }}</td>
                    <td>{{ player.acquire.charm }}</td>
                    <td>{{ player.acquire.money }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
    components: {
        // EasyDataTable: () => import('vue3-easy-data-table'),
    },
    computed: {
        ...mapGetters([
            "getPlayersByPosition",
            "players"
        ]),
        goaliesList() {
            return [...this.getPlayersByPosition("G")]
        },
        playersList() {
            return [...this.getPlayersByPosition("F"), ...this.getPlayersByPosition("D")]
        },
    },
    methods: {
    }
}
</script>
<style scoped>
</style>
