import {request} from "./request"

export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
// 详情页推荐
export function getRecommend(){
  return request({
    url:'/recommend',

  })
}

// 详情页图片下面标题等细节数据
export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
// 详情页下面店铺数据
export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans =shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}
// 详情页参数
export class GoodsParam {
  constructor(info,rule){
    // 注：images可能没有值（某些商品有，某些没有）
    this.image = info.image? info.image[0] : '';
    this.infos = info.set;
    this.sizes =rule.tables;
  }
}
