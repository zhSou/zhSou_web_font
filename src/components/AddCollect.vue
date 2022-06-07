<template>
    <div class="addCollect">
      <!-- 收藏文章对话框 -->
      <el-dialog title="" :visible.sync="dialogVisible" center
      :before-close="closeDialog" width="450px">
        <div slot="title">
          添加到收藏夹
        </div>
          <!-- 收藏夹选项动态展示区域 -->
        <el-form class="formShow">
          <el-form-item v-for="(item,index) in collectForm" :key="index" :inline="true">
            <!-- 正常展示复选框 -->
            <div class="nameShow" v-show="!item.isEdit">
              <el-checkbox v-model="item.checked" @change="choose">
                {{item.name}}
              </el-checkbox>
            </div>
            <!-- 修改收藏夹文件名状态 -->
            <div class="nameShow" v-show="item.isEdit">
              <el-input placeholder="最多可输入20个字" size="medium"
              maxlength="20" v-model="item.newName"></el-input>
            </div>
            <!-- 正常收藏夹操作按钮 -->
            <div class="btn" v-show="!item.isEdit">
              <i class="el-icon-edit" @click="item.isEdit = !item.isEdit"></i>
              <i class="el-icon-delete" @click="deleteFolder(item.name, index)"></i>
            </div>
            <!-- 修改收藏夹名称按钮 -->
            <div class="btn" v-show="item.isEdit">
              <el-button size="mini" @click="editName(index, item.newName)">确定</el-button>
              <el-button size="mini" @click="cancelEdit(index)">取消</el-button>
            </div>
          </el-form-item>
          <!-- 遮罩层 -->
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
import { getFolders, addFolders, addFavorite, reNameFolder, delFolder } from '@/api'
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
      collectForm: [],
      isAddFolder: false,
      isChoose: true,
      folderName: ''
    }
  },
  mounted () {
    this.getUserFolders()
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
    async addCollect () {
      // 调用接口
      try {
        const obj = {
          aid: this.colIndex,
          folderName: []
        }
        this.collectForm.forEach(elem => {
          if (elem.checked === true) {
            // 获取选中的文件夹名称
            obj.folderName.push(elem.name)
          }
        })
        const res = await addFavorite(obj)
        if (res.status === 200) {
          // 收藏完成
          // 返回收藏状态,重置表单状态
          this.$emit('colStatus', [this.index, true])
          this.reSetForm()
        } else {
          this.$message({
            message: '收藏失败',
            type: 'error'
          })
        }
      } catch (err) {
        this.$message({
          message: '网络请求错误',
          type: 'error'
        })
      }
    },
    // 主动销毁对话框前将该文章的收藏状态返回false
    closeDialog (done) {
      this.$emit('colStatus', [this.index, false])
      this.reSetForm()
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
    async folderCreate (event) {
      // 阻止事件冒泡取消输入框聚焦
      event.preventDefault()
      if (this.folderName === '') {
        // 为空则不能提交，提示错误
        this.$message({
          message: '收藏夹名称不能为空',
          type: 'error'
        })
      } else {
        // 调用API
        try {
          const obj = {
            name: this.folderName
          }
          const res = await addFolders(obj)
          if (res.status === 200) {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            // 需要更新列表，并取消焦点
            obj.checked = false
            obj.isEdit = false
            obj.newName = ''
            this.collectForm.push(obj)
            this.cancelAdd()
          } else if (res.status === 500) {
            this.$message({
              message: res.data.data.message,
              type: 'error'
            })
          }
        } catch (err) {
          this.$message({
            message: '网络请求错误',
            type: 'error'
          })
        }
      }
    },
    // 切换确认按钮禁用状态
    choose () {
      const status = this.collectForm.some(item => { return item.checked })
      this.isChoose = !status
    },
    // 获取个人收藏夹
    async getUserFolders () {
      try {
        const res = await getFolders()
        if (res.status === 200) {
          // 遍历获取的数据，添加入列表
          res.data.data.forEach((elem) => {
            const obj = {
              checked: false,
              isEdit: false,
              newName: ''
            }
            obj.name = elem
            this.collectForm.push(obj)
          })
        } else {
          this.$message({
            message: '获取收藏夹失败',
            type: 'error'
          })
        }
      } catch (err) {
        this.$message({
          message: '网络请求错误',
          type: 'error'
        })
      }
    },
    // 修改收藏夹文件名
    async editName (index, newFolderName) {
      if (newFolderName === '') {
        // 为空则不能提交，提示错误
        this.$message({
          message: '收藏夹名称不能为空',
          type: 'error'
        })
      } else {
        const obj = {
          oldName: this.collectForm[index].name,
          newName: newFolderName
        }
        try {
          const res = await reNameFolder(obj)
          if (res.status === 200) {
            // 需要更新列表
            this.collectForm[index].name = newFolderName
            this.collectForm[index].newName = ''
            this.collectForm[index].isEdit = false
          } else if (res.status === 500) {
            this.$message({
              message: res.data.data.message,
              type: 'error'
            })
          }
        } catch (err) {
          this.$message({
            message: '网络请求错误',
            type: 'error'
          })
        }
      }
    },
    // 删除收藏夹
    async deleteFolder (name, index) {
      try {
        const res = await delFolder({ folderName: name })
        console.log(res)
        if (res.status === 200) {
          // 需要更新列表
          this.collectForm.splice(index, 1)
        } else {
          this.$message({
            message: '删除收藏夹失败',
            type: 'error'
          })
        }
      } catch (err) {
        this.$message({
          message: '网络请求错误',
          type: 'error'
        })
      }
    },
    // 取消修改收藏夹名称
    cancelEdit (index) {
      this.collectForm[index].isEdit = false
      this.collectForm[index].newName = ''
    },
    // 重置表单状态
    reSetForm () {
      this.collectForm.forEach((elem) => {
        elem.checked = false
        elem.isEdit = false
        elem.newName = ''
      })
      setTimeout(() => {
        this.isChoose = true
      }, '1000')
    }
  }
}
</script>

<style lang="less" scoped>
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
    max-height: 350px;
    overflow: auto;
}
.el-form-item {
    padding: 0 20px;
    .nameShow {
      float: left;
    }
    .btn {
      float: right;
      i {
        margin-left: 10px;
      }
      i:hover {
        color: #409EFF;
        cursor: pointer;
      }
    }
}
.el-form-item:hover {
    background-color: #ebeef3;
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
