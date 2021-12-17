<template>
  <div class="userListBox">
        <!-- <div class="topBox">
            <a-button type="primary" htmlType="submit" icon="search">搜索</a-button>
        </div> -->
        <div class="content">
            <div class="leftBox" >
                <a-divider>暂未使用的支出类型</a-divider>
                <div class="usedBox">
                    <template v-for="(item,index) in beuseStateList" >
                    <div :key="index">

                        
                     <a-tag 
                        closable 
                        @click="clickTag1(index,'not')"
                        @close="usedClose1(index,'not',item.beuse)"
                        :class="[ tagarrClass1[index]? 'tagChange': '','tag']" style="margin-right:0px"    :color="item.color"   :value='item.beuse'>
                            <span>{{item.beType}}</span>
                     </a-tag>
                    <a-icon class="usedbox-icon" @click="edit('not',item)" type="setting" />
                        
                    </div>
                    
                    </template>
                </div>
                <a-button class="add_tag" @click="addTag"  type='primary'>
                    添加类型标签
                </a-button>
                    
            </div>
            <div class="changeIcon">
                    <a-tooltip   placement="top">
                        <template slot="title">
                        <span v-if="!tagarrIndex2.length">
                           左侧暂未选择数据 <a-icon type="arrow-right" />
                        </span>
                        <span v-else>
                            左侧已选择{{tagarrIndex2.length}} <a-icon type="arrow-right" />个标签
                        </span>
                        </template>
                        <a-icon class="changeIcon_icon" @click="useNot" type="double-left"  />
                    </a-tooltip>
                    <a-tooltip  placement="top">
                        <template slot="title">
                        <span v-if="!tagarrIndex1.length"><a-icon type="arrow-left" /> 右侧暂未选择数据</span>
                        <span v-else>
                            <a-icon type="arrow-left" /> 右侧已选择{{tagarrIndex1.length}}个标签
                        </span>
                        </template>
                        <a-icon class="changeIcon_icon" @click="useBe" type="double-right"  />
                    </a-tooltip>
            </div>
            <div class="leftBox" >
                <a-divider>正在使用的支出类型</a-divider>
                <div class="usedBox">

                    <template v-for="(item,index) in beuseList" >
                    <div :key="index">

                        <a-tag 
                        closable 
                        @click="clickTag1(index,'used')"
                        @close="usedClose1(index,'used',item.beuse)"
                        :class="[ tagarrClass2[index]? 'tagChange': '','tag']" style="margin-right:0px"    :color="item.color" :key="index"  :value='item.beuse'>
                            <span>{{item.beType}}</span>
                        </a-tag>
                    <a-icon class="usedbox-icon" @click="edit('not',item)" type="setting" />

                    </div>

                    </template>
                    </div>
                <div class="add_tag">
                        <a-button class="save" @click="saveList" type="primary" :loading='saveListLoading'>保存</a-button>
                </div>
            </div>
        </div>
       
        
        
        <a-modal  :zIndex='10' :confirm-loading="addtagLoading" destroyOnClose  ok-text='确认' cancel-text='取消' :title="'新增支出类型'" :visible="addTagModel" @ok="addTagOK" @cancel="()=>{addTagModel = false}" :width="400">
      <a-form :form="addTagform"   :label-col="{ span: 7 }" >
          <a-row :gutter="24">
            <a-col :span="24">
                <a-form-item label="颜色">
                    <span style="border-bottom:1px solid black">
                        <colorPicker v-model="color"  />
                    </span>
                    {{color}}
                </a-form-item>
            </a-col>
        </a-row>
        <a-row :gutter="24">
            <a-col :span="24">
                <a-form-item label="标签" >
                    <a-input class="input" placeholder="请填写" v-decorator="tagRules.title" />
                </a-form-item>
            </a-col>
        </a-row>
        
    </a-form>
    </a-modal>

  </div>
</template>

<script>


import axios from '@/utils/axios'
import moment from 'moment'
import { validator } from '@/utils/index'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import draggable from 'vuedraggable'
const tagRules = {
    title:['title' ,{ rules: [{ required: true, message: '请填写标签名' },{max:4,message:'标签名最多只能为四个字符'}] }],
    color:['color'],
}

