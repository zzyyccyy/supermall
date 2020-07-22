import {request} from './request'

export function getHomeMD(){
  return request({
    url:'/home/multidata'
    // 这个函数返回值是promise
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })

}