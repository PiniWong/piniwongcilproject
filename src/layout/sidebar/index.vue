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
          name: "主页",
          type: "team",
          chil: [
            {
              cname: "主页",
              path: "/home",
            },
            {
              cname: "支付列表",
              path: "/pay",
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
