<template>
    <div id="userInfo">
      <div class="userTitle">
        <ul class="infoShow">
          <li>
            用户名：{{username}}
          </li>
          <li>
            邮箱：{{emali}}
          </li>
        </ul>
      </div>
      <collect-drop-down class="collect"></collect-drop-down>
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
  grid-template-rows: 200px calc(100% - 200px);
  width: 50%;
  height: 100%;
  flex-direction: column;
  border: 2px white solid;
  // 信息展示区域
  .userTitle {
    height: 200px;
    padding: 10px 15px 10px 30px;
    color: white;
    li {
      list-style-type: none;
      padding: 10px;
      margin-bottom: 20px;
    }
    .infoShow {
      float: left;
    }
  }
  // 收藏夹区域
  .collect {
    height: 100%;
    color: white;
  }
}

</style>
