<template>
  <div class="roleBox">
      <a-breadcrumb>
      <a-breadcrumb-item href="" >
        <router-link to="/home" title="回首页" >
          <a-icon type="home"  />
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        <a-icon type="user" />
        <span>角色分配</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        角色列表
      </a-breadcrumb-item>
    </a-breadcrumb>

    <div class="role">
      <a-button type='primary'>添加角色</a-button>
      <a-table :columns="roletitle"  :data-source="roleData">
      </a-table>
    </div>
  </div>
</template>

<script>
const roletitle = [
  {
    key: 'index',
    title:'#',
    slots: { title: 'customTitle' },
  },
  {
    title: '角色名称',
    dataIndex: 'Rname',
    key: 'Rname',
  },
  {
    title: '角色描述',
    dataIndex: 'Rmsg',
    key: 'Rmsg',
  },
  {
    title: '操作',
    key: 'edit',
    dataIndex: 'edit',
    scopedSlots: { customRender: 'edit' },
  },
];
export default {
  name:'role',
  data(){
    return{
      roletitle,
      roleData:''

    }
  },
  created(){
    this.$http.get('/role/roleInfo')
    .then(res=>{
      // console.log(res)
      this.roleData=res.data.roleList
      console.log(this.roleData)

    }).catch(err=>{
        console.log(err)
    })
  }
}

</script>

<style lang='less' >
 .roleBox{

  }
  .role{
    margin-top: 30px;
  }
</style>