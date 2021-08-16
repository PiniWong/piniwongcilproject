<template>
  <div class="userListBox">
    
    <a-breadcrumb>
      <a-breadcrumb-item href="" >
        <router-link to="/home" title="回首页">
          <a-icon type="home"  />
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        <a-icon type="user" />
        <span>用户管理</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        用户列表
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-input-search 
      style="width:400px;margin:15px 0 10px 10px"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      v-model="searchInput"
      @search="onSearch"
      allowClear
      @change="searchChange"
    />
    <a-table :loading="loading" table-layout='fixed' :pagination="pagination" :columns="columns" :data-source="changedata">
      <span slot="admin" slot-scope="admin">
        <a-tag :key="admin" :color="admin=='管理员' ? 'red':(admin=='初级管理员' ? 'purple':'pink')">
          {{admin}}
        </a-tag>
      </span>
      
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag.name"
          color="green"
        >
          {{ tag.tname }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="index">
        <a href="#" @click="showDeleteConfirm(index)" style="color:red">删除</a>
        <a-divider type="vertical" />
        <a href="#" @click="showEdit(index)" style="color:green">编辑信息</a>
        <a-divider type="vertical" />
        <a href="#" @click="showAuth(index)">权限管理</a>
      </span>
    </a-table>

    <!-- 弹窗 -->
      <!-- 编辑信息 -->
    <a-modal
      title="编辑信息"
      :visible="visiblePop1"
      @ok="editOk"
      @cancel="editCancel"
    >
      <a-form :form="form1" class="aForm" :key="editMsg.key" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">

        <a-form-item label="用户" has-feedback   >
          <a-input 
          :value="editMsg.username"/>
        </a-form-item>  
        <a-form-item label="邮箱" has-feedback  >
          <a-input  :value="editMsg.email" />
        </a-form-item>
        <a-form-item label="手机号" has-feedback  >
          <a-input  :value="editMsg.phone" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 权限管理 -->
    <a-modal
      :title="authMsg.username+'/权限管理'"
      :visible="visibleAuth"
      @ok="authOk1"
      @cancel="authCencel1"
      class="authMsgBox"
    >
         <a-tag
          v-for="tag in authMsg.tags"
          :key="tag.name"
        closable
        color='green'
        @close="authCloseTag(tag.tname)"
        >
          {{ tag.tname }}
          </a-tag>
         <a-icon type="plus-square" class="addTags" @click="addTags" />

    </a-modal>
      <!-- 权限添加小框 -->
        <a-modal
        :title="authMsg.username+'/添加权限'"
        :visible="showAuthadd"
        @ok="authAddtags"
        @cancel="showAuthadd = false">

        </a-modal>
  </div>
</template>

<script>

const columns = [
  {
    dataIndex: 'username',
    key: 'username',
    slots: { title: 'customTitle' },
    title:'用户',
    sorter: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '用户级别',
    key: 'admin',
    dataIndex: 'admin',
    scopedSlots: { customRender: 'admin' },
  },
  {
    title: '权限标签',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: '修改权限',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];



export default {
  data() {
    return {

      data:'',
      changedata:[],
      columns,
      // 删除
      deleteMsg:'',
      // 权限
      visiblePop1:false, 
      authMsg:'',
      authTagDel:[],
      showAuthadd:false,

      //编辑
      visibleAuth:false,
      editMsg:'',
      //表格
      loading:false,
      form1: this.$form.createForm(this, { name: 'edit' }),
      pagination:{
        defaultPageSize:10,
        showTotal:total =>`共${total}条数据`,
        pageSizeChanger:true,
      },
      searchInput:'',
    };
  },


  created(){
      

      this.$http.get('/user/userInfo')
      .then(res=>{
        // console.log(res)
        const data = res.data.userlist
        this.data = data
        this.changedata =this.data
        console.log(this.changedata)
 
      }).catch(err=>{
        console.log(err)
      })

  },
  mounted(){
    
  },
  computed:{
    total(){
      return this.data.length
    },
    
  },



  methods:{
    //点解搜索时
    onSearch(){
      // console.log(this.searchInput)
      const data1 = this.data
      const data2 = data1.filter(item=>{
        return (item.username.match(this.searchInput)||item.email.match(this.searchInput)||(item.phone).toString().match(this.searchInput))
      })
      // console.log(data2)
      this.loading = true
      setTimeout(()=>{
         this.loading = false
         this.changedata = data2
      },300)
    },
    //当搜索框为空时
    searchChange(){
      if(!this.searchInput){
        this.loading = true
        setTimeout(()=>{
         this.loading = false
         this.changedata = this.data

        },300)
      }
    },


    //对应下标
    findMsgIndex(index){
        const msgKey = index.key
        //找到data对应的下标
          const msgIndex = this.data.findIndex(item=>{
              return item.key == msgKey
        })
        return msgIndex
    },

    //删除
    showDeleteConfirm(index) {
      let that = this
      this.$confirm({
        title: '是否删除该用户？',
        content: '请谨慎操作（删除后不可修复！！）',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk(){
          // that.changedata.splice(newIndex,1)
          that.data.splice(that.findMsgIndex(index),1)
          that.changedata.splice(that.findMsgIndex(index),1)
          that.$notification['success']({
            message: '删除用户成功',
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },

    //修改
    showEdit(index){
      this.visiblePop1=true
      this.editMsg=index
    },
    editOk(){
      console.log('修改数据')
    },
    editCancel(){
      this.visiblePop1=false
    },

    //权限
    showAuth(index){
        this.authMsg=index
        this.visibleAuth=true
      

      // console.log(this.total)
    },
    authCencel1(){
      this.visibleAuth=false;
      this.authMsg=''
    },
    authOk1(){
      //寻找对应项删除
      const authIndex = this.findMsgIndex(this.authMsg)
      // console.log(authIndex)
      if(this.authTagDel){
          this.authTagDel.forEach(element => {
            //找到data的tag的下标
            const findtag1 = this.data[authIndex].tags.findIndex(item=>{
              return item.tname == element
            })
            //删除对应data下标的tag
            // console.log(findtag1)
            this.data[authIndex].tags.splice(findtag1,1)
            // delete this.data[authIndex].tags[findtag1]
          });
        this.changedata = this.data
      }
      this.visibleAuth=false

    },

      authCloseTag(tag){
        this.authTagDel.push(tag)
        // console.log(this.authTag)
      },
      addTags(){
        // const addTagIndex = this.findMsgIndex(this.authMsg)
        // console.log(addTagIndex)
        this.showAuthadd=true

      },
      authAddtags(){
        console.log(1)
      }

    
  }
};
</script>

<style lang="less" scoped>

.userListBox{

}
.searchBox{
  width: 400px;
  float: left;
  margin: 20px 0px 10px 10px;
  z-index: 999;
}
.authMsgBox{
  .addTags{
    cursor: pointer;
  }
}
</style>