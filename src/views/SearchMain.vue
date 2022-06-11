<template>
    <div class="searchMain">
        <!-- 输入框 -->
        <div class="searchBox">
          <!-- 搜索输入框 -->
          <el-input placeholder="请输入搜索内容" v-model="form.input">
            <i slot="suffix" class="el-icon-close" v-show="form.input !== ''" @click="form.input = ''"></i>
            <el-button slot="append" icon="el-icon-search"></el-button>
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
          <shield-view></shield-view>
        </el-card>
        <!-- 文章区域 -->
        <div class="contentList" v-show="articleList.length!==0" :class="showStyle">
          <!-- 图片缩略图循环 -->
          <div :class="showStyle + 'Article'" v-for="(item, index) in articleList"
          :key="index">
              <!-- 图片 -->
              <el-image :src="item.url" fit="contain"></el-image>
              <!-- 文字描述部分 -->
              <div :class="showStyle + 'ImgDec'">
                <div>{{item.description}}</div>
                <i :class="articleList[index].isOn ? 'el-icon-star-on collected' : 'el-icon-star-off'"
                @click="isDialogView(index)"></i>
              </div>
          </div>
        </div>
        <!-- 引入添加入收藏夹弹窗组件 -->
        <add-collect :show="collectFormVisible" @colStatus="colStatus"
        :colIndex="colIndex"></add-collect>
    </div>
</template>

<script>
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
        shieldList: []
      },
      articleList: [
        {
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0513%252F7fe81826j00qt0wen001lc000iq00bhm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632532438&t=c7b2f45a34d5a801328415a01fa934c4',
          description: '43岁的布冯还能扑点他熬老了一大批门将也定义了一个时代',
          isOn: false
        }
      ],
      shieldShow: true,
      showStyle: 'listStyle',
      collectIcon: '',
      collectFormVisible: false,
      colIndex: -1
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.token
    }
  },
  methods: {
    // 用于判断是否打开收藏夹对话框，还是直接取消收藏
    isDialogView (index) {
      // 未登录状态不能使用收藏功能
      if (this.loginStatus) {
        // 根据传入的index找到对应元素的图标,并判断该元素是否为被收藏状态
        if (this.articleList[index].isOn) {
          // 取消收藏
          this.articleList[index].isOn = false
        } else {
          // 打开对话框
          this.collectFormVisible = true
          // 传入选择元素的索引
          this.colIndex = index
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
      if (this.articleList[value[0]].isOn === false) {
        // 根据返回值激活收藏状态
        this.articleList[value[0]].isOn = value[1]
      }
      // 需要将对话框状态转换关闭
      this.collectFormVisible = false
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
  margin: 0 auto;
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
    height: 150px;
    margin: 0 auto 20px;
    border: 2px solid #E4E7ED;
    border-radius: 5px;
    padding: 5px;
    background-color: #E4E7ED;
    .el-image {
      float: left;
      height: 100%;
    }
    .listStyleImgDec {
      display: grid;
      grid-template-columns: auto auto;
      height: 100%;
      align-items: center;
      padding: 0 5px 0 10px;
      min-width: 50px;
      div {
        font-size: 150%;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
      i {
        align-self: flex-end;
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
