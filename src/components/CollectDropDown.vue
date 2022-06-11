<template>
    <div id="collectDropDown">
      <div class="collectAside">
        <ul>
          <li @click="newVisible = true">新建收藏夹</li>
          <li v-for="(folder,index) in folders" :key="index" class="hoverLi">
            <div class="folderName" @click="getArticles(folder)">{{folder}}</div>
            <span class="folderBtns">
              <i class="el-icon-edit" @click="reNameVisible = true; oldName = folder"></i>
              <i class="el-icon-close" @click="deleteFolder(folder, index)"></i>
            </span>
          </li>
        </ul>
      </div>
      <div class="collectMain" :class="show">
        <!-- 图片缩略图循环 -->
        <div :class="show + 'Article'" v-for="(item, index) in articles"
        :key="item.aid">
          <!-- 图片 -->
          <el-image :src="item.url" fit="contain"></el-image>
          <!-- 文字描述部分 -->
          <div :class="show + 'ImgDec'">
            <div>{{item.raw}}</div>
          </div>
          <!-- 按钮 -->
          <el-dropdown :class="show + 'Btns'">
            <i class="el-icon-more"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="deleteArticle(item, index)">取消收藏</el-dropdown-item>
              <el-dropdown-item @click.native="moveVisible = true; currentIndex = index">移动到</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 新增收藏夹对话框 -->
      <el-dialog title="新增收藏夹" :visible.sync="newVisible"
      center width="30%" :modal="false">
        <el-input
          placeholder="请输入收藏夹名称，长度不超过20个字符"
          v-model="createName" maxlength="20" clearable>
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="newFolder">确 定</el-button>
          <el-button @click="newVisible = false; createName = '';">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 重命名收藏夹对话框 -->
      <el-dialog title="收藏夹重命名" :visible.sync="reNameVisible"
      center width="30%" :modal="false">
        <el-input
          placeholder="请输入收藏夹名称，长度不超过20个字符"
          v-model="newName" maxlength="20" clearable>
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="reName">确 定</el-button>
          <el-button @click="reNameVisible = false; newName = ''; oldName = '';">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 将收藏内容移动至其他收藏夹对话框 -->
      <el-dialog title="移动至其他收藏夹" :visible.sync="moveVisible"
      center width="20%" :modal="false">
        <ul>
          <li v-for="(item,index) in folders" :key="index">
            <el-radio v-model="movedName" :label="item" border size="medium">
              {{item}}
            </el-radio>
          </li>
        </ul>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="moveArticle">确 定</el-button>
          <el-button @click="moveVisible = false;">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import {
  getFolders,
  addFolders,
  delFolder,
  reNameFolder,
  getFavoriteByFolder,
  delFavorite,
  updateFavorite
} from '@/api'
export default {
  name: 'CollectDropDown',
  props: {
    showStyle: {
      type: String,
      default: ''
    }
  },
  watch: {
    //  深度监听对话框显示状态
    showStyle: {
      handler (newValue) {
        this.show = newValue
      },
      // 这里增加了一个immediate属性，说明监听到props传参后立即先去执行handler方法
      immediate: true
    },
    folders: {
      handler (newValue) {
        console.log(newValue)
      },
      immediate: true
    }
  },
  mounted () {
    this.getUserFolders()
    this.currentName = this.folders[0]
    this.getArticles(this.currentName)
  },
  data () {
    return {
      // 收藏内容列表
      articles: [],
      // 收藏夹列表
      folders: [],
      // 收藏内容展示样式
      show: '',
      // 新建收藏夹会话框显示状态
      newVisible: false,
      // 新建收藏夹的名称
      createName: '',
      // 重命名收藏夹会话框显示状态
      reNameVisible: false,
      // 重命名收藏夹的名称
      newName: '',
      // 重命名收藏夹原来的名称
      oldName: '',
      // 当前展示的收藏夹名称
      currentName: '',
      // 移动收藏内容会话框显示状态
      moveVisible: false,
      // 移动至的文件夹名称
      movedName: '',
      // 当前选择的文章
      currentIndex: -1
    }
  },
  methods: {
    // 获取收藏夹列表
    async getUserFolders () {
      try {
        const res = await getFolders()
        if (res.status === 200) {
          this.folders = res.data.data
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
    // 获取收藏夹内容
    async getArticles (name) {
      try {
        const res = await getFavoriteByFolder({
          folderName: name
        })
        console.log(res.data)
        if (res.status === 200) {
          this.articles = res.data
          this.createName = name
        } else {
          this.$message({
            message: '获取文章失败',
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
    // 新增收藏夹
    async newFolder () {
      if (this.createName !== '') {
        try {
          const res = await addFolders({
            name: this.createName
          })
          if (res.status === 200) {
            this.newVisible = false
            this.folders.push(this.createName)
            this.createName = ''
          } else {
            this.$message({
              message: '添加收藏夹失败',
              type: 'error'
            })
          }
        } catch (err) {
          this.$message({
            message: '网络请求错误',
            type: 'error'
          })
        }
      } else {
        this.$message({
          message: '收藏夹名称不能为空',
          type: 'error'
        })
      }
    },
    // 重命名收藏夹
    async reName () {
      if (this.newName !== '') {
        try {
          const res = await reNameFolder({
            oldName: this.oldName,
            newName: this.newName
          })
          if (res.status === 200) {
            this.reNameVisible = false
            const index = this.folders.indexOf(this.oldName)
            this.folders[index] = this.newName
            this.newName = ''
          } else {
            this.$message({
              message: '重命名收藏夹失败',
              type: 'error'
            })
          }
        } catch (err) {
          this.$message({
            message: '网络请求错误',
            type: 'error'
          })
        }
      } else {
        this.$message({
          message: '收藏夹名称不能为空',
          type: 'error'
        })
      }
    },
    // 删除收藏夹
    async deleteFolder (name, index) {
      try {
        const res = await delFolder({
          folderName: name
        })
        console.log(res)
        if (res.status === 200) {
          this.folders.splice(index, 1)
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
    // 删除收藏内容
    async deleteArticle (item, index) {
      try {
        const res = await delFavorite({
          aid: item.aid,
          folderName: this.currentName
        })
        console.log('删除收藏内容', res)
        if (res.status === 200) {
          this.articles.splice(index, 1)
        } else {
          this.$message({
            message: '取消收藏失败',
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
    // 移动收藏内容至其他收藏夹
    async moveArticle () {
      try {
        const res = await updateFavorite({
          aid: this.articles[this.currentIndex].aid,
          oldName: this.currentName,
          newName: this.movedName
        })
        console.log(res)
        if (res.status === 200) {
          this.articles.splice(this.currentIndex, 1)
          this.currentIndex = -1
          this.movedName = ''
        } else {
          this.$message({
            message: '移动失败',
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
  }
}
</script>

<style lang="less" scoped>
#collectDropDown {
  ul {
    padding: 0;
    margin: 0;
    height: 100%;
    li {
      position: relative;
      padding: 15px;
      font-size: 14px;
      list-style-type: none;
      font-weight: 500;
      .folderBtns {
        display: none;
      }
      .folderName {
        width: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    li:hover {
      background-color: #f4f4f4;
      cursor: pointer;
      .folderBtns {
        display: block;
        position: absolute;
        right: 10px;
        top: 15px;
      }
    }
  }
  height: 100%;
}
.collectAside {
  padding-top: 20px;
  height: 97%;
  min-width: 120px;
  width: 20%;
  max-width: 150px;
  float: left;
  font-size: 20px;
  overflow: auto;
  border-right: 2px solid #eeeeee;
}
.collectMain {
  height: 97%;
  overflow: auto;
  padding-top: 20px;
}
// 缩略图样式
.thumbnails {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  .thumbnailsArticle {
    width: 22%;
    height: 170px;
    padding: 0 10px;
    margin-bottom: 20px;
    .thumbnailsImgDec {
      div {
        font-size: 20%;
      }
    }
  }
  .thumbnailsArticle:hover {
    background-color: #f4f4f4;
    cursor: pointer;
  }
  .thumbnailsBtns {
    i {
      transform:rotate(180deg);
    }
  }
}
// 文章列表样式
.listStyle {
  display: flex;
  flex-direction: column;
  .listStyleArticle {
    height: 80px;
    display: grid;
    grid-template-columns: auto auto;
    padding: 5px 10px;
    grid-column-gap: 10px;
    .el-image {
      padding: 5px;
    }
    .listStyleImgDec {
      padding: 5px;
      font-size: 16px;
    }
  }
  .listStyleArticle:hover {
    background-color: #f4f4f4;
    cursor: pointer;
  }
  .listStyleBtns {
  }
}
</style>
