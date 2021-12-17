<template>
  
  <a-config-provider :locale="zhCN">
    <div id="app" class="app-container">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
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
      zhCN
    };
  },
  methods: {
    // resetParams(type, callback) {
    //   let changepPage = {
    //     pageNum: 1,
    //     pageSize: 10,
    //     total: 0,
    //   };
    //   Object.assign(this[type + "Query"], changepPage);
    //   console.log(this[type + "Query"])
    //   callback && callback();
    // },
    // clickButton(type) {
    //   // console.log(type);
    //   this.resetParams(type)
    // },
  },
};
</script>

<style></style>
