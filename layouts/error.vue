<template>
  <div class="container mt-md">
    <div v-if="error.statusCode === 404">
      <h1 class="is-size-2 mb-md">Page not found.</h1>
      <div>
        The link you followed is probably broken, or the page has been removed. You are now being redirected to the main
        careers page.
      </div>
    </div>
    <h1 v-else>An error occurred. Please Try Later.</h1>
  </div>
</template>

<script>
const redirectUrl = process.env.baseUrl

export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>
