// 一些配置：打包时会将系统配置合并

module.exports = {
  configureWebpack: {
    resolve: {//配置路径相关的使用resolve
      alias:{
        // '@':'src'  文件内部自动配置了
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}