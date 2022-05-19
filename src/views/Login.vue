<template>
  <el-card>
    <h2>欢迎进入登录页面</h2>
     <!-- 表单登录 -->
    <el-form :model="loginForm" :rules="loginFormRules" status-icon
    ref="loginFormRef" class="login_form">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名">
          <i slot="prefix" class="iconfont">&#xe63d;</i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码">
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
      if (/[^a-zA-Z0-9]{1,}/.test(value)) {
        return callback(new Error('密码不能包含特殊字符'))
      } else
      if (/[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value)) {
        callback()
      } else {
        let x
        let y
        let z
        if (/[a-z]/.test(value)) {
          x = '1'
        } else {
          x = '0'
        }
        if (/[A-Z]/.test(value)) {
          y = '1'
        } else {
          y = '0'
        }
        if (/[0-9]/.test(value)) {
          z = '1'
        } else {
          z = '0'
        }
        switch (x + y + z) {
          case '000': return callback(new Error('密码必须由大写字母、小写字母和数字组成'))
          case '001': return callback(new Error('密码必须包含大写字母、小写字母'))
          case '010': return callback(new Error('密码必须包含小写字母和数字'))
          case '011': return callback(new Error('密码必须包含小写字母'))
          case '100': return callback(new Error('密码必须包含大写字母和数字'))
          case '101': return callback(new Error('密码必须包含大写字母'))
          case '110': return callback(new Error('密码必须包含数字'))
        }
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
          { type: 'email', message: '请输入正确的用户名格式（邮箱地址）', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        if ((/[^a-zA-Z0-9]{1,}/).test(this.loginForm.password)) {
          return this.$message.error('密码错误，密码包含其他字符！')
        } else if (/[a-z]/.test(this.loginForm.password) && /[A-Z]/.test(this.loginForm.password) && /[0-9]/.test(this.loginForm.password)) {
          // 调用接口
          try {
            const params = new URLSearchParams()
            params.append('user', this.loginForm.username)
            params.append('password', this.loginForm.password)
            const { data } = await this.$http.post('trylogin', params, { 'Content-Type': 'application/x-www-form-urlencoded' })
            console.log(data)
            if (data.message === 'success') {
              this.$message.success('登录成功')
              this.$router.push('/home')
            } else {
              if (data.failTimes < 3) {
                this.$message.error('登录失败, 账号或密码错误。连续登录错误3次则锁定账号。该账号还有' + (3 - data.failTimes) + '次机会进行尝试')
              } else {
                this.$message.error('该账户已被锁定，解锁时间还剩余 ' + data.remainUnlockTime + ' s')
              }
            }
          } catch {
            return this.$message.error('登录请求错误')
          }
        } else {
          return this.$message.error('密码错误，密码应该由大写字母、小写字母和数字组成！')
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
}
</style>
