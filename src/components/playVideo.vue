<template>
    <div class="main">
      <d-player ref="player" id="player" :options="options"></d-player>
    </div>
  </template>
  
  <script>
  export default {
    name: "playVideo",
    // props:{
    //     // cover_url:String,
    //     video_url:String,
    // },
    data() {
      return {
        options: {
          container: document.getElementById("dplayer"), //播放器容器
          mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
          theme: "#b7daff", // 风格颜色，例如播放条，音量条的颜色
          loop: false, // 是否自动循环
          lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
          screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
          hotkey: true, // 是否支持热键，调节音量，播放，暂停等
          preload: "auto", // 自动预加载
          volume: 0.7, // 初始化音量
          playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
          video: {
            type:'auto',
            url:require('@/assets/Screenrecorder-2025-01-10-23-04-38-641.mp4'), // 播放视频的路径
            // quality: [
            //   // 设置多个质量的视频
            //   {
            //     name: "高清",
            //     url:this.video_url,
            //     type: "auto" // 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或 其他自定义类型
            //   },
            //   {
            //     name: "标清",
            //     url:this.video_url,
            //     type: "auto"
            //   }
            // ],
            defaultQuality: 0, // 默认是高清
            pic:require("@/assets/logo.png"), // 视频封面图片
          },
        //   danmaku: {
        //     // 弹幕
        //     id: "9E2E3368B56CDBB4",
        //     api: "https://api.prprpr.me/dplayer/",
        //     token: "tokendemo", //后端验证令牌
        //     maximum: 1000, //弹幕最大数量
        //     addition: ["https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142"], //其他弹幕
        //     user: "DIYgod", //弹幕用户名
        //     bottom: "15%", //值，例如：10px，10％，即弹幕底部和播放器底部之间的距离，以防止遮挡字幕
        //     unlimited: true //即使弹幕重叠也显示所有弹幕
        //   },
          highlight: [
            //进度条上的自定义时间标记
            // 进度条时间点高亮
            {
              text: "10M",
              time: 6
            },
            {
              text: "20M",
              time: 12
            }
          ]
        }
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .main {
    width: 800px;
    height: 600px;
    margin: 0 auto;
    text-align: center;
  }
  #player{
    width: 800px;
    height: 600px;
  }
  </style>
  