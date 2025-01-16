const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: 'all',
    proxy:{
        "/":{
            target:'https://video.hardews.cn',//跨域请求的公共地址
            secure: false,
            ws:false,
            changeOrigin:true,
        }
    },
    client: {
        webSocketURL: 'wss://localhost:8080/ws',
    },
},
})
