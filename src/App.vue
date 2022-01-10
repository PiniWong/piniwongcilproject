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

      zhCN
    };
  },
  methods: {

  },
};
</script>

<style></style>
