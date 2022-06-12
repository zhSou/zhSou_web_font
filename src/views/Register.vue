<template>
  <el-card>
    <h2>欢迎进入注册页面</h2>
    <!-- 表单注册 -->
    <el-form :model="registerForm" :rules="registerFormRules" status-icon
    ref="registerFormRef" class="register_form" @submit.native.prevent>
      <el-form-item prop="userName">
        <el-input v-model="registerForm.userName" placeholder="请输入用户名">
          <i slot="prefix" class="iconfont">&#xe63d;</i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="registerForm.password" placeholder="请输入密码">
          <i slot="prefix" class="iconfont">&#xe608;</i>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
      <el-input v-model="registerForm.email" autocomplete="off" placeholder="请输入邮箱">
        <i slot="prefix" class="iconfont">&#xe666;</i>
      </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="register()">注册</el-button>
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
      const res = /[^a-zA-Z0-9\s\u4e00-\u9fa5]{1,}/g
      if (res.test(value)) {
        return callback(new Error('密码不能包含特殊字符'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      const res = /[^\w]{1,}/g
      if (res.test(value)) {
        return callback(new Error('密码不能包含特殊字符'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        userName: '',
        email: '',
        password: ''
      },
      // 登录表单得验证规则对象
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名(可包含中英文、数字和空格)', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码(可包含英文、数字、下划线_)', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的用户名格式（邮箱地址）', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        try {
          const res = await this.$store.dispatch('userRegister', this.registerForm)
          if ('token' in res) {
            // 登录成功
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            // 可进行跳转
            this.$router.push('/home')
          } else if ('message' in res) {
            this.$message({
              message: '注册失败，' + res.message,
              type: 'error'
            })
          }
        } catch {
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
  font-size: 15px;
}
</style>
