<template>
  <div>
    <div class="header">
        <el-button type="info" plain @click="back">返回</el-button>
    </div>
    <div class="playBody">
        <div class="bodyLeft">
            <div class="videobody">
                <div class="videotitle">
                    <h1>{{videoInfo.title}}</h1>
                    <div class="videotime">时间：{{ videoInfo.created_time }}</div>
                </div>
                <div class="video">
                    <playVideo></playVideo>
                </div>
                <div class="videoInfo">
                    <el-tooltip class="Info" effect="dark" :content="`视频简介：`+videoInfo.introduction" placement="top">
                        <p>视频简介:{{ videoInfo.introduction }}</p>
                    </el-tooltip>
                </div>
            </div>
        </div>
        <div class="bodyRight">
            <div class="author">
                <div class="authorinfo">
                    <div class="authorheader">
                        <div class="userimg">
                            <el-image
                                style="width: 100px; height: 100px;border-radius: 50%;"
                                :src=userInfo.avatar_url
                                fit="cover"></el-image>
                        </div>
                        <div class="username"><h2>{{ userInfo.nick_name }}</h2></div>
                    </div>
                    <div class="authorjianjie">
                        &nbsp;&nbsp;用户简介：{{ userInfo.introduction }}
                    </div>
                </div>
                <div class="authorvideo">
                    <div class="video2" v-for="(item,index) in moreVideoInfo" :key="index">
                        <div class="videoimg2">
                            <el-image
                            style="width: 250px; height: 150px;"
                            :src="item.cover_url"
                            fit="cover"
                            @click="enterUrl"></el-image>
                        </div>
                        <div class="videoinfo2">
                            {{ item.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import playVideo from '@/components/playVideo.vue'
import Vue from 'vue'
import {Tooltip,Image,Button} from 'element-ui'
Vue.use(Tooltip);
Vue.use(Image);
Vue.use(Button);
import {videoInfo,userInfo,userVideoInfo} from '@/api/api'
export default {
name:'videoPlay',
components:{playVideo},
data(){
    return {
        videoInfo:'',
        userInfo:'',
        moreVideoInfo:''
    }
},
mounted(){
    this.getVideoInfo();
    this.getUserVideoInfo();
},
methods:{
    //获取视频详细信息
    getVideoInfo(){
        let id = this.$route.params.videoID
        videoInfo(id).then(res=>{
            if(res.data.code == 200){
                this.videoInfo = res.data.info
            }
            this.getUserInfo(res.data.info.author_id)
        })
    },
    //获取用户信息
    getUserInfo(id){
        userInfo(id).then(res=>{
            if(res.data.code == 200){
                this.userInfo = res.data.info
            }
        })
    },
    //获取用户简略视频信息
    getUserVideoInfo(){
        userVideoInfo(1).then(res=>{
            if(res.data.code == 200){
                this.moreVideoInfo = res.data.info
            }
        })
    },
    //点击右边视频刷新数据
    enterUrl(e){
        let videoinfo = this.moreVideoInfo.find(a=>{
            return a.cover_url == e.target.src
        })
        videoInfo(videoinfo.video_id).then(res=>{
            if(res.data.code == 200){
                this.videoInfo = res.data.info
            }
            this.getUserInfo(res.data.info.author_id)
        })
        // location.reload()
    },
    back(){
        this.$router.push('/')
    }
}
}
</script>

<style lang="scss" scoped>
    *{
        padding: 0;
        margin: 0
    }
    .header{
        width: 100%;
        min-width: 1200px;
        height: 100px;
        background-color: rgb(235, 235, 235);
        margin-bottom: 10px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        .el-button{
            position: absolute;
            top: 40px;
            left: 100px;
            padding: 10px 15px;
        }
        }
    .playBody{
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-wrap: nowrap;
        .bodyLeft{
            width: 70%;
            .videobody{
                width: 800px;
                height: 750px;
                margin: 10px auto;
                .videotitle{
                    width: 100%;
                    height: 100px;
                    h1{
                        height: 70px;
                        text-align: start;
                        line-height: 70px;
                    }
                    .videotime{
                        height: 30px;
                        text-align: start;
                        line-height: 30px;
                        font-size: 16px;
                    }
                }
                .video{
                    width: 100%;
                    height: 600px;
                    background-color: beige;
                }
                .videoInfo{
                    width: 100%;
                    height: 50px;
                    .Info{
                        width: 800px;
                        height: 50px;
                        margin-top: 10px;
                        overflow: hidden;
                        text-align: start;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        word-wrap: break-word;
                        word-break: keep-all;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        cursor: pointer;
                        font-size: 15px;
                        &:hover{
                            color:skyblue,
                        }
                    }
                }
            }
        }
        .bodyRight{
            width: 30%;
            padding: 0 10px;
            .author{
                width: 360px;
                height: 750px;
                .authorinfo{
                    padding-top: 10px;
                    width: 100%;
                    height: 200px;
                    background-color: rgb(228, 228, 228);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
                    .authorheader{
                        width: 100%;
                        height: 100px;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        margin-bottom: 20px;
                        .usernimg{
                            width: 90px;
                            height: 90px;
                            border-radius: 50%;
                        }
                        .username{
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            cursor: pointer;
                        }
                    }
                    .authorjianjie{
                        width: 100%;
                        height: 80px;
                        overflow: hidden;
                        text-align: start;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        word-wrap: break-word;
                        word-break: keep-all;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 4;
                        cursor: pointer;
                        font-size: 15px;
                    }
                }
                .authorvideo{
                    width: 100%;
                    height: 500px;
                    display: flex;
                    flex-direction: column;
                    overflow: auto;
                    .video2{
                        margin-top: 10px;
                        width: 100%;
                        height: 200px;
                        display: flex;
                        align-items: center;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
                        .videoimg2{
                            width: 250px;
                            height: 150px;
                            cursor: pointer;
                        }
                        .videoinfo2{
                            width: 110px;
                            height: 100%;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

</style>