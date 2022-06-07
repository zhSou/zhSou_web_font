<template>
    <div id="collectDropDown">
      <div class="collectAside">
        <ul>
          <li v-for="(folder,index) in folders" :key="index">
            {{folder}}
          </li>
        </ul>
      </div>
      <div class="collectMain" :class="show">
        <!-- 图片缩略图循环 -->
        <div :class="show + 'Article'" v-for="(item, index) in articles"
        :key="index">
          <!-- 图片 -->
          <el-image :src="item.url" fit="contain"></el-image>
          <!-- 文字描述部分 -->
          <div :class="show + 'ImgDec'">
            <div>{{item.description}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
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
        console.log(this.show)
      },
      // 这里增加了一个immediate属性，说明监听到props传参后立即先去执行handler方法
      immediate: true
    }
  },
  data () {
    return {
      folders: [
        '默认收藏夹sadfasdfasdfd',
        '默认收藏夹',
        '默认收藏夹'
      ],
      articles: [
        {
          aid: '2515152',
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0513%252F7fe81826j00qt0wen001lc000iq00bhm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632532438&t=c7b2f45a34d5a801328415a01fa934c4',
          description: '43岁的布冯还能扑点他熬老了一大批门将也定义了一个时代',
          isOn: true
        },
        {
          aid: '2515152',
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0513%252F7fe81826j00qt0wen001lc000iq00bhm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632532438&t=c7b2f45a34d5a801328415a01fa934c4',
          description: '43岁的布冯还能扑点他熬老了一大批门将也定义了一个时代',
          isOn: true
        },
        {
          aid: '2515152',
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0513%252F7fe81826j00qt0wen001lc000iq00bhm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632532438&t=c7b2f45a34d5a801328415a01fa934c4',
          description: '43岁的布冯还能扑点他熬老了一大批门将也定义了一个时代',
          isOn: true
        },
        {
          aid: '2515152',
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0513%252F7fe81826j00qt0wen001lc000iq00bhm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632532438&t=c7b2f45a34d5a801328415a01fa934c4',
          description: '43岁的布冯还能扑点他熬老了一大批门将也定义了一个时代',
          isOn: true
        },
        {
          aid: '2515152',
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0513%252F7fe81826j00qt0wen001lc000iq00bhm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632532438&t=c7b2f45a34d5a801328415a01fa934c4',
          description: '43岁的布冯还能扑点他熬老了一大批门将也定义了一个时代',
          isOn: true
        },
        {
          aid: '2515152',
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0513%252F7fe81826j00qt0wen001lc000iq00bhm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632532438&t=c7b2f45a34d5a801328415a01fa934c4',
          description: '43岁的布冯还能扑点他熬老了一大批门将也定义了一个时代',
          isOn: true
        }
      ],
      show: ''
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
      padding: 15px;
      font-size: 14px;
      list-style-type: none;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    li:hover {
      background-color: #f4f4f4;
      cursor: pointer;
    }
  }
  height: 100%;
}
.collectAside {
  padding-top: 20px;
  height: 100%;
  min-width: 120px;
  width: 20%;
  max-width: 150px;
  float: left;
  font-size: 20px;
  overflow: auto;
  border-right: 2px solid #eeeeee;
}
.collectMain {
  height: 100%;
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
    margin-bottom: 10px;
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
}
</style>
