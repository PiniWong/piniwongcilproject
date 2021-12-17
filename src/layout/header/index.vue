<template>
     <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="toggleCollapsed"
        />
        <avatar />
      </a-layout-header>
    </a-layout>
  
</template>
<script>
import avatar  from './avatat.vue'
export default {
  name: "home",
  data() {
    return {
      collapsed: false,
      
    };
  },
  components:{
      avatar
  },
  
  watch: {
    $route(to) {
      if (to.name === "userList") {
        this.openKeys = [1];
        this.selectOpenKeys=["userList"]
      }
    },
  },
  methods: {
   toggleCollapsed(){
       this.collapsed = !this.collapsed
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
<style lang='less'>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.trigger {
  float: left;
}
.handerAvatar {
  float: right;
  margin-right: 5vh;
  justify-content: space-around;
  display: flex;
  align-items: center;
  .avatarIcon {
    cursor: pointer;
  }
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
// 公告
.notice {
  margin-right: 10px;
  cursor: pointer;
}
.noticeMenuitem {
  width: 200px;
  h3 {
    width: 200px;
  }
  div {
    width: 200px;
    font-size: 10px;
    white-space: pre-wrap;
  }
}
</style>
