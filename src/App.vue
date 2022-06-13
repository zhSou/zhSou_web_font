<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'

export default {
  name: 'app',
  components: { Layout }
}
</script>

<style lang="less" scoped>
#app {
  height: 100%;
}
</style>
