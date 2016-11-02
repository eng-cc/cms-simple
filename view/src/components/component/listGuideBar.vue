<template lang="html">
  <section class="list-guide">
    <div class="textBox">
      <div class="text">
        <h2>{{msg.fir}}</h2>
        <p>
          {{msg.sec}}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'list-guide-bar',
  props: {
    msg: {
      fir: {
        type: String,
        required: true
      },
      sec: {
        type: String,
        required: true
      }
    }
  }
}
</script>

<style lang="less">
  .list-guide {
    background-image: url('../../assets/dark-background.jpg');
    flex-direction: row;
    padding: 30px 0;
    background-position: center;
    background-size: cover;
    color: #fff;
    .textBox {
      padding: 20px 80px;
      .text {
        min-height: 105px;
        padding-left: 30px;
        position: relative;
        h2 {
          line-height: 50px;
          font-weight: 600;
          margin: 0 0 10px 0;
        }
        p {
          line-height: 30px;
        }
        &:before {
          content: '';
          background-color: #00bcd4;
          border-radius: 3px;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 5px;
        }
      }
    }
  }
</style>
