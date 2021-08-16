<template>
  <div class="lim">
      <a-breadcrumb>
      <a-breadcrumb-item href="" >
        <router-link to="/home" title="回首页">
          <a-icon type="home"  />
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        <a-icon type="user" />
        <span>商品</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        商品权限
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "limlist",
};
</script>

<style>
</style>