<template>
    <div class="searchMain">
        <!-- 输入框 -->
        <div class="searchBox">
          <!-- 搜索输入框 -->
          <el-input placeholder="请输入搜索内容" v-model="form.input" @keyup.enter.native="search">
            <i slot="suffix" class="el-icon-close" v-show="form.input !== ''" @click="form.input = ''"></i>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          <!-- 展示图标选择 -->
          <span>
            <i class="iconfont icon-menu" @click="showStyle = 'listStyle'"></i>
            <i class="iconfont icon-modular" @click="showStyle = 'thumbnails'"></i>
          </span>
        </div>
        <!-- 引入屏蔽词汇组件 -->
        <el-card class="shield" :class="shieldShow ? 'shieldHeight' : ''">
          <div @click="shieldShow = !shieldShow" class="set">
            屏蔽词汇设置
            <i :class="'el-icon-arrow-' + `${shieldShow ? 'down' : 'up'}`"></i>
          </div>
          <shield-view @shield='shieldList'></shield-view>
        </el-card>
        <!-- 文章区域 -->
        <div class="contentList" v-show="articleList.length!==0" :class="showStyle">
          <!-- 图片缩略图循环 -->
          <div :class="showStyle + 'Article'" v-for="(item, index) in articleList"
          :key="index">
              <!-- 图片 -->
              <el-image :src="item.document.url" fit="contain"></el-image>
              <!-- 文字描述部分 -->
              <div :class="showStyle + 'ImgDec'">
                <div v-html="item.text"></div>
                <i :class="articleList[index].isOn ? 'el-icon-star-on collected' : 'el-icon-star-off'"
                @click="isDialogView(index)"></i>
              </div>
          </div>
        </div>
        <div v-show="searchShow" class="noFind">
          查询不到相关内容
        </div>
        <!-- 引入添加入收藏夹弹窗组件 -->
        <add-collect :show="collectFormVisible" @colStatus="colStatus"
        :colIndex="colIndex"></add-collect>
        <div class="pagination" v-show="articleList.length!==0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[30, 40, 50, 60]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
    </div>
</template>

<script>
import { getFavoritesByUser, getArticle } from '@/api'
import addCollect from '@/components/AddCollect.vue'
import shieldView from '@/components/ShieldView.vue'

