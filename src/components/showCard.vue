<template>
  <div>
    <el-card class="card"  :body-style="{ padding: '0px',margin:'0px' }" shadow="never" >
      <div class="picture">
        <el-image
          style="width: 360px; height: 200px;border-radius: 10px;"
          :src="url"
          fit="fit"
          @click="enterUrl"
          lazy></el-image>
      </div>
      <el-tooltip class="info" effect="dark" :content="infoContent" placement="bottom-start">
        <p>{{ infoContent }}</p>
      </el-tooltip>
      <el-tooltip class="author" effect="dark" :content="authorContent" placement="bottom-start">
        <p>{{ authorContent }}</p>
      </el-tooltip>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import {Card,Tooltip,Image} from 'element-ui'
Vue.use(Card);
Vue.use(Tooltip);
Vue.use(Image);
export default {
  name:'showCard',
  props:{
    infoContent:{
      type:String,
      default:'视频信息'
    },
    authorContent:{
      type:String,
      default:'作者信息'
    },
  },
  data(){
    return {
      url:require("../assets/logo.png")
    }
  },
  mounted(){
    
  },
  methods:{
    enterUrl(){
      this.$router.push('/videoPlay')
    }
  }
}
</script>

<style scoped lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  .card{
    padding-top: 5px;
    width: 370px;
    height: 265px;
    border:none;
  }
  .picture{
    width: 360px;
    height: 200px;
    margin: 0 auto;
    border-radius: 10px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .info{
    width: 360px;
    height: 40px;
    margin: 0 auto;
    overflow: hidden;
    text-align: start;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-wrap: break-word;
    word-break: keep-all;
    cursor: pointer;
    font-size: 14px;
    &:hover{
      color:skyblue,
    }
  }
  .author{
    width: 360px;
    height: 25px;
    margin: 0 auto;
    text-align: start;
    cursor: pointer;
    white-space: nowrap;      
    overflow: hidden;           
    text-overflow: ellipsis; 
    font-size: 14px;
    &:hover{
      color:skyblue,
    }
  }
</style>