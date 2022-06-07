<template>
    <div id="collectDropDown">
        <div class="collectAside">
            <ul>
                <li v-for="(folder,index) in folders" :key="index">
                    <el-button type="text">{{folder}}</el-button>
                </li>
            </ul>
        </div>
        <div class="collectMain">
            主题区域
        </div>
    </div>
</template>

<script>
export default {
  name: 'CollectDropDown',
  data () {
    return {
      folders: [
        '默认收藏夹',
        '默认收藏夹',
        '默认收藏夹',
        '默认收藏夹',
        '默认收藏夹',
        '默认收藏夹',
        '默认收藏夹',
        '默认收藏夹',
        '默认收藏夹',
        '测试收藏夹'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
#collectDropDown {
    ul {
        padding: 0;
        margin: 0;
        li {
            list-style-type: none;
        }
    }
    height: 100%;
}
.collectAside {
    height: 100%;
    float: left;
    font-size: 20px;
    overflow: auto;
    ul {
        height: 100%;
        padding: 0 10px;
    }
    li {
        padding: 5px 20px;
    }
    li:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }
}
.collectMain {
    height: 100%;
}
</style>
