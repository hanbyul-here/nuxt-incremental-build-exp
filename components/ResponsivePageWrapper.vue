<template>
  <!-- eslint-disable-next-line -->
  <div :class="mqClass" role="main">
    <slot :isTouch="isTouch" />
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isTouch: false,
      deviceBySize: null
    }
  },
  computed: {
    mqClass() {
      let touchClass = this.deviceBySize == 'mobile' || this.deviceBySize == 'tablet' ? ' mq-touch' : ''
      return `mq-${this.deviceBySize}${touchClass}`
    }
  },
  mounted() {
    // Set up listeners
    window.addEventListener('touchstart', this.handleTouchstart)
    window.addEventListener('resize', this.setDevice)
    this.setDevice()
  },
  beforeDestroy() {
    window.removeEventListener('touchstart', this.handleTouchstart)
    window.removeEventListener('resize', this.setDevice)
  },
  methods: {
    setDevice() {
      // Breakpoints need to match those in variables.scss
      if (window.matchMedia('(min-width: 1200px)').matches) {
        this.deviceBySize = 'widescreen'
        this.isTouch = false
      } else if (window.matchMedia('(min-width: 1000px)').matches) {
        this.deviceBySize = 'desktop'
        this.isTouch = false
      } else if (window.matchMedia('(max-width: 599px)').matches) {
        this.deviceBySize = 'mobile'
        this.isTouch = true
      } else {
        this.deviceBySize = 'tablet'
        this.isTouch = true
      }
    },
    handleTouchstart() {
      this.isTouch = true
    }
  }
}
</script>
