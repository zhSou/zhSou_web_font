<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { delTokenStr } from '@/utils/storage'

export default {
  name: 'app',
  components: { Layout },
  mounted () {
    window.onbeforeunload = () => delTokenStr()
  }
}
</script>

<style lang="less" scoped>
#app {
  height: 100%;
}
</style>
