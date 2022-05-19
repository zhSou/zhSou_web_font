<template>
  <el-card>
    <h2>欢迎进入注册页面</h2>
    <!-- 表单注册 -->
    <el-form :model="registerForm" :rules="registerFormRules" status-icon
    ref="registerFormRef" class="register_form">
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" placeholder="请输入用户名">
          <i slot="prefix" class="iconfont">&#xe63d;</i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="registerForm.password" placeholder="请输入密码">
          <i slot="prefix" class="iconfont">&#xe608;</i>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
      <el-input type="password" v-model="registerForm.checkPass" autocomplete="off" placeholder="请输入确认密码">
        <i slot="prefix" class="iconfont">&#xe666;</i>
      </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register()">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="toLog">
      <label>已经拥有账号,直接</label>
      <router-link to="/login">登录</router-link>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'REGISTER',
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
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      // 登录表单得验证规则对象
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'email', message: '请输入正确的用户名格式（邮箱地址）', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请确认输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        try {
          const params = new URLSearchParams()
          params.append('user', this.registerForm.username)
          params.append('password', this.registerForm.password)
          const result = await this.$http.post('resgister', params, { 'Content-Type': 'application/x-www-form-urlencoded' })
          console.log(result)
          if (result.data === 'success') {
            this.$message.success('注册成功')
            this.$router.push('/login')
          } else {
            this.$message.error('该邮箱已注册')
          }
        } catch {
          this.$message.Error('注册请求错误')
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
    .el-input {
      i {
        margin-left: 5px;
      }
    }
  }
  .el-button {
    width: 100%;
  }
}
.toLog {
  margin-top: 10%;
  text-align: center;
}
</style>
