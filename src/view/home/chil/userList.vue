<template>
  <div class="userListBox">
    <a-breadcrumb>
      <a-breadcrumb-item href="">
        <router-link to="/home" title="回首页">
          <a-icon type="home" />
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        <a-icon type="user" />
        <span>用户管理</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item> 用户列表 </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="topBox">
      <a-form style="margin: 20px" layout="inline" @submit="onSearch" :form="form">
        <a-form-item>
          <a-input placeholder="请输入姓名"  v-decorator="searchRules.name" allowClear />
        </a-form-item>
        <a-form-item>
          <a-select  v-decorator="searchRules.pay_type"  allowClear class="input"  placeholder="请选择">
                <a-select-option :vlaue='1' :key="1" >
                  微信
                </a-select-option>
                <a-select-option :vlaue='2' :key="2">
                  支付宝
                </a-select-option>
                <a-select-option :vlaue='3' :key="3">
                  其他
                </a-select-option>
              </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" htmlType="submit" icon="search">搜索</a-button>
        </a-form-item>
      </a-form>
      <div class="rightbut">
         <a-button type='primary' class="but" @click="addPay">新增支付记录</a-button>
      </div>
    </div>

    <a-table
      :loading="loading"
      table-layout="fixed"
      :pagination="pagination"
      :rowKey="el => (el.id+','+el.name)"
      :columns="columns"
      :data-source="dataSource"
    >
      <span slot="pay" slot-scope="text">
        <span v-if='text.pay_type==1'>
          微信
        </span>
        <span v-if='text.pay_type==2'>
          支付宝
        </span>
        <span v-if='text.pay_type==3'>
          其他
        </span>
      </span>

      <span slot="action" slot-scope="text">
        <a href="#" @click="showDeleteConfirm(text)" style="color: red"
          >删除</a
        >
        <a-divider type="vertical" />
        <a href="#" @click="showEdit(text)" style="color: green">编辑信息</a>
        <a-divider type="vertical" />
      </span>
    </a-table>
    <a-modal  destroyOnClose  :title="'新增支付'" :visible="showpayAdd" @ok="showpayOK" @cancel="showpayAdd = false" :width="750">
      <a-form :form="addPayForm" >
      <a-row :gutter="24">
          <a-col :span="12">
              <a-form-item label="姓名">
                <a-input class="input" placeholder="请填写" v-decorator="payRules.name" />
              </a-form-item>
            </a-col>
          <a-col :span="12" >
            <a-form-item  label="支付方式">
              <a-select v-decorator="payRules.pay_type" class="input" placeholder="请选择">
                <a-select-option :vlaue='1' :key="1" >
                  微信
                </a-select-option>
                <a-select-option :vlaue='2' :key="2">
                  支付宝
                </a-select-option>
                <a-select-option :vlaue='3' :key="3">
                  其他
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
      </a-row>
    <a-row :gutter="24">
        <a-col :span="12">
            <a-form-item label="支付金额">
              <a-input class="input" placeholder="请填写" v-decorator="payRules.money" />
            </a-form-item>
          </a-col>
        <a-col :span="12">
            <a-form-item label="日期" >
              <a-date-picker class="input" placeholder="请填写日期" v-decorator="payRules.date" />
            </a-form-item>
        </a-col>
    </a-row>
    <a-row :gutter="24">
        <a-col :span="24">
            <a-form-item label="订单备注">
              <a-textarea name="" id="" rows="10" v-decorator="payRules.remark"></a-textarea>
            </a-form-item>
          </a-col>
    </a-row>
    </a-form>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: "name",
    key: "name",
    title: "用户",
  },
  {
    title: "支付方式",
    key: "pay",
    scopedSlots: { customRender: "pay" },
  },
  {
    title: "支付金额",
    key: "money",
    dataIndex: "money",
  },
  {
    title:'时间',
    key:'date',
    dataIndex:'date'
  },
  {
    title: "备注",
    key: "remark",
    dataIndex: "remark",
  },
  {
    title:'操作',
     key: "action",
    scopedSlots: { customRender: "action" },
  }
];
const payRules = {
  name:['name',{ rules: [{ required: true, message: '请输入姓名' }] }],
  pay_type:['pay_type',{ rules: [{ required: true, message: '请选择支付方式' }] }],
  date:['date' ,{ rules: [{ required: true, message: '请选择时间' }] }],
  money:['money', { rules: [{ required: true, message: '请选择时间' },validator.number] }],
  remark:['remark',{ rules: [{ required: true, message: '请输入订单备注' }] }],
}
const searchRules = {
  name:['name'],
  pay_type:['pay_type'],
}
import axios from '@/utils/axios'
import moment from 'moment'
import { validator } from '@/utils/index'

