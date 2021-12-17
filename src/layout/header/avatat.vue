<template>
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
  
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      adminName:null,
       noticeDot: true,
      noticeList: "",
      noticemenuShow: false,
    };
  },
  
  watch: {
    
  },
  methods: {
   
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
  beforeCreate() {

  },
  created() {
    
    this.adminName = sessionStorage.getItem("adminName");


  },
  destroyed() {
    
  },
  
};
</script>
<style lang='less' scoped>

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
