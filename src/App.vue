<template lang="pug">
  #app
    app-nav
    router-view
</template>


<script>
import AppNav from '@/components/AppNav'

export default {
  name: 'app',
  components: {
    AppNav
  }
}
</script>

<style lang='scss'>
  @import './assets/scss/app.scss';
</style>
