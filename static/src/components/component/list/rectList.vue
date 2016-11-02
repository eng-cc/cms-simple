<template lang="html">
  <div class="content-item mdl-shadow--2dp">
    <div class="list-img" :style="'background-image:url(' + msg.img + ')'">
      <router-link :to="'' + msg.id">
      </router-link>
    </div>
    <div class="list-msg">
      <h3 class="list-title">
        <router-link :to="'' + msg.id">{{msg.title}}</router-link>
      </h3>
      <div class="list-extract">{{msg.extract}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rect-list',
  props: {
    msg: {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      extract: {
        type: String,
        required: true
      },
      img: {
        type: String,
        required: true
      }
    }
  },
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
  .content-item {
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    min-height: 170px;
    background-color: #fff;
    border: 1px solid #cfd8dc;
    box-sizing: border-box;
    margin-bottom: 32px;
    width: 100%;
    .list-img {
      width: 25%;
      height: 100%;
      background-position-y: center;
      background-size: cover;
      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px;
      text-align: center;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .list-title {
      color: #263238;
      font-size: 22px;
      line-height: 28px;
      word-break: break-word;
      a {
        color: #263238;
        font-size: 20px;
        font-weight: 700;
        line-height: 25px;
        margin-bottom: 15px;
      }
    }
    .list-extract {
      font-size: 14px;
      line-height: 26px;
      word-break: break-word;
      margin-top: 15px;
    }
    .list-msg {
      width: 75%;
      padding: 20px;
    }
  }
  @media only screen and (min-width: 841px) {
    .content-item {

    }
  }
</style>
