<template>
  <div class="lim">
    <a-breadcrumb>
      <a-breadcrumb-item href="">
        <router-link to="/home" title="回首页">
          <a-icon type="home" />
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        <a-icon type="user" />
        <span>商品</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        商品权限 123123
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="container">
      <div class="box">我要水平垂直居中</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "limlist",
};
</script>

<style lang="less" scoped>
.container {
 border: 2px solid black;
 background-color: chartreuse;
 width: 200px;
 height: 200px;
 text-align: center;
 line-height: 200px;
}
.box {
 display: inline-block;
 line-height: normal;
 font-size: 1rem;
//  vertical-align: middle;
 background-color: cornflowerblue;
}

</style>
