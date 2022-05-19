<template>
    <div class="addCollect">
        <!-- 收藏文章对话框 -->
        <el-dialog title="" :visible.sync="dialogVisible" center
        destroy-on-close :before-close="closeDialog" width="400px">
          <div slot="title">
            添加到收藏夹
          </div>
            <!-- 收藏夹选项动态展示区域 -->
          <el-form>
            <el-form-item v-for="(item,index) in collectForm" :key="index">
                <el-checkbox v-model="item.checked" @change="choose">{{item.name}}</el-checkbox>
            </el-form-item>
            <div class="mask" v-show="isAddFolder"></div>
          </el-form>
          <!-- 对话框底部 -->
          <div slot="footer" class="dialog-footer">
            <div>
                <!-- 新建收藏夹按钮 -->
              <el-button v-show="!isAddFolder" @click="addFolder">
                <i class="el-icon-plus"></i>
                新建收藏夹
              </el-button>
              <!-- 收藏夹创建名称输入框 -->
              <el-input placeholder="最多可输入20个字" v-show="isAddFolder"
               v-model="folderName" ref="folderInput" @blur="cancelAdd">
                <el-button slot="append" @mousedown.native="folderCreate">创建</el-button>
              </el-input>
            </div>
            <el-divider></el-divider>
            <!-- 提交收藏请求按钮 -->
            <el-button @click="addCollect" :disabled="isChoose">确定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'addCollect',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    colIndex: {
      type: Number,
      default: -1
    }
  },
  emits: {
    colStatus: (value) => { return value }
  },
  data () {
    return {
      dialogVisible: this.show,
      index: this.colIndex,
      collectForm: [
        {
          name: '个人收藏夹',
          num: 6,
          checked: false
        },
        {
          name: '瞎看收藏夹',
          num: 1,
          checked: false
        }
      ],
      isAddFolder: false,
      isChoose: true,
      folderName: ''
    }
  },
  watch: {
    //  深度监听对话框显示状态
    show: {
      handler (newValue) {
        this.dialogVisible = newValue
      },
      // 这里增加了一个immediate属性，说明监听到props传参后立即先去执行handler方法
      immediate: true
    },
    //  深度监听选择的文章索引
    colIndex: {
      handler (newValue) {
        this.index = newValue
      },
      // 这里增加了一个immediate属性，说明监听到props传参后立即先去执行handler方法
      immediate: true
    }
  },
  methods: {
    // 提交添加收藏请求
    addCollect () {
      // 返回收藏状态
      this.$emit('colStatus', [this.index, true])
    },
    closeDialog (done) {
      this.$emit('colStatus', [this.index, false])
      done()
    },
    // 切换新增文件夹按钮状态,并激活输入框状态
    addFolder () {
      this.isAddFolder = true
      this.$nextTick(() => {
        this.$refs.folderInput.focus()
      })
    },
    // 输入框失去焦点，切换至按钮状态
    cancelAdd () {
      this.isAddFolder = false
      this.folderName = ''
    },
    // 提交创建新收藏夹请求
    folderCreate (event) {
      // 阻止事件冒泡取消输入框聚焦
      event.preventDefault()
      if (this.folderName === '') {
        // 为空则不能提交，提示错误
      } else {
        // 调用API
      }
    },
    // 切换确认按钮禁用状态
    choose () {
      const status = this.collectForm.some(item => { return item.checked })
      this.isChoose = !status
    }
  }
}
</script>

<style lang="less" scoped>
.el-dialog {
    width: 500px;
}
.el-checkbox:hover {
  color: #409EFF;
}
/deep/.el-dialog__header {
    padding: 20px;
}
/deep/.el-dialog__body {
    border-top: 1px solid #DCDFE6;
}
.el-form {
    position: relative;
}
.el-form-item {
    padding: 0 20px;
}
/deep/.el-checkbox {
    font-size: 20px;
}
.mask {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 1000;
}
</style>
