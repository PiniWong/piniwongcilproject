<template>
  <div>
    <!-- <button @click="clickButton('equi')">点击equi</button>
    <button @click="clickButton('bbb')">点击bbb</button> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      equiQuery: {
        typeId: "aaa",
        ipLike: "aaaa",
        fact: "aaaa",
        pageNum: 2,
        pageSize: 10,
        total: 20,
      },
      bbbQuery: {
        typeId: "sad",
        ipLike: "ddda",
        ipLikesss: "16156",
        fact: "664",
        pageNum: 3,
        pageSize: 20,
        total: 40,
      },
    };
  },
  methods: {
    resetParams(type, callback) {
      let changepPage = {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      };
      Object.assign(this[type + "Query"], changepPage);
      console.log(this[type + "Query"])
      callback && callback();
    },
    clickButton(type) {
      // console.log(type);
      this.resetParams(type)
    },
  },
};
</script>

<style></style>
