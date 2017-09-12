<template>
  <div class="m-category">
    <div class="g-box">
      <ul>
        <li v-for="(item, index) in cateData.data"
            v-bind:class="{'active':aid === item.id}"
            v-on:click="transCate(item.id)"
        >
          <a href="javascript:void(0)">{{ item.name }}</a>
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
      padding: 0 10px;
      font-size: 16px;
      margin: 10px 14px 10px 0;
      height: 30px;
      line-height: 30px;
      &.active {
        background: #549ae2;
        font-weight: 400;
        a {
          color: #fff;
          cursor: default;
          &:hover{
            color: #fff
          }
        }
      }
    }
  }
</style>
