<template>
  <div class="event-card">
    <!-- Header -->
    <div class="event-header">
      <h2 class="event-title">{{ event.name }}</h2>
      <template v-if="event.icons">
        <div class="event-list">
          <img
              v-for="(icon,index) in event.icons"
              :src="require(`@/assets/images/attributes/${icon}.png`)"
              alt=""
              class="event-icon"
              :key="`icon_${index}_${icon}`"
          />
        </div>

      </template>
    </div>

    <!-- Placeholder Image -->
    <div class="event-image">
      <span>Event Image</span>
    </div>

    <!-- Description -->
    <p class="event-description">{{ event.description }}</p>

    <!-- Effects -->
    <div class="event-effects">
      <div v-if="event?.results?.missing">
        <p><strong>Games Missed:</strong> {{ event.results.missing.games }}</p>
        <p><strong>Affected Attribute:</strong> {{ event.results.missing.challenge }}</p>
      </div>
      <div v-else-if="event?.results?.injury">
        <p><strong>Injury Duration:</strong> {{ event.results.injury.games }} game(s)</p>
      </div>
      <div v-else>
        <p>No game impact</p>
      </div>
      <p class="event-cards">Card Count: {{ event.amountOfCards }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [Event,Object],
      required: true
    }
  },
  computed: {
    event() {
      return this.data
    }
  }
}
</script>

<style lang="scss" scoped>
.event-card {
  width: 11rem;
  height: 18rem;
  border: 1px solid green;
  border-radius: 12px;
  padding: 0.5rem;
  background-color: white;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  * {
    cursor: pointer;
    user-select: none;
  }
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.event-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.event-icon {
  width: 32px;
  height: 32px;
}

.event-image {
  height: 120px;
  background-color: #eee;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}

.event-description {
  font-size: 14px;
  color: #555;
  margin: 0;
}

.event-effects {
  border-top: 1px solid #ddd;
  padding-top: 8px;
  font-size: 13px;
  color: #444;
}

.event-cards {
  font-size: 11px;
  color: #777;
  margin-top: 6px;
}
.event-list {
  display: flex;
  align-items: center;
  > img {
    margin-left: 0.25rem;
  }

}
</style>
