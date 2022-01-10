<template>
     <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="toggleCollapsed"
        />
        <div class="titleLink">
          <a-breadcrumb>
            <a-breadcrumb-item href=""  title="回首页">
              <router-link to="/home" title="回首页">
                <a-icon type="home" />
              </router-link>
            </a-breadcrumb-item>
            <template v-for="(el,i) in titleArr" >
                <a-breadcrumb-item :key="i" >
                  <span >
                    <a-dropdown :trigger="['contextmenu']">
                      <router-link :to="el.path" >
                        {{el.title}}
                      </router-link>
                      <a-menu slot="overlay" v-if="titleArr.length != 1">
                        <a-menu-item @click="deleteTitle(i)">
                          <a href="javascript:;">删除该标签</a>
                        </a-menu-item>
                         <a-menu-item @click="deleteRight(i)">
                          <a href="javascript:;">删除右侧标签</a>
                        </a-menu-item>
                        <a-menu-item @click="deleteLeft(i)">
                          <a href="javascript:;">删除左侧标签</a>
                        </a-menu-item>
                        <a-menu-item @click="deleteOther(i)">
                          <a href="javascript:;">删除其他标签</a>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                    
                  </span>
                </a-breadcrumb-item>
                
            </template>
          </a-breadcrumb>
        </div>
        
        <avatar />
      </a-layout-header>
    </a-layout>
  
</template>
<script>
import avatar  from './avatat.vue'
import { mapState , mapMutations } from 'vuex'
export default {
  name: "home",
  data() {
    return {
      title:null,
      titleArr:[]
    };
  },
  components:{
      avatar
  },
  
  watch: {
    $route(to) {
      console.log(to)
      this.title = to.meta.title
      const title = to.meta.title
      const path = to.fullPath
      console.log(path)
      let flag = true
      this.titleArr.forEach((el,index) => {
          if(el.title==title){
            this.titleArr.splice(index,1)
            this.titleArr.push({
              title:title,
              path:path
            })
            flag=false
            return
          }
      });
      if(flag){
        this.titleArr.push({
          title:title,
          path:path
        })
      } 
      
    },
  },
  computed:{
    ...mapState({
      collapsed:state => state.collapsed
    })
  },
  methods: {
    ...mapMutations(['clikSiderbarIcon']),
   toggleCollapsed(){
      this.clikSiderbarIcon(123)
   },
   rightClickTitle(i){
     console.log(i)
   },
   deleteTitle(i){
     this.titleArr.splice(i,1)
     const flag = this.titleArr[i+1]
     if(flag){
       this.$router.push({
         path:this.titleArr[i+1].path
       })
     }else{
       this.$router.push({
         path:this.titleArr[i-1].path
       })
     }
   },
   deleteRight(i){
    const length = this.titleArr.length //总长度
    const index = i+1 //下标对应的长度
    const count = length - index //右侧剩余的长度
    this.titleArr.splice(index,count)
    this.$router.push({
         path:this.titleArr[i].path
       })
   },
   deleteLeft(i){
    const length = this.titleArr.length //总长度
    this.titleArr.splice(0,i)
     this.$router.push({
         path:this.titleArr[i].path
      })
     console.log(3)

   },
   deleteOther(i){
      const item = this.titleArr[i]
      const length = this.titleArr.length
      this.titleArr.splice(0,length,item)
      this.$router.push({
          path:item.path
        })
      console.log(3)
   }
  },
  beforeCreate() {

  },
  created() {
    const title = this.$route.meta.title
    const path = this.$route.fullPath
    this.titleArr.push({
          title:title,
          path:path
        })
  },
  destroyed() {
    
  },
  
};
</script>
<style lang='less'>
 .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.titleLink{
  position:absolute;
  top:20px;
  margin-left: 64px;
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
