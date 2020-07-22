import axios from 'axios'

export function request(config){
  // 使用promise
  // return new Promise((resolve,reject) =>{
    // 1.创建axios实例
    const instance = axios.create({   
      baseURL:'http://152.136.185.210:8000/api/n3',
      // baseURL:'http://123.207.32.32:8000',
      timeout:5000
    })

    // 2.axios拦截器，use两个参数都是函数
    // 2.1请求拦截
    instance.interceptors.request.use(config =>{
      return config
    },err =>{
      // console.log(err);
    }) 
    // 2.2响应拦截
    instance.interceptors.response.use(res =>{
      return res.data 
    },err =>{
      console.log("request失败");
    })

    // 3.发送真正的网络请求
    return instance(config)  //这个函数源码返回一个promise
    
}
