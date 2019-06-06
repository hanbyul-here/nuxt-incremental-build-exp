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
const { initialRoutes, additionalRoutes, initialTotalRoutes, additionalTotalRoutes } = require('../route-mock')

export default {
  async asyncData({ params, error, payload }) {
    if (payload) return { contents: payload.content }
    else {
      try {
        const thisone = additionalTotalRoutes.filter(e => e.route === params.sub)[0]
        if (thisone) return { contents: thisone.payload.content }
        else return { contents: 'this should be 404' }
      } catch (e) {
        throw e
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
</style>