export default {
  name: 'SearchMain',
  components: {
    addCollect,
    shieldView
  },
  data () {
    return {
      form: {
        input: '',
        shieldWords: []
      },
      articleList: [],
      shieldShow: true,
      showStyle: 'listStyle',
      collectIcon: '',
      collectFormVisible: false,
      colIndex: [],
      searchShow: false,
      total: 0,
      currentPage: 1,
      pageForm: {},
      size: 30
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.token
    }
  },
  watch: {
    articleList: {
      immediate: true,
      handler () {
      }
    }
  },
  methods: {
    // 用于判断是否打开收藏夹对话框，还是直接取消收藏
    isDialogView (index) {
      // 未登录状态不能使用收藏功能
      if (this.loginStatus) {
        // 根据传入的index找到对应元素的图标,并判断该元素是否为被收藏状态
        if (!this.articleList[index].isOn) {
          // 打开对话框
          this.collectFormVisible = true
          // 传入选择元素的索引
          this.colIndex = [this.articleList[index].id, index]
        }
      } else {
        // 未登录状态，提示登录才能使用收藏功能。
        this.$alert('<span>收藏文章需要先进行登录</span>', '提示', {
          dangerouslyUseHTMLString: true,
          center: true
        })
      }
    },
    // 用于判断该元素是否被添加进收藏夹
    colStatus (value) {
      // 当前状态为未收藏状态，需要判断打开收藏夹后是否进行收藏了
      if (this.articleList[value[0][1]].isOn === false) {
        // 根据返回值激活收藏状态
        this.articleList[value[0][1]].isOn = value[1]
      }
      // 需要将对话框状态转换关闭
      this.collectFormVisible = false
    },
    shieldList (value) {
      this.form.shieldWords = value
    },
    // 判断文章是否被收藏
    async getCollectArticles () {
      try {
        const res = await getFavoritesByUser()
        if (res.status === 200 && res.data.code === '0') {
          for (const key in res.data.data.favorites) {
            const data = JSON.parse(res.data.data.favorites[key]).data
            for (const id in data) {
              this.articleList.filter((el, index) => {
                if (el.id === id) {
                  this.$set(this.articleList[index], 'isOn', true)
                  return true
                } else {
                  el.isOn = false
                  return false
                }
              })
            }
          }
        } else if (res.data.code === '1') {
          this.$message({
            message: 'res.data.info',
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
    // 搜索内容
    async search () {
      this.searchShow = false
      if (this.form.input !== '') {
        try {
          const res = await getArticle({
            query: this.form.input,
            page: this.currentPage,
            limit: this.size,
            filterWord: this.form.shieldWords
          })
          if (res.status === 200 && res.data.code === '0') {
            // 判断返回内容是否为空
            if (res.data.data.total === 0) {
              this.searchShow = true
            } else {
              // 展示内容
              this.pageForm = {
                query: this.form.input,
                filterWord: this.form.shieldWords
              }
              this.total = res.data.data.total
              const reg = new RegExp(this.form.input, 'g')
              res.data.data.articleModel.forEach(item => {
                // 使用自定义属性实现全部替换
                // console.log(item)
                item.text = item.text.replace(reg, `<span style='color:red'>${this.form.input}</span>`)
              })
              this.articleList = res.data.data.articleModel
              if (this.loginStatus) {
                this.getCollectArticles()
              } else {
                this.articleList.forEach(item => {
                  item.isOn = false
                  // 使用自定义属性实现全部替换
                  console.log(item.document.text.replace(reg, `<span style="red">${this.form.input}</span>`))
                })
              }
            }
          } else {
            this.$message({
              message: '获取个人收藏内容失败',
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
          message: '搜索内容不能为空',
          type: 'error'
        })
      }
    },
    async handleSizeChange (val) {
      try {
        const res = await getArticle({
          query: this.pageForm.query,
          page: this.currentPage,
          limit: val,
          filterWord: this.pageForm.filterWord
        })
        if (res.status === 200 && res.data.code === '0') {
          // 判断返回内容是否为空
          if (res.data.data.total === 0) {
            this.searchShow = true
          } else {
            this.total = res.data.data.total
            this.articleList = res.data.data.articleModel
            if (this.loginStatus) {
              this.getCollectArticles()
            } else {
              const reg = new RegExp(this.form.input, 'g')
              res.data.data.articleModel.forEach(item => {
                // 使用自定义属性实现全部替换
                // console.log(item)
                item.text = item.text.replace(reg, `<span style='color:red'>${this.form.input}</span>`)
              })
              this.articleList = res.data.data.articleModel
              this.articleList.forEach(item => {
                item.isOn = false
              })
            }
          }
        } else {
          this.$message({
            message: '获取个人收藏内容失败',
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
    async handleCurrentChange (val) {
      try {
        const res = await getArticle({
          query: this.pageForm.query,
          page: val,
          limit: this.size,
          filterWord: this.pageForm.filterWord
        })
        if (res.status === 200 && res.data.code === '0') {
          // 判断返回内容是否为空
          if (res.data.data.total === 0) {
            this.searchShow = true
          } else {
            const reg = new RegExp(this.form.input, 'g')
            res.data.data.articleModel.forEach(item => {
              // 使用自定义属性实现全部替换
              item.text = item.text.replace(reg, `<span style='color:red'>${this.form.input}</span>`)
            })
            this.articleList = res.data.data.articleModel
            this.total = res.data.data.total
            this.articleList = res.data.data.articleModel
            if (this.loginStatus) {
              this.getCollectArticles()
            } else {
              this.articleList.forEach(item => {
                item.isOn = false
              })
            }
          }
        } else {
          this.$message({
            message: '获取个人收藏内容失败',
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
    replaceAll (str, f, e) {
      const reg = new RegExp(f, 'g') // 创建正则RegExp对象
      return str.replace(reg, e)
    }
  }
}

</script>

<style lang="less" scoped>
// 整体样式
.searchMain {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
// 搜索框样式
.searchBox {
  width: 50%;
  margin: 0 auto 10px;
  padding: 10px;
  text-align: center;
  border: 2px solid #E4E7ED;
  border-radius: 5px;
  line-height: 40px;
  background-color: #E4E7ED;
  .el-input {
    width: 60%;
    font-size: 20px;
  }
  i {
    line-height: 40px;
    font-size: 20px;
    margin-right: 5px;
  }
  i:hover {
    color: #409EFF;
    cursor: pointer;
  }
  span {
    margin-left: 25px;
    i {
      margin-right: 10px;
    }
  }
}
// 屏蔽词汇
.shield {
  position: absolute;
  top: 10px;
  right: 30px;
  width: 200px;
  z-index: 1000;
  overflow: hidden;
  /deep/.el-card__body {
  padding-top: 10px;
  padding-left: 8px;
  padding-right: 8px;
    .set {
      text-align: center;
      cursor: pointer;
      margin-bottom: 15px;
    }
    .set:hover {
      color: #409EFF;
    }
  }
}
.shieldHeight {
  height: 40px;
}
.noFind {
  width: 80%;
  height: 100px;
  margin: 20px auto;
  margin-bottom: 20px;
  border: 2px solid #E4E7ED;
  border-radius: 5px;
  background-color: #E4E7ED;
  text-align: center;
  line-height: 100px;
}
.pagination {
  width: 50%;
  margin: 20px auto;
  margin-bottom: 20px;
  border: 2px solid #E4E7ED;
  border-radius: 5px;
  background-color: #E4E7ED;
  text-align: center;
}
// 文章动态展示区
.contentList {
  width: 80%;
  margin: 20px auto;
  padding-bottom: 20px;
  span {
    float: right;
  }
  i {
    font-size: 20px;
  }
  i:hover {
    cursor: pointer;
    color: #E6A23C;
  }
}
.collected {
  color: #E6A23C;
}
// 缩略图样式
.thumbnails {
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
  .thumbnailsArticle {
    min-width: 150px;
    max-width: 23%;
    margin-bottom: 20px;
    border: 2px solid #E4E7ED;
    border-radius: 5px;
    background-color: #E4E7ED;
    padding: 5px;
    .el-image {
      height: 100px;
      width: 100%;
    }
    .thumbnailsImgDec {
      display: flex;
      justify-content: space-around;
      div {
        font-size: 0.5em;
        padding-right: 5px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
// 文章列表样式
.listStyle {
  .listStyleArticle {
    width: 70%;
    min-width: 200px;
    height: 100px;
    margin: 0 auto 20px;
    border: 2px solid #E4E7ED;
    border-radius: 5px;
    padding: 5px;
    background-color: #E4E7ED;
    .el-image {
      float: left;
      height: 100%;
      width: 15%;
    }
    .listStyleImgDec {
      position: relative;
      display: grid;
      grid-template-columns: auto auto;
      height: 100%;
      align-items: center;
      padding: 0 5px 0 10px;
      min-width: 50px;
      div {
        font-size: 100%;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
      i {
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
    }
  }
  // 清除浮动，撑开父盒子高度
  .listStyleArticle::after {
    content: '';
    display: block;
    clear: both;
  }
}
</style>
