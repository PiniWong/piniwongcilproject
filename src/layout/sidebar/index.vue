<template>
    <a-layout-sider
      class="side"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
        <a-menu
          mode="inline"
          theme="dark"
          @click="changeNav"
          @openChange="onOpenChange"
          :open-keys="openKeys" 
          v-model="selectOpenKeys"          
          :default-open-keys="[1]"
          :default-selected-keys="['payList']"
        >
          <a-sub-menu    v-for="(item, index) in navBar" :key="index+1">
            <span slot="title">
              <a-icon :type="item.type" />
              <span class="nav-text">{{ item.name }}</span>
            </span>
            <a-menu-item v-for="item2 in item.chil" :key="item2.path">
              <span class="nav-text">{{ item2.cname }}</span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      adminNmae:null,
      
      collapsed: false,
      navBar: [
        {
          name: "支付管理",
          type: "user",
          chil: [
            {
              cname: "支付记录列表",
              path: "payList",
            },
            {
              cname: "支出类型配置",
              path: "beuse",
            },
          ],
        },
        {
          name: "角色分配",
          type: "team",
          chil: [
            {
              cname: "角色列表",
              path: "roleList",
            },
          ],
        },
        {
          name: "商品",
          type: "appstore-o",
          chil: [
            {
              cname: "商品权限",
              path: "limList",
            },
            {
              cname: "商品列表",
              path: "productList",
            },
          ],
        },
        {
          name: "数据报表",
          type: "bar-chart",
          chil: [
            {
              cname: "数据可视",
              path: "statement",
            },
          ],
        },
      ],
      rootSubmenuKeys: [1, 2, 3,4],
      openKeys: [1],
      selectOpenKeys:['payList'],

    };
  },
  watch: {
   
  },
   methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      // console.log(latestOpenKey)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    changeNav(e) {
      // console.log(e);
      const path = e.key;
      // console.log(path);
      // this.$router.replace(path);
      console.log(path)
      this.$router.push({
        path: path
      })
      // this.selectedKey = [e.key];
    },
  },

  beforeCreate() {

  },
  created() {
  },
  destroyed() {
    
  },
  
};
</script>
<style lang='less' scoped>
.side {
  .logo {
    justify-content: center;
    display: flex;
    align-items: center;
    img {
      width: 26px;
      height: 26px;
    }
  }
}

</style>