export default {
  data() {
    return {
      dataSource: [],
      columns,
      // 删除
      deleteMsg: "",
      // 权限
      visiblePop1: false,
      authMsg: "",
      authTagDel: [],
      showAuthadd: false,

      //编辑
      visibleAuth: false,
      editMsg: "",
      //表格
      loading: false,
      form1: this.$form.createForm(this, { name: "edit" }),
      // pagination: {
      //   defaultPageSize: 10,
      //   showTotal: (total) => `共${total}条数据`,
      //   pageSizeChanger: true,
      // },
      searchInput: "",

      //新增
      form:this.$form.createForm(this, { name: "form" }),
      searchRules,
      pagination:{},
      addPayForm:this.$form.createForm(this, { name: "addPayForm" }),
      listId:null,
      showpayAdd: false,
      payRules,
    };
  },

  created() {
    this.getPayList()
    axios.post('/admin/monthPayList',{
      name:'东东',
      date:'2021-12-10',
    },{useJSONContentType:true}).then((res)=>{
      console.log(res)
    })
  },
  mounted() {},
  computed: {
    total() {
      return this.data.length;
    },
  },

  methods: {
    //列表
    getPayList(){
      axios.post('/admin/paylist',this.pagination,{useJSONContentType:true}).then((res)=>{
      // console.log(res.data.list)
      const object = res.data
      if(object.state.success){
        const data = object.list
        data.forEach(el => {
          el.date = moment(el.date).format('YYYY-MM-DD')
        });
        this.dataSource=data
      }
      
    })
    },
    //新增
    addPay() {
      this.showpayAdd = true;
      this.listId=null
    },
    showpayOK(){
      console.log('ok')
      this.addPayForm.validateFields((err,values)=>{
        if(!err){
          if(values.date){
            values.date=moment(values.date).format('YYYY-MM-DD')
          }
          const params = {
            ...values,
            id:this.listId
          }
          console.log(params)
          
          axios.post('/admin/addPay',params,{useJSONContentType:true}).then((res)=>{
            console.log(res)
            if(res.data.state.success){
              this.$message.success('添加/修改成功')
              this.showpayAdd = false;
               this.getPayList()

            }else{
              this.$message.success('添加/修改失败')
            }
          })
        }
      })
    },

    //点击搜索时
    onSearch(e) {
           e.preventDefault()
      this.form.validateFields((err,values)=>{
        if(!err){
          this.pagination.name = values.name
          this.pagination.pay_type = values.pay_type
          this.getPayList()
        }
      })
    },

    //删除
    showDeleteConfirm(text) {
      this.$confirm({
        title: '删除',
        content: `是否删除该条“${text.remark}”记录`,
        onOk:()=>{
          // console.log(text.id);
          axios.post('admin/deletePay',{id:text.id}).then((res)=>{
            if(res.data.state.success){
              this.$message.success('删除成功')
               this.getPayList()

            }else{
              this.$message.success('删除失败')
            }
          })
          

        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },

    //修改
    showEdit(text) {
      this.showpayAdd = true;
      this.listId = text.id
      this.$nextTick(()=>{  
        this.addPayForm.setFieldsValue({
          name:text.name,
          pay_type:text.pay_type,
          date:text.date,
          money: text.money,
          remark:text.remark,
        })
      })
      

    },
    editOk() {
      console.log("修改数据");
    },
    editCancel() {
      this.visiblePop1 = false;
    },

    //权限
    showAuth(index) {
      this.authMsg = index;
      this.visibleAuth = true;

      // console.log(this.total)
    },
    authCencel1() {
      this.visibleAuth = false;
      this.authMsg = "";
    },
    authOk1() {
      
    },

    authCloseTag(tag) {
      this.authTagDel.push(tag);
      // console.log(this.authTag)
    },
    addTags() {
      // const addTagIndex = this.findMsgIndex(this.authMsg)
      // console.log(addTagIndex)
      this.showAuthadd = true;
    },
    authAddtags() {
      console.log(1);
    },
  },
};
</script>

<style lang="less" scoped>
.userListBox {
}
.searchBox {
  width: 400px;
  float: left;
  margin: 20px 0px 10px 10px;
  z-index: 999;
}
.authMsgBox {
  .addTags {
    cursor: pointer;
  }
}
.input {
  width: 300px;
}
.topBox {
  width: 100%;
  justify-content: space-between;
  align-items: center;
    display: flex;
 .but{
   width: 150px;
 }
}
.rightbut{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .but{
    margin-top: 5px;
  }
}
</style>
