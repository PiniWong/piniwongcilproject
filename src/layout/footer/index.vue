<template>
  <div class="footer">
    <div class="footer-title">PniWong科技提供技术支持</div>
    <!-- <a-modal title="统一登录" v-model="visible" okText="确定" width="640px" height="380px" :footer="null">
      <iframe src="http://local.merchant.ecm.gzdai.com:8090/auth/login" width="100%" height="380px" frameborder="0"></iframe>
    </a-modal> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: true
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  text-align: center;
  padding: 10px 0;
}
</style>
