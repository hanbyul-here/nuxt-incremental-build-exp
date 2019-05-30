<template>
  <div class="loading">
    <span class="dot" />
    <span class="dot" />
    <span class="dot" />
  </div>
</template>

<style lang="scss" scoped>
.loading {
  width: 100%;
  text-align: center;
  margin: 3rem auto;
}
.loading .dot {
  display: inline-block;
  background: #000;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  padding: 0;
  margin: 0.35rem;
  opacity: 0;
  animation: blink 1.8s ease-out infinite;
}
.loading .dot:nth-child(2) {
  animation-delay: 0.25s;
}
.loading .dot:nth-child(3) {
  animation-delay: 0.5s;
}
@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
</style>