export default {
 components:{
        // draggable
    },
  data() {
    return {
      

      //颜色
      color: '#00000',
      beuseList:[],
      beuseStateList:[],
      startItem:null,
      enterItem:null,
      leftFlag:false,
      tagarrClass1:[],
      tagarrIndex1:[],
      tagarrClass2:[],
      tagarrIndex2:[],
      saveListLoading:false,

      //添加标签
      addTagModel:false,
      addTagform: this.$form.createForm(this, { name: "addTag" }),
      tagRules,
      addtagLoading:false,
      editId:null,

    };
  },

  
  computed: {
    total() {
      return this.data.length;
    },
  },
  watch:{
    beuseList(newVal){
        let arr = []
        newVal.forEach((el,index) => {
                arr.push(false)
        });
        this.tagarrClass2=arr
    },
    beuseStateList(newVal){
        let arr = []
        newVal.forEach((el,index) => {
                arr.push(false)
        });
        this.tagarrClass1=arr
    },
    tagarrClass2(newVal){
        let arr = []
        newVal.forEach((el,index) => {
            if(el){
                arr.push(index)
            }
        });
        this.tagarrIndex2=arr
    },
    tagarrClass1(newVal){
        let arr = []
        newVal.forEach((el,index) => {
            if(el){
                arr.push(index)
            }
        });
        this.tagarrIndex1=arr
    },
  },

  methods: {
      //获取类型方式列表
    getBeuseList(){
        this.beuseList=[]
        this.beuseStateList=[]
      axios.post('/admin/beuseList').then((res)=>{
        const object = res.data
      if(object.state.success){
            const data = object.list
            data.forEach(el => {
                if(el.state==1){
                    this.beuseList.push(el)
                }else if(el.state==0){
                    this.beuseStateList.push(el)
                }
            });
      }
      })
    },
// draggable 属性规定元素是否可拖动
// dragstart 事件在用户开始拖动元素或选择的文本时触发
// dragover 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
// dragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
// dragend - 用户完成元素拖动后触发
    handleDragEnd(event,index){
        let s = this.startItem
        let e = this.enterItem
        let Sindex = this.beuseList.indexOf(s)
        let Eindex = this.beuseList.indexOf(e)
        if(s!=e){
            this.beuseList[Eindex]=s
            this.beuseList[Sindex]=e
        }
    },
    handleDragstart(e,item){
        this.startItem=item
        this.enterItem=item
    },
    handleDragenter(e,item){
        if(item!=this.startItem){
            this.enterItem=item
        }
    },

    clickTag1(index,tag){
        console.log(index)
        if(tag=='not'){
            if(this.tagarrClass1[index]==true){
                this.tagarrClass1.splice(index,1,false)
            }else{
                for (const i in this.tagarrClass1) {
                    if(i==index){
                        this.tagarrClass1.splice(index,1,true)
                    }
                }
                
            }

        }else{
            //样式
            if(this.tagarrClass2[index]==true){
                this.tagarrClass2.splice(index,1,false)
            }else{
                for (const i in this.tagarrClass2) {
                    if(i==index){
                        this.tagarrClass2.splice(index,1,true)
                    }
                    
                }
            }

        }
        

        
        
    },
    usedClose1(index,tag,beuse){
        if(tag=='not'){
            this.beuseStateList[index].state=3
        }else{
            console.log(this.beuseList[index])
            this.beuseList[index].state=3
        }
        // console.log(this.deleteUseList)
        // console.log(this.deleteNotList)
    },
    edit(tag,item){
        this.addTagModel=true
        this.$nextTick(()=>{
                this.addTagform.setFieldsValue({
                    title:item.beType
                })
                this.color=item.color
                this.editId=item.beuse
        })
    },
    useNot(){
        if(this.tagarrIndex2){
            let Carr = []
            for (const index of this.tagarrIndex2) {
                const info = this.beuseList[index]
                this.beuseStateList.push(info)
                // this.tagarrClass2.splice(item,1)
                Carr.push(info)
            }
            for(const item of Carr){
                const index = this.beuseList.indexOf(item)
                this.beuseList.splice(index,1)

            }
            this.tagarrClass2=[]

        }

    },
    useBe(){
        if(this.tagarrIndex1){
            let Carr = []

            
            for (const index of this.tagarrIndex1) {
                const info = this.beuseStateList[index]
                this.beuseList.push(info)
                // this.tagarrClass2.splice(item,1)
                Carr.push(info)
            }
            for(const item of Carr){
                const index = this.beuseStateList.indexOf(item)
                this.beuseStateList.splice(index,1)

            }
            this.tagarrClass1=[]

        }

    },
    saveList(){
        let BeArr = []
        let NotArr = []
        this.beuseList.forEach(el => {
            if(el.state == 0){  
                BeArr.push({
                    beuse:el.beuse,
                    state:1,
                })
            }else if(el.state == 3){
                BeArr.push({
                    beuse:el.beuse,
                    state:3,
                })
            }
        });
        this.beuseStateList.forEach(el => {
            if(el.state == 1){
                NotArr.push({
                    beuse:el.beuse,
                    state:0,
                })
            }else if(el.state == 3){
                NotArr.push({
                    beuse:el.beuse,
                    state:3,
                })
            }
        });
        console.log(BeArr)
        console.log(NotArr)
        const params = {
            list:BeArr.concat(NotArr)
        }
        
        this.saveListLoading=true
        if(params.list.length){
            axios.post('/admin/saveBeuseList',params,{useJSONContentType:true}).then((res)=>{
                const object = res.data.state
                if(object.success){
                    const data = object.list
                    this.$message.success('保存成功',1).then(()=>{
                        this.saveListLoading=false
                        this.getBeuseList()
                    })
                }else{
                    this.$message.error('操作失败',1).then(()=>{
                        this.saveListLoading=false
                        this.getBeuseList()
                    })
                }
            })
        }else{
            this.$message.warning('暂无更改',1).then(()=>{
                        this.saveListLoading=false
                })
        }
        
        
    },
    addTag(){
        this.addTagModel = true
    },
    addTagOK(){
        this.addTagform.validateFields((err,values)=>{
            if(!err){
                this.addtagLoading=true
                const params ={
                    beType:values.title,
                    color:this.color,
                    beuse:this.editId
                }
                axios.post('/admin/addBeuse',params).then((res)=>{
                    const object = res.data.state
                    if(object.success){
                        const data = object.list
                        this.$message.success('保存成功',1).then(()=>{
                            this.addtagLoading=false
                            this.addTagModel=false

                            this.getBeuseList()
                        })
                    }else{
                        this.$message.error('操作失败',1).then(()=>{
                            this.addtagLoading=false
                            this.addTagModel=false
                            this.getBeuseList()
                        })
                    }
                })
            }
        })
    }

  },
  created() {
    this.getBeuseList()

  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.userListBox{
}

.input{
    width: 160px;
  }
.content{
    justify-content: space-around;
    display: flex;
    flex-flow: wrap;
    width: 100%;
    .changeIcon{
        justify-content: center;
        align-items: center;
        display: flex;
        flex-flow: wrap;
        width: 30px;
        font-size: 50px;
        .changeIcon_icon{
            cursor: pointer;
        }
    }
    .leftBox{
    width: 500px;
    height: 75vh;
    justify-content: center;
        align-items: center;
        display: flex;
        flex-flow: wrap;

    .title{
        width: 100%;
    }
    .usedBox{
         width: 100%;
         border: 1px solid rgb(130, 195, 255);
         box-shadow: 0 5px 15px rgb(202, 229, 255);
         margin-top: 10px;
         height: 90%;
         justify-content: flex-start;
         flex-wrap: wrap;
         align-content: flex-start;
         display: flex;
         .tag{
            width:80px; 
            margin-left: 13px;
            margin-top: 13px;
            height:35px;

        }
        .tagChange{
            box-shadow: 0px 4px  rgb(66, 201, 255);
            border: 4px solid rgb(255, 255, 255);
        }
        .usedbox-icon{
            margin-left: 28px;
            position: absolute;
            display: flex;
            margin-left: 76px;
            margin-top: -18px;
            font-size: 13px;
            color: white;
            
        }

         
     }
     .add_tag{
         position: relative;
         top: -16px;
         .save{
            width: 120px;
        }
     }
    
}
}
.saveBox{
    width: 100%;
    justify-content: space-around;
    display: flex;
    flex-flow: wrap;
    margin-top: 20px;
    
}


</style>
