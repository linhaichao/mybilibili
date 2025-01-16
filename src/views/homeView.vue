<template>
  <div class="home">
    <homeHeader></homeHeader>
    <div class="homebody">
      <div class="content">
        <div v-for="(item,index) in videoInfo" :key="index">
          <showCard :coverUrl="item.cover_url" :title="item.title" :time="item.created_time" :videoID="item.video_id"></showCard>
        </div>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[12]"
        :page-size="12"
        layout="total, sizes, prev, pager, next, jumper"
        :total=totalItem
        background
        hide-on-single-page>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import showCard from '@/components/showCard.vue'
import homeHeader from './homeHeader.vue'
import {Pagination} from 'element-ui'
import {userVideoInfo,totalVideo} from '@/api/api'
export default {
  name: 'homeView',
  components: {
    showCard,homeHeader,'el-pagination': Pagination,
  },
  data(){
    return {
      currentPage:1,
      userID:'',
      videoInfo:[],
      totalItem:0
    }
  },
  methods: {
      handleCurrentChange(val) {
        this.getUserVideoInfo(val)
        console.log(`当前页: ${val}`);
      },
      //页面发生改变触发回调
        getUserVideoInfo(page){
          userVideoInfo(page).then(res=>{
          if(res.data.code == 200){
            this.videoInfo = res.data.info
          }
        })
      },
      //获取视频总数
      getTotalVideo(){
        totalVideo().then(res=>{
          if(res.data.code == 200){
            this.totalItem = res.data.count
          }
        })
      },
    },
    mounted(){
      this.getUserVideoInfo(1);
      this.getTotalVideo();
    }
}
</script>
<style lang="scss" scoped>
*{
  padding: 0;
  margin: 0;
}
  .homebody{
    width: 1600px;
    height: 100%;
    margin: 0 auto;
    .content{
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
        *{
          width: calc(25% - 10px); 
          margin: 10px 0 0 10px;
        }
      }
      .el-pagination{
        margin: 10px auto;
      }
  }
</style>

