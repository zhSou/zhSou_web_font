<template>
    <div id="userInfo">
      <div class="userTitle">
        <span>
            用户名：{{username}}
        </span>
          <span>
            邮箱：{{emali}}
        </span>
      </div>
      <collect-drop-down class="collect" showStyle="thumbnails"></collect-drop-down>
    </div>
</template>

<script>
import CollectDropDown from '@/components/CollectDropDown.vue'
export default {
  name: 'UserInfo',
  components: { CollectDropDown },
  data () {
    return {
      id: '',
      username: '',
      emali: ''
    }
  }
}
</script>

<style lang="less" scoped>
#userInfo {
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 20px;
  grid-template-rows: 100px calc(100% - 100px);
  width: 70%;
  height: 100%;
  flex-direction: column;
  // 信息展示区域
  div {
    background-color: #ffffff;
    border-radius: 2px;
    span {
      padding: 10px;
    }
  }
  .userTitle {
    line-height: 100px;
    span:first-child {
      margin-left: 50px;
    }
  }
  // 收藏夹区域
  .collect {
    height: 100%;
  }
}

</style>
