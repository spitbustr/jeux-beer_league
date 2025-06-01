<template>
    <div class="page-view">
        <h1>Manager</h1>
        <div class="page-content">
            <img :src="require(`@/assets/images/managers/${user.infos.image}.png`)">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            "user"
        ])
    },
    methods: {
    }
}
</script>
<style scoped>
</style>