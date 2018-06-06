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
  },
  mounted() {
    this.$store.commit('getLocalTodoList')
  }
}
</script>

<style lang='scss'>
  @import './assets/scss/app.scss';
</style>
