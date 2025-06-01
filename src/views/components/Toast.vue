<template>
  <div class="toast-wrapper">
    <transition name="slide">
      <div v-show="visible" class="toast">
        <span>{{ message }}</span>
        <button class="close-btn" @click="close">×</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      visible: false,
      duration: 5000,
      timer: null
    }
  },
  created() {
    this.$events.$on('toast', this.showToast)
  },
  beforeDestroy() {
    this.$events.$off('toast', this.showToast)
    clearTimeout(this.timer)
  },
  methods: {
    close() {
      clearTimeout(this.timer);
      this.visible = false;
    },
    showToast(payload) {
      clearTimeout(this.timer)
      if (typeof payload === 'string') {
        this.message = payload
        this.duration = 5000
      } else {
        this.message = payload.message || ''
        this.duration = payload.duration || 5000
      }
      this.visible = true

      this.timer = setTimeout(() => {
        this.visible = false
      }, this.duration)
    }
  }
};
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
}

.toast {
  background: #333;
  color: #fff;
  padding: 12px 16px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
}

/* Close button */
.close-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  margin-left: 12px;
  cursor: pointer;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
