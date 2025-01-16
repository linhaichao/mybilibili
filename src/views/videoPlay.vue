<template>
  <div>
    <homeHeader></homeHeader>
    <div class="playBody">
        <div class="bodyLeft">
            <div class="videobody">
                <div class="videotitle">
                    <h1>标题</h1>
                    <div class="videotime">时间：</div>
                </div>
                <div class="video">
                    <!-- <playVideo></playVideo> -->
                </div>
                <div class="videoInfo">
                    <el-tooltip class="Info" effect="dark" :content="infoContent" placement="top">
                        <p>视频简介:</p>
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
                                :src="url"
                                fit="cover"></el-image>
                        </div>
                        <div class="username">用户名字</div>
                    </div>
                    <div class="authorjianjie">
                        用户简介：
                    </div>
                </div>
                <div class="authorvideo">
                    <div class="video2">
                        <div class="videoimg2"></div>
                        <div class="videoinfo2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import homeHeader from './homeHeader.vue'
// import playVideo from '@/components/playVideo.vue'
import Vue from 'vue'
import {Tooltip} from 'element-ui'
Vue.use(Tooltip);
export default {
name:'videoPlay',
components:{homeHeader},
data(){
    return {
        infoContent:'视频简介:',
        url:''
    }
}
}
</script>

<style lang="scss" scoped>
    *{
        padding: 0;
        margin: 0
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
            background-color: aliceblue;
            .author{
                width: 360px;
                height: 750px;
                margin-top: 10px;
                .authorinfo{
                    width: 100%;
                    height: 200px;
                    
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
                    background-color: beige;
                    .video2{
                        margin-top: 10px;
                        width: 100%;
                        height: 200px;
                        display: flex;
                        align-items: center;
                        background-color: aqua;
                        .videoimg2{
                            width: 250px;
                            height: 150px;
                        }
                        .videoinfo2{
                            width: 110px;
                            height: 100%;
                            background-color: azure;
                        }
                    }
                }
            }
        }
    }

</style>