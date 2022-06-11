<template>
    <div class="searchHead">
        <div>
            <router-link to="home" class="localIcon">
                搜索引擎系统
            </router-link>
            <router-link to="home" class="link">
                首页
            </router-link>
        </div>
        <div class="loginArea">
            <div v-if="loginStatus">
                <el-dropdown>
                    <span class="el-dropdown-link">
                      {{user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="gotoUserInfo">
                            个人中心
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        收藏夹
                    </span>
                    <el-dropdown-menu slot="dropdown" class="collectFilder">
                        <!-- 引入收藏夹下拉菜单组件 -->
                        <collect-drop-down showStyle="listStyle"></collect-drop-down>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div v-else>
                <router-link to="login" class="link"> 登录 </router-link>
                <router-link to="register" class="link"> 注册 </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import collectDropDown from '@/components/CollectDropDown.vue'
import { delTokenStr } from '@/utils/storage.js'

export default {
  name: 'SearchHead',
  components: { collectDropDown },
  data () {
    return {
    }
  },
  computed: {
    loginStatus () {
      if (this.$store.state.token !== '') {
        this.$store.dispatch('userInfo')
      }
      return this.$store.state.token
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    // 退出登录
    logout () {
      delTokenStr()
      this.$store.commit('setToken', '')
      this.$message({
        message: '已退出登录',
        type: 'success'
      })
      this.$router.push('/')
    },
    // 跳转
    gotoUserInfo () {
      this.$router.push('/userInfo')
    }
  }
}
</script>

<style lang="less" scoped>
.searchHead {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    div {
        display: flex;
        align-content: center;
    }
    a {
        color: #FFFF;
        text-decoration: none;
        margin-right: 20px;
    }
    .link {
        font-size: 18px;
    }
    .link:hover {
        color: #409EFF;
        text-decoration: underline;
    }
}
.localIcon{
    font-family: 'Times New Roman', Times, serif;
    margin-left: 20px;
    font-size: 2em;
}
.loginArea {
    display: flex;
    justify-content: center;
    height: 100%;
    .el-dropdown-link {
      display: flex;
      align-items: center;
      color: #fff;
      cursor: pointer;
      margin-right: 20px;
      .el-avatar {
          margin-right: 5px;
      }
    }
    .el-dropdown-link:hover {
      color: #409EFF;
    }
}
.collectFilder {
    width: 500px;
    height: 300px;
}

</style>
