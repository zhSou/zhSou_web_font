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
                        <el-avatar size="large" :src="usr.photoUrl"></el-avatar>
                        {{usr.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        收藏夹
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>待设置</el-dropdown-item>
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
export default {
  name: 'SearchHead',
  components: { },
  data () {
    return {
      usr: {
        name: '用户名',
        photoUrl: require('@/assets/usrPhoto.png')
      },
      loginStatus: true
    }
  },
  methods: {
    // 退出登录
    logout () {
      this.loginStatus = false
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
</style>
