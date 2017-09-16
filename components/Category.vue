<template>
  <div class="m-category">
    <div class="g-box">
      <ul>
        <li v-for="(item, index) in cateData"
            v-bind:class="{'active':aid === item.id}"
            v-on:click="transCate(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import bus from '~/store/bus'
  export default {
    name: 'Category',
    props: ['cateData', 'activeId'],
    data () {
      return {
        aid: this.activeId
      }
    },
    methods: {
      transCate (id) {
        this.aid = id
        bus.$emit('cate-selected', id)
      }
    }
  }
</script>

<style scoped lang="scss">
  .m-category{
    font-size: 16px;
    margin-bottom: 15px;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    margin-top: 20px;
    &::-webkit-scrollbar {
      display: none
    }
    ul{
      float: left;
      display: block;
      white-space: nowrap;
      height: 100%;
      font-size: 0;
      position: relative;
      -webkit-overflow-scrolling: touch;
      overflow-x: scroll;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        display: none
      }
    }
    li{
      display: inline-block;
      margin-right: 15px;
      font-size: 14px;
      height: 32px;
      width: 90px;
      line-height: 32px;
      text-align: center;
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid #dbdbdb;
      color:#666;
      cursor: pointer;
      &:hover{
        color: #333;
        border: 1px solid #549ae2;
      }
      &.active{
        background: #549ae2;
        font-weight: 400;
        color: #fff;
        cursor: default;
      }
    }
  }
</style>
