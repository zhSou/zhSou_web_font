<template>
    <div class="searchHead">
        <div class="localIcon">
            搜索引擎系统
        </div>
        <div class="loginIcon">
            <el-avatar size="large" :src="usr.photoUrl"></el-avatar>
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{usr.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item divided>收藏夹</el-dropdown-item>
                    <el-dropdown-item divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
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
      }
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
    color: #FFFF;
}
.localIcon {
    font-family: 'Times New Roman', Times, serif;
    margin-left: 20px;
    font-size: 2em;
}
.loginIcon {
    display: flex;
    margin-right: 20px;
    align-items: center;
}
.loginIcon * + * {
    margin-left: 10px;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-link:hover {
    color: #409EFF;
}
</style>
