<style lang="less">
.page-wrap {
  text-align: center;
  font-size: 18px;
  margin-top: 180px;
  position: relative;
  .prev-wrap, .next-wrap{
    position: absolute;
    top: 0;
  }
  .prev-wrap{
    left: 0;
  }
  .next-wrap{
    right: 0;
  }
  ul {
    display: inline-block;
    list-style: none;
    overflow: hidden;
    
    li {
      float: left;
      color: #1e5a6b;
      padding: 1px 8px;
      // margin: 0 5px;
      border-radius: 50%;
      user-select: none;
      border: 1px solid transparent;
    }
  }
  .page-num-wrap{
    width: 250px;
    display: flex;
    margin: 0 auto;
    li{
      flex: 1;
    }
  }

  .pointer {
    cursor: pointer;
  }

  .hover {
    &:hover {
      border-color: #7ba6b3;
    }
  }

  .li-page {
    line-height: 1.5;
    cursor: pointer;
    color: #1e5a6b;

    &:hover {
      color: #7ba6b3;
    }
  }

  .active {
    border-color: #246c81;
  }
}
</style>

<template>
<div class="page-wrap">
  <ul :class="{disabled: prePage}" class="li-page prev-wrap" @click="goPrePage">上一页</ul>
  <span>首页</span>
  <ul class="page-num-wrap">
    <li v-for="(i, index) in showPageBtn" :key="index" :class="{active: i === currentPage, pointer: i, hover: i && i !== currentPage}"
        @click="pageOffset(i)">
      <a v-if="i" class="notPointer">{{i}}</a>
      <a v-else>···</a>
    </li>
  </ul>
  <span>尾页</span>
  <ul :class="{disabled: nextPage}" class="li-page next-wrap" @click="goNextPage">下一页</ul>
</div>
</template>

<script>
export default {
  data: () => ({
    num: 40, // 数据总条数
    limit: 3 // 每页显示的数据条数
  }),

  computed: {
    offset () {
      return this.$store.state.offset
    },

    prePage () {
      return this.offset !== 0 && this.num
    },

    nextPage () {
      return (this.offset + this.limit < this.num) && this.num
    },

    totalPage () {
      return Math.ceil(this.num / this.limit)
    },

    currentPage () {
      return Math.ceil(this.offset / this.limit) + 1
    },

    showPageBtn () {
      const pageNum = this.totalPage
      const index = this.currentPage
      if (pageNum <= 5) return [...new Array(5)].map((v, i) => i + 1)
      if (index <= 2) return [1, 2, 3, 0, pageNum]
      if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum]
      if (index === 3) return [1, 2, 3, 4, 0, pageNum]
      if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
      return [1, 0, index - 1, index, index + 1, 0, pageNum]
    }
  },

  methods: {
    pageOffset (i) {
      if (i === 0 || i === this.currentPage) return
      this.$store.commit('GO_PAGE', (i - 1) * this.limit)
      this.$emit('getNew')
    },

    goPrePage () {
      console.log(this.offset);
      if(this.offset < this.limit){
        console.log('已经是第一页');
        return;
      }
      // console.log(this.prePage);
      // if (this.prePage) {
      //   console.log('已经是第一页');
      //   return;
      // }
      this.$store.commit('PRE_PAGE', this.limit)
      this.$emit('getNew')
    },

    goNextPage () {
      console.log(this.offset);
      if(this.offset < this.num && this.offset > this.num - this.limit){
        console.log('最后一页');
        return;
      }
      this.$store.commit('NEXT_PAGE', this.limit)
      this.$emit('getNew')
    }
  }
}
</script>
