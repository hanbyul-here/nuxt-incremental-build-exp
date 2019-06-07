<template>
  <responsive-page-wrapper>
    <template slot-scope="{ isTouch }">
      <div id="main">
        <div class="has-background-white">
          <section class="section">
            <div class="container">
              <h1 class="title is-size-1">Main page</h1>
              <p>Nuxt.js project</p>
              <div v-if="!isTouch" class="pt-md">
                <p>
                  <a v-for="(link, idx) in routesList" :key="`link-${idx}`" :href="`${link.route}/`">
                    go to {{ link.route }}
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </template>
  </responsive-page-wrapper>
</template>

<script>
import ResponsivePageWrapper from '~/components/ResponsivePageWrapper'

export default {
  async asyncData({ params, error, payload }) {
    if (payload) return { routesList: payload.routesList }
    else
      return {
        routesList: [
          {
            route: 'subroute-1',
            payload: {
              content: 'this is subroute 1 contents'
            }
          }
        ]
      }
  },
  components: {
    ResponsivePageWrapper
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
</style>
