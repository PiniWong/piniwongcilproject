<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
      class="side"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div>
        <div class="logo">
          <img src="@/assets/logo.png" alt="" />
        </div>
        <a-menu
          mode="inline"
          theme="dark"
          @click="changeNav"
          @openChange="onOpenChange"
          :open-keys="openKeys" 
          v-model="selectOpenKeys"          
          :default-open-keys="[1]"
          :default-selected-keys="['userList']"
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
      </div>
    </a-layout-sider>
     <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="handerAvatar">
          <!-- 公告栏 -->
          <a-dropdown v-model="noticemenuShow" placement="bottomCenter">
            <a-badge :dot="noticeDot" class="notice" @click="allNotice">
              <a-icon type="bell" />
            </a-badge>
            <a-menu slot="overlay" class="noticeMenu">
              <a-menu-item key="1">
                <h2>公告</h2>
              </a-menu-item>
              <a-menu-item :key="12" class="noticeMenuitem">
                <h4>{{ noticeList ? noticeList[0].title : "123" }}</h4>
                <div>{{ noticeList ? noticeList[0].content : "123" }}</div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <!-- 名字 -->
          <div style="margin-right: 10px">
            {{ adminName }}
          </div>
          <a-dropdown :placement="'bottomCenter'">
            <a-avatar :size="35" icon="user" class="avatarIcon" />
            <a-menu slot="overlay">
              <a-menu-item>
                <a target="_blank" rel="noopener noreferrer">个人信息</a>
              </a-menu-item>
              <a-menu-item>
                <a target="_blank" rel="noopener noreferrer">管理账号</a>
              </a-menu-item>
              <a-menu-item>
                <a target="_blank" rel="noopener noreferrer" @click="quit"
                  >退出登录</a
                >
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px 0',
          overflow: 'initial',
          height: '100vh',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
  
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
              path: "userList",
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
      selectOpenKeys:['userList'],

      //notice
      noticeDot: true,
      noticeList: "",
      noticemenuShow: false,
    };
  },
  beforeCreate() {

  },
  created() {
    
    this.adminName = sessionStorage.getItem("adminName");
    this.$router.replace({ path: "/home" });


  },
  destroyed() {
    
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
      this.$router.push(path);
      // this.selectedKey = [e.key];
    },
    //退出登录
    quit() {
      let that = this;
      that.$confirm({
        title: "是否退出登录？",
        content: "退出登录后需重新登入",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          sessionStorage.clear();
          that.$router.replace("/login");
        },
        onCancel() {},
      });
    },

    getTimestamo() {
      let times = Date.parse(new Date());
      return times / 1000;
    },

    allNotice() {
      this.$success({
        type: "",
        title: "公告栏",
        // JSX support
        content: (
          <div>
            {this.noticeList.map((x, index) => (
              <div>
                <h4 style="color:#1890ff" key={x.fid}>
                  {index + 1}、{x.title}
                </h4>
                <p>{x.content}</p>
              </div>
            ))}
          </div>
        ),
      });
    },
  },
  watch: {
    $route(to) {
      if (to.name === "userList") {
        this.openKeys = [1];
        this.selectOpenKeys=["userList"]
      }
    },
  },
};
</script>
<style lang='less'>
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
