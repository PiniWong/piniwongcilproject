<template>
  <a-layout class="site-layout" :class="{ collapsed: collapsed }" >
    <Sidebar />
    <a-layout>
      <Header />
      <a-layout class="layout-main">
        <a-layout-content
            :style="{
            margin: '16px 16px',
            overflow: 'initial',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
            }"
        >
            <keep-alive max="10">
                <router-view :key="$route.fullPath"></router-view>
            </keep-alive>
        </a-layout-content>
      </a-layout>
      <Footer />
    </a-layout>
      
  </a-layout>
  
</template>
<script>
import Header from '@/layout/header'
import Sidebar from '@/layout/sidebar'
import Footer from '@/layout/footer'
import { mapState } from 'vuex'

export default {
  name: "home",
  components: {
    Header,
    Sidebar,
    Footer,
    // RouteView,
  },
  data() {
    return {
        fullPath:''
    };
  },
  
  methods: {
  },
  computed:{
     ...mapState({
      collapsed: (state) => state.collapsed,
    }),
  },

  mounted() {
      const fullPath = this.$route.fullPath
      this.fullPath=fullPath
      console.log(fullPath)
  },
  destroyed() {
    
  },
  updated(){
  }
};
</script>
<style lang='less' scoped>

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.site-layout{
  margin-left: 200px;
}
.collapsed {
  margin-left: 84px;
}
.trigger {
  float: left;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.layout-main {
  padding: 0 15px 0;
}

</style>
