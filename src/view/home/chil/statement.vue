<template>
  <div class="staBox">
    <!-- <vue2-org-tree 
	:data="Treedata" 
	@on-expand="onExpand"
  label-class-name="labelClassName"
  @on-node-mouseover="onMouseover"
  collapsable
/> -->
      <a-breadcrumb>
      <a-breadcrumb-item href="" >
        <router-link to="/home" title="回首页">
          <a-icon type="home"  />
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        <a-icon type="user" />
        <span>数据报表</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        数据可视
      </a-breadcrumb-item>
    </a-breadcrumb>

    <div id="main" style="width: 100%;marginTop:20px ;height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

//

export default {
  data() {
    return {
      data1: {
        code: 1,
        msg: "ok",
        softname: "goSALE",
        chinesename: "开博销售仓库管理系统",
        cscode: "PUBLIC_TRIAL",
        csname: "演示帐套",
        uid: "10E3CE55D2F2BF24F8EDEFF52C5677E7",
        uname: "admin",
        upwd: "",
        ifadmin: "1",
        cshint:
          "演示帐套，数据仅供测试，勿录入正式数据！ [支持微信小程序手机开单！配套APP、浏览器H5]",
        csexpirydate: "2030-12-31",
        csminiflag: "2",
        csmininame: "旗舰版",
      },
      boardres: "",
    };
  },
  created() {
    // this.$http
    //   .get("https://kbapi.dianlan8.com:7804/kbapi/rest/gorptjingyingkanban", {
    //     params: postdata,
    //   })
    //   .then((res) => {
    //     // console.log(res)
    //     this.boardres = res;
    //     console.log(this.boardres);
    //   });
    this.getboraddata();
  },
  mounted() {
    // console.log(this.getborad);
  },
  methods: {
    getTimestamo() {
      let times = Date.parse(new Date());
      return times / 1000;
    },
    async getboraddata() {
      const postdata = {
        timestamp: this.getTimestamo(),
        sig: "8D5A815A0D79A3F0C2CCB556FFB08B27",
        sns: this.data1.softname,
        cnstr: this.data1.csname,
        openid: "WEBopenid",
        uid: this.data1.uid,
        uname: this.data1.uname,
        upwd: this.data1.upwd,
        qxid: "1",
        begdate: "2021-01-01",
        enddate: "2021-08-02",
      };
      const res = await this.$http.get(
        "https://kbapi.dianlan8.com:7804/kbapi/rest/gorptjingyingkanban",
        { params: postdata }
      );
      this.boardres = res;
      console.log(this.boardres);
      //echarts
      let myChart = echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          text: "经营看板",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.boardres.data.series.map((v) => v.name),
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.boardres.data.xaxis4x || [],
        },
        yAxis: {
          type: "value",
        },
        series: this.boardres.data.series || [],
      });
    },
  },
};
</script>

<style lang="less">
.staBox {
  height: 100vh;
  overflow: auto;
}
.labelClassName {
  color: rgb(255, 255, 255);
  background-color: #1890ff;
  display: block;
  cursor: pointer;
}
.labelClassName:hover {
  box-shadow: 0px 1px 20px #6eb9ff;
  transition: 0.5s;
}
</style>