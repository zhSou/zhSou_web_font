<template>
  <el-card>
    <h2>欢迎进入登录页面</h2>
     <!-- 表单登录 -->
    <el-form :model="loginForm" :rules="loginFormRules" status-icon
    ref="loginFormRef" class="login_form">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" >
          <i slot="prefix" class="iconfont">&#xe63d;</i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password"
        show-password placeholder="请输入密码">
          <i slot="prefix" class="iconfont">&#xe608;</i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="toReg">
      <label>尚未拥有账号，进行</label>
      <router-link to="/register">注册</router-link>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'LOGIN',
  data () {
    const validatePass1 = (rule, value, callback) => {
      const res = /[^a-zA-Z0-9\s\u4e00-\u9fa5]{1,}/g
      if (res.test(value)) {
        return callback(new Error('密码不能包含特殊字符'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // 登录表单得验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        if ((/[^a-zA-Z0-9\s\u4e00-\u9fa5]{1,}/).test(this.loginForm.username)) {
          return this.$message.error('密码错误，密码包含其他字符！')
        }
        // 调用接口
        try {
          const res = await this.$store.dispatch('userLogin', this.loginForm)
          if ('token' in res) {
            // 登录成功
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            // 可进行跳转
            this.$router.push('/home')
          } else if ('message' in res) {
            this.$message({
              message: '登录失败，' + res.message,
              type: 'error'
            })
          }
        } catch (err) {
          this.$message({
            message: '网络请求错误',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-card {
  width: 400px;
  padding: 20px 20px 50px;
}
h2 {
  text-align: center;
  margin-bottom: calc(8% + 30px);
}
.el-form {
  margin-left: 10%;
  width: 80%;
  .el-form-item {
    margin-bottom: 10%;
  }
  .el-input {
    i {
      margin-left: 5px;
    }
  }
  .el-button {
    width: 100%;
  }
}
.toReg {
  margin-top: 10%;
  text-align: center;
  font-size: 15px;
}
</style>
