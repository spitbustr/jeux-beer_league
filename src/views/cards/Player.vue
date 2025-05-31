<template>
  <div class="player-card" :class="cardClass">
    <div class="top-row">
      <div class="personality-icon">
        <div
          v-if="player.info.personnality.shape === 'circle'"
          :style="iconStyle"
          class="shape circle"
        ></div>
        <div
          v-else-if="player.info.personnality.shape === 'square'"
          :style="iconStyle"
          class="shape square"
        ></div>
        <svg
          v-else-if="player.info.personnality.shape === 'triangle'"
          width="24"
          height="24"
          viewBox="0 0 30 30"
        >
          <polygon
            :fill="player.info.personnality.color"
            points="15,5 25,25 5,25"
          />
        </svg>
      </div>

      <div class="name-position">
        <h2 class="player-name">{{ player.info.name || "Unnamed Player" }}</h2>
      </div>
      <div class="player-position">
        {{ player.info.position || "Unknown Position" }}
      </div>
    </div>

    <div class="stats" v-if="player.info.position !== 'G'">
      <div class="stat-pair">
        <span class="stat-key">INT</span>
        <span class="stat-value">{{ player.stats.INT }}</span>
        <span class="stat-key">DEX</span>
        <span class="stat-value">{{ player.stats.DEX }}</span>
      </div>
      <div class="stat-pair">
        <span class="stat-key">SKL</span>
        <span class="stat-value">{{ player.stats.SKL }}</span>
        <span class="stat-key">PAS</span>
        <span class="stat-value">{{ player.stats.PAS }}</span>
      </div>
      <div class="stat-pair">
        <span class="stat-key">SPD</span>
        <span class="stat-value">{{ player.stats.SPD }}</span>
        <span class="stat-key">SHT</span>
        <span class="stat-value">{{ player.stats.SHT }}</span>
      </div>

      <hr class="stat-separator" />

      <div class="stat-pair">
        <span class="stat-key">FO</span>
        <span class="stat-value">{{ player.stats.FO }}</span>
        <span class="stat-key">AGG</span>
        <span class="stat-value">{{ player.stats.AGG }}</span>
      </div>
    </div>

    <div v-if="player.info.position === 'G'" class="goalie-stats">
      <div
        v-for="(value, key) in player.goalieStats"
        :key="key"
        class="stat-row"
      >
        <span class="stat-key">{{ key }}</span>
        <span class="stat-value">{{ value }}</span>
      </div>
    </div>

    <div class="attributes">
      <template v-for="(value, key) in player.attributes">
        <span :key="key" v-if="value" class="attribute-badge">
          {{ key }}
        </span>
      </template>
    </div>
    <div class="acquire">
      🍺 {{ player.acquire.beer }} | 💰 {{ player.acquire.money }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cardClass() {
      return [
        this.player.info.position.toLowerCase() === "f"
          ? "position-forward"
          : "",
        this.player.info.position.toLowerCase() === "d"
          ? "position-defenceman"
          : "",
        this.player.info.position.toLowerCase() === "g"
          ? "position-goalie"
          : "",
      ];
    },
    iconStyle() {
      return {
        backgroundColor: this.player.info.personnality.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.player-card {
  width: 11rem;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
  &.position {
    &-forward {
      background: #e6fcf7;
    }
    &-defenceman {
      background: #f0e6ff;
    }
    &-goalie {
      background: #fff1e6;
    }
  }
}

.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}

.personality-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shape {
  width: 24px;
  height: 24px;
}

.circle {
  border-radius: 50%;
}

.square {
  /* No extra styling needed */
}

.name-position {
  display: flex;
  flex-direction: column;
}

.player-name {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
}

.player-position {
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin: 0;
}

.stats,
.goalie-stats {
    .stat-row {
        justify-content: flex-start;
        gap: 1rem;
    }
  display: flex;
    flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
}

.acquire {
  font-size: 14px;
  margin-top: 0.5rem;
  margin-bottom: 8px;
}

.attributes {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.attribute-badge {
  background-color: #eee;
  color: #333;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
}
.stat-pair {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;
  gap: 6px 8px;
  margin-bottom: 4px;
  align-items: center;
}

.stat-key {
  font-weight: bold;
  font-size: 13px;
  color: #444;
  width: 2rem;
}

.stat-value {
    width: 1.5rem;
  text-align: right;
  font-size: 13px;
  color: #222;
  text-align: right;
}

.stat-separator {
  border: none;
  border-top: 1px solid #ccc;
  margin: 8px 0;
}

</style>
