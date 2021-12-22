<template>
  <div class="login">
    <div class="loginBox">
      <a-form
        :form="form"
        class="aForm"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 12 }"
        @submit="sumbitPlay"
      >
        <h2>登录</h2>
        <a-form-item label="账号" has-feedback>
          <a-input
            v-decorator="RulesInput.username"
            class="accountInput"
            placeholder="请输入您的账号"
          />
        </a-form-item>
        <a-form-item label="密码" has-feedback>
          <a-input-password
            v-decorator="RulesInput.password"
            placeholder="请输入您的密码"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
          <div class="a-form-button">
            <a-button html-type="submit" type="primary" :loading="loading"
              >登录</a-button
            >
            <a-button type="register">注册</a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios";
import qs from "qs";
// import axios from "@/util/axios";
const RulesInput = {
  username: [
    "username",
    { rules: [{ required: true, message: "请输入你的账号" }] },
  ],
  password: [
    "password",
    { rules: [{ required: true, message: "请输入你的密码" }] },
  ],
};
export default {
  data() {
    return {
      formLayout: "horizontal",
      RulesInput,
      form: this.$form.createForm(this, { name: "coordinated" }),
      account: "huangzhibin",
      password: "123456789",
      loading: false,
    };
  },
  methods: {
    sumbitPlay(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          let params = qs.stringify({
            username: values.password,
            password: values.password,
          });
          axios.post("/admin/login", params,{useJSONContentType:true}).then((res) => {
            console.log(res);
            const state = res.data.state
            const data = res.data.data
            if (state.success) {
              this.loading = false;
              this.$message.success('~~登陆成功~~')
                const token = data.token
                window.sessionStorage.setItem('token',token)
                //存储name
                const adminName = data.userinfo.username
                window.sessionStorage.setItem('adminName',adminName)
                console.log(token)
                this.$router.replace({name:'payList'})
            }else{
              this.$message.warning('登陆失败，无该用户信息请前往注册~',3)
              this.loading = false;
            }
          });
        }
      });
    },
  },
  mounted(){
    this.form.setFieldsValue({
      username:'admin',
      password:'admin'
    })
  },
  created(){
    
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  float: left;
  background-color: #001529;
  justify-content: center;
  display: flex;
  align-items: center;
}

.loginBox {
  width: 40em;
  height: 30em;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .aForm {
    width: 90%;
    h2 {
      font-size: 60px;
      text-align: center;
    }
    .a-form-button {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>