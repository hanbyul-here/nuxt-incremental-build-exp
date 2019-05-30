<template>
  <div id="main">
    <div class="has-background-white">
      <section class="section">
        <div class="container">
          <h1 class="title is-size-1">my-project</h1>
          <p>{{ contents }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, error, payload }) {
    if (payload) return { contents: payload.content }
    else return { contents: 'contents for sub page' }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
</style>
