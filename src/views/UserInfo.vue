<template>
    <div id="userInfo">
      <div class="userTitle">
        <span>
            用户名：{{user.userName}}
        </span>
          <span>
            邮箱：{{user.email}}
        </span>
        <el-button @click="deleteUser">注销账号</el-button>
      </div>
      <collect-drop-down class="collect" showStyle="thumbnails"></collect-drop-down>
    </div>
</template>

<script>
import CollectDropDown from '@/components/CollectDropDown.vue'
import { delUser } from '@/api/index'
// import { delTokenStr } from '@/utils/storage'
import Cookies from 'js-cookie'

export default {
  name: 'UserInfo',
  components: { CollectDropDown },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    async deleteUser () {
      try {
        const res = await delUser()
        if (res.status === 200) {
          this.$store.commit('setUser', {})
          // delTokenStr()
          Cookies.remove('jwtToken')
          this.$store.commit('setToken', '')
          this.$router.push('home')
        }
      } catch (err) {
        this.$message({
          message: '网络请求错误',
          type: 'error'
        })
      }
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
    position: relative;
    line-height: 100px;
    font-size: 1.5vw;
    span:first-child {
      margin-left: 1vw;
    }
    .el-button {
      position: absolute;
      top: 50%;
      right: 50px;
      transform: translateY(-50%);
    }
  }
  // 收藏夹区域
  .collect {
    height: 100%;
  }
}

</style>
