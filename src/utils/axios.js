import axios from 'axios'
import qs from 'qs'
import router from '../router';
import { message } from 'ant-design-vue'

const CancelToken = axios.CancelToken

//设置基础的url
axios.defaults.baseURL = '/api';

//设置默认请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'


let cancel = {}
// let promiseList = {}
// http request 拦截器
axios.interceptors.request.use(
    config => {
      let admin_jwt_token =window.localStorage.getItem('admin_jwt_token');
      // console.log(admin_jwt_token)
      config.headers.Authorization = `Bearer ${admin_jwt_token}`;
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(function(response){
      if(response.data && response.data.code){
        if (parseInt(response.data.code) === 401) {
            message.warning('登录过期请重新登录')
        }
        router.push('/login');
      }
      if(parseInt(response.data.code) === -1){
        message.warning('请求失败')
      }
      return response; 
  },function(error){
    console.log(error)
    // Do something with response error
    console.dir(error);
    message.warning('服务器连接失败')
    return Promise.reject(error);
  })


const checkCode = (res,config)=>{
    if(!config.warn){
        return res
    }
    if (res && (res.status === 200 || res.status === 304 || res.status === 400)) {
        if (res.data && !res.data.success) {
          // 没权限,没登录等数据错误
          const code = res.data.code
          if (code === 4) {
            console.log('axios code = 4， 未登录！')
            // util.login()
          }
        }
      } else {
        // code === 500 触发
        if (res.message !== 'requestRepeat') {
            message.error('网络或者服务器错误！', 5)
        }
      }
      return res
}


export default {
    post(url,data,config){
        return new Promise((resolve,reject)=>{
            const option = Object.assign(
                {
                    useJSONContentType:false,
                    warn:true,
                    
                },config
            )
            if(!option.useJSONContentType){
                data=qs.stringify(data)
            }
            axios({
                method:'POST',
                url,
                // cancelToken:new CancelToken(c=>{
                //     cancel = c
                // }),
                data:data,
                // timeout:10000,
                // headers:{
                //     'X-Requested-With': 'XMLHttpRequest'
                // }
            }).then(res=>{
                resolve(checkCode(res, option))
            })
        })
    }
}