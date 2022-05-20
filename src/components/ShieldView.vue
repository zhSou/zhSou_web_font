<template>
  <div id="shieldView">
    <div class="wordInput">
      <el-input placeholder="请输入屏蔽词汇" v-model="word" size="small">
        <i slot="suffix" class="el-icon-close" v-show="word !== ''" @click="word = ''"></i>n>
      </el-input>
      <el-button size="mini" @click="addWord">添加</el-button>
    </div>
    <div class="word">
      <span>屏蔽词汇</span>
      <span>操作</span>
    </div>
    <div class="wordList">
      <div class="word" v-for="(item,index) in shieldList" :key="index">
        <el-tooltip :content="item" placement="top">
          <div class="content">{{item}}</div>
        </el-tooltip>
        <div class="el-icon-delete delete" @click="deleteWord(index)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shieldView',
  data () {
    return {
      word: '',
      shieldList: ['ads']
    }
  },
  methods: {
    // 删除列表元素
    deleteWord (index) {
      this.shieldList.splice(index, 1)
      console.log('删除成功')
    },
    addWord () {
      if (this.word === '') {
        // 提示错误
      } else {
        this.shieldList.push(this.word)
        console.log('添加成功')
        this.word = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wordInput {
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 5px;
  .el-input {
    width: 140px;
  }
  .el-button {
    padding-right: 7px;
    padding-left: 7px;
  }
  margin-bottom: 10px;
}
.word {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  padding-right: 15px;
  font-size: 14px;
  border-top: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
}
.word:hover {
  background-color: #EBEEF5;
}
.wordList {
  overflow: auto;
  height: 120px;
  .word {
    font-size: 10px;
  }
  .content {
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .delete {
    cursor: pointer;
  }
  .delete:hover {
    color: red;
  }
}
</style>
