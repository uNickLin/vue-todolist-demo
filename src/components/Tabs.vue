<template lang="pug">
  #status_tabs
    ul
      li(v-for='tab in tabs')
        a(
          :class='{active: currentTab === tab}', 
          @click='$store.commit("changeTab", tab)') {{ tab }}
</template>

<script>
export default {
  props: [
    'currentTab', 'tabs'
  ]
}
</script>