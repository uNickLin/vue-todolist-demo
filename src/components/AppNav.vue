<template lang="pug">
  nav#app_nav
    ul
      li(v-for='tab in tabList')
        a(
          :class='{active: currentTab === tab}', 
          @click='currentTab = tab') {{ tab }}
    
</template>

<script>
export default {
  data() {
    return {
      tabList: [
        "My Tasks", "In Progress", "Completed"
      ],
      currentTab: 'My Tasks'
    }
  }
}
</script>