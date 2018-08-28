<template>
  <div class="agreement-info">
    <div class="logo">
      <img src="static/agreement_logo.png" alt="">
    </div>
    <div class="head">
      <p>{{ data.title.title }}</p>
    </div>
    <div class="content">
      <div class="content-head">{{ data.header.header }}</div>
      <div class="content-parag" v-for="item in data.container">
        <p class="fontSize">{{ item.paragraph }}</p>
        <p class="parag-content">{{ item.content }}</p>
        <div v-for="child in item.children">
          <p class="parag-content color">{{child.content}}</p>
          <p class="children">{{child.childTit}}</p>
          <div v-for="item in child.children">
            <p class="parag-content">{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="btn" @click="closeAgreement">关闭</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      data: {
        type: Object,
        default: () => {
        }
      }
    },
    methods: {
      closeAgreement() {
        this.$emit('closeAgreement', false);
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../styles/variables.scss';

  .agreement-info {
    width: 100%;
    overflow-y: auto;
    padding-bottom: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    .logo {
      height: 3.7rem;
      width: 100%;
      text-align: center;
      margin-top: 5rem;
      img {
        height: 100%;
      }
    }
    .head {
      height: 2.73rem;
      text-align: center;
      margin-top: 1.75rem;
      font-size: 1.95rem;
      color: #7F7F7F;
    }
    .content {
      margin: 0 4.1rem;
      .content-head {
        font-size: 1.37rem;
        color: #000000;
        line-height: 2.4rem;
        margin-top: 2.83rem;
        text-indent: 2em;
      }
      .content-parag {
        font-size: 1.37rem;
        color: #000000;
        line-height: 2.4rem;
        margin-top: 2.83rem;
      }
      .parag-content {
        text-indent: 2em;
      }
      .fontSize {
        font-size: 1.8rem;
        color: red;
        margin-bottom: 1rem;
      }
      .children {
        font-size: 1.37rem;
        color: #000000;
        font-weight: bold;
      }
    }
    .color {
      font-weight: bolder;
    }
    .btn {
      width: 15.6rem;
      height: 4.1rem;
      background: #D5001C;
      border-radius: 0.15rem;
      line-height: 4.1rem;
      text-align: center;
      font-size: 1.7rem;
      color: #FFFFFF;
      position: fixed;
      bottom: 3rem;
      left: 50%;
      margin-left: -7.8rem;
    }
  }
</style>
