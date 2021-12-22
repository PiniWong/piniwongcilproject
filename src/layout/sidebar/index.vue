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
          :open-keys.sync="openKeys" 
          :selectedKeys="selectedKeys"          
          :default-selected-keys="['payList']"
          @select='selectedCallback'
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
import {mapState} from 'vuex'
export default {
  name: "home",
  data() {
    return {
      adminNmae:null,
      
      navBar: [
        {
          name: "支付管理",
          type: "user",
          chil: [
            {
              cname: "支付记录列表",
              path: "/payList",
            },
            {
              cname: "支出类型配置",
              path: "/beuse",
            },
          ],
        },
        {
          name: "用户管理",
          type: "team",
          chil: [
            {
              cname: "用户列表",
              path: "/userList",
            },
          ],
        },
        {
          name: "商品",
          type: "appstore-o",
          chil: [
            {
              cname: "商品权限",
              path: "/limList",
            },
            {
              cname: "商品列表",
              path: "/productList",
            },
          ],
        },
        {
          name: "数据报表",
          type: "bar-chart",
          chil: [
            {
              cname: "数据可视",
              path: "/statement",
            },
          ],
        },
      ],
      rootSubmenuKeys: [1,2,3,4],
      openKeys: [1,2,3,4],
      // selectOpenKeys:['payList'],

    };
  },
  watch: {
   
  },
  computed:{
    ...mapState({
      selectedKeys:(state) => state.selectedKeys,
      collapsed:(state)=> state.collapsed,
    })
  },
   methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    changeNav(e) {
      // console.log(e);
      const path = e.key;
      console.log(path);
      // this.$router.replace(path);
      this.$router.push({
        path: path
      })
      // this.selectedKey = [e.key];
    },
    selectedCallback({ item, key, selectedKeys }){
      console.log(item)
      console.log(key)
      console.log(selectedKeys)
    }
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
   width: 200px;
  height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  overflow-y: auto;
  position: fixed;
  left: 0;
  z-index: 100;
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
