<template>
  <div class="roleBox">
    <div class="topBox">
      <a-form  layout="inline" @submit="onSearch" :form="form">
        <a-form-item>
                <a-input style="margin-right:15px"  placeholder="请输入用户名搜索"  v-decorator="searchRules.searchText" class="input"></a-input>
          <a-button type="primary" htmlType="submit" icon="search">搜索</a-button>
        </a-form-item>
      </a-form>
      <div class="rightbut">
         <a-button type='primary' class="but" @click="addPay">新增支付记录</a-button>
      </div>
    </div>
    <div class="role">
      <a-table :columns="roletitle"  :data-source="roleData" :rowKey="el => (el.userId)">
        <div class="vip" slot-scope="text, record," slot="vip"  >
          <a-switch :loading='switchLoading' @click="switchClick(record)"  default-checked :checked='!!text'>
            <a-icon slot="checkedChildren" type="check"  />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </div>
        <div class="action" slot="action" >
          <span>删除</span>
          <span>编辑</span>
        </div>
      </a-table>
    </div>
    <a-modal  destroyOnClose  :title="'添加人员'" ok-text='确认' cancel-text='取消' :visible="showUserAdd" @ok="addUserOk" @cancel="showUserAdd = false" :width='700' >
      <a-form :form="addUserForm" >
         <a-row :gutter="24">
          <a-col :span="12">
                    <a-form-item label="人员姓名">
                      <a-input class="input" placeholder="请填写" v-decorator="addUserRules.name" />
                    </a-form-item>
            </a-col>
            <a-col :span="12">
                    <a-form-item label="性别">
                      <a-radio-group v-decorator="addUserRules.sex">
                        <a-radio :value="1">
                          男
                        </a-radio>
                        <a-radio :value="2">
                          女
                        </a-radio>
                      </a-radio-group>
                    </a-form-item>
            </a-col>
         </a-row>
         <a-row :gutter="24">
          <a-col :span="12">
                    <a-form-item label="手机号">
                      <a-input class="input" placeholder="请填写" v-decorator="addUserRules.phone" />
                    </a-form-item>
            </a-col>
            <a-col :span="12">
                    <a-form-item label="微信号">
                      <a-input class="input" placeholder="请填写" v-decorator="addUserRules.weixin" />
                    </a-form-item>
            </a-col>
         </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
const roletitle = [
  {
    key: 'index',
    title:'用户id',
    dataIndex: 'userId',

  },
  {
    title: '用户名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: '已打卡天数',
    dataIndex: 'card',
    key: 'card',
  },
  {
    title: '已记账天数',
    dataIndex: 'recordDate',
    key: 'recordDate',
  },
  {
    title: '已记账条目',
    dataIndex: 'recordNum',
    key: 'recordNum',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '微信号',
    dataIndex: 'weixin',
    key: 'weixin',
  },
  {
    title: '是否已开通vip',
    dataIndex: 'vip',
    key: 'vip',
    scopedSlots: { customRender: 'vip' },
  },
  {
    title: '鸭鸭币',
    dataIndex: 'coin',
    key: 'coin',
    scopedSlots: { customRender: 'coin' },
  },
  // {
  //   title: '操作',
  //   key: 'action',
  //   scopedSlots: { customRender: 'action' },
  // },
];
const searchRules = {
  searchText:['searchText'],
  pay_type:['pay_type'],
  date:['date'],
  month:['month']
}
const addUserRules = {
  name:['name', { rules: [{ required: true, message: '请输入人员名字' }] }],
  sex:['sex', { rules: [{ required: true, message: '请选择性别' }] }],
  phone:['phone', { rules: [{}] }],
  weixin:['weixin', { rules: [{}] }],
}
import axios from '@/utils/axios'

export default {
  name:'role',
  data(){
    return{
      roletitle,
      roleData:[],

      searchRules,
      form:this.$form.createForm(this, { name: "form" }),
      pagination:{},

      showUserAdd:false,
      addUserForm:this.$form.createForm(this, { name: "addUserForm" }),
      addUserRules,

      switchLoading:false,

    }
  },
  methods:{
    //点击搜索时
    onSearch(e) {
           e.preventDefault()
      this.form.validateFields((err,values)=>{
        if(!err){
          this.pagination.searchText = values.searchText
          this.getUserList()
        }
      })
    },
     getUserList(){
      axios.post('/admin/userInfo',this.pagination).then((res)=>{
        console.log(res)
        const object = res.data
        if(object.state.success){
          const data = object.list
          data.forEach(el => {
            el.sex = el.sex == 1 ? '男' :'女'
          });
          this.roleData = data
        }
      })
    },
     //新增人物
    addUser(){
      this.showUserAdd=true
      
    },
    addUserOk(){
      this.addUserForm.validateFields((err,values)=>{
        if(!err){
          const params = {
            ...values,
          }
          
          axios.post('/admin/addUser',params,{useJSONContentType:true}).then((res)=>{
            console.log(res)
            if(res.data.state.success){
              this.$message.success('添加/修改成功')
              this.showUserAdd = false;
              this.getUserList()
            }else{
              this.$message.success('添加/修改失败')
            }
          })
        }
      })
    },
    //开关
    switchClick(date){
      // console.log(date)
      let vip = date.vip == 1 ? 0 : 1
      console.log(vip)
      const params = {
        userId:date.userId,
        vip:vip
      }
      this.switchLoading=true
      axios.post('admin/changeVip',params).then(res=>{
        console.log(res)
        if(res.data.state.success){
              this.switchLoading = false;
                this.getUserList()
              this.$message.success('操作成功',1)
            }else{
                this.switchLoading = false;
              this.$message.success('操作失败',1)
            }
      })

    }

  },
  created(){
    this.getUserList()
  }
    
}

</script>

<style lang='less' scoped >
  .action{
    span{
      margin-right: 10px;
      &:nth-child(1){
        color: red;
      }
      &:nth-child(2){
        color: rgba(24, 144, 255);
      }
    }
  }
  .vip{
    span{
      margin-right: 10px;
    }
  }
  .input{
    width: 250px;
  }
  .topBox {
  width: 100%;
  justify-content: space-between;
  align-items: center;
    display: flex;
    margin-bottom: 10px;

 .but{
   width: 150px;
 }
 .input{
    width: 160px;
  }
  .rightbut{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .but{
    margin-top: 5px;
  }
}
 
}


</style>