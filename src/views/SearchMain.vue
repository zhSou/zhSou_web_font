<template>
    <div class="searchMain">
        <!-- 输入框 -->
        <div class="searchBox">
            <el-input placeholder="请输入搜索内容" v-model="form.input">
                <i slot="suffix" class="el-icon-camera" @click="imgSearch"></i>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
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
                    <i class="collect"
                    :class="articleList[index].isOn ? 'el-icon-star-on collected' : 'el-icon-star-off'"
                    @click="isDialogView(index)"></i>
                </div>
            </div>
        </div>
        <!-- 引入添加入收藏夹弹窗组件 -->
        <add-collect :show="collectFormVisible" @colStatus="colStatus" :colIndex="colIndex"></add-collect>
    </div>
</template>

<script>
import addCollect from '@/components/AddCollect.vue'

export default {
  name: 'SearchMain',
  components: { addCollect },
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
          isOn: true
        },
        {
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0513%252F7fe81826j00qt0wen001lc000iq00bhm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632532438&t=c7b2f45a34d5a801328415a01fa934c4',
          description: '43岁的布冯还能扑点他熬老了一大批门将也定义了一个时代',
          isOn: false
        },
        {
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0513%252F7fe81826j00qt0wen001lc000iq00bhm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632532438&t=c7b2f45a34d5a801328415a01fa934c4',
          description: '43岁的布冯还能扑点他熬老了一大批门将也定义了一个时代',
          isOn: false
        },
        {
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0513%252F7fe81826j00qt0wen001lc000iq00bhm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632532438&t=c7b2f45a34d5a801328415a01fa934c4',
          description: '43岁的布冯还能扑点他熬老了一大批门将也定义了一个时代',
          isOn: false
        },
        {
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0513%252F7fe81826j00qt0wen001lc000iq00bhm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632532438&t=c7b2f45a34d5a801328415a01fa934c4',
          description: '43岁的布冯还能扑点他熬老了一大批门将也定义了一个时代',
          isOn: true
        }
      ],
      showStyle: 'listStyle',
      collectIcon: '',
      collectFormVisible: false,
      colIndex: -1
    }
  },
  methods: {
    imgSearch () {
      // 图片搜索
    },
    // 用于判断是否打开收藏夹对话框，还是直接取消收藏
    isDialogView (index) {
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
    },
    // 用于判断该元素是否被添加进收藏夹
    colStatus (value) {
      // 当前状态为未收藏状态，需要判断打开收藏夹后是否进行收藏了
      if (this.articleList[value[0]].isOn === false) {
        // 根据返回值激活收藏状态
        this.articleList[value[0]].isOn = value[1]
      } else {
        // 测试
        // console.log('收藏状态依然调用该函数则应修改')
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
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
// 搜索框样式
.searchBox {
    text-align: center;
    .el-input {
    width: 30%;
    font-size: 20px;
    // 以图搜索图标样式
    i {
        line-height: 40px;
        margin-right: 5px;
    }
    i:hover {
        color: #409EFF;
        cursor: pointer;
    }
}
}
// 文章动态展示区
.contentList {
  width: 80%;
  margin: 20px auto;
  padding-bottom: 20px;
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
    .thumbnailsImgDec {
      div {
        font-size: 0.5em;
        float: left;
        width: 90%;
      }
      i {
        float: right;
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
