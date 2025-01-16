const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: 'all',
    proxy:{
        "/":{
            target:'https://video.hardews.cn',//跨域请求的公共地址
            ws:false, //也可以忽略不写，不写不会影响跨域
            secure: false,
            changeOrigin:true,
        }
    }
},
})
