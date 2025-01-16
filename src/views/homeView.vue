<template>
  <div class="home">
    <homeHeader @getUserID="handleUserID"></homeHeader>
    <div class="homebody">
      <div class="content">
        <showCard></showCard>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4, 8, 12, 16]"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
        background>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import showCard from '@/components/showCard.vue'
import homeHeader from './homeHeader.vue'
import {Pagination} from 'element-ui'
import {userVideoInfo} from '@/api/api'
export default {
  name: 'homeView',
  components: {
    showCard,homeHeader,'el-pagination': Pagination,
  },
  data(){
    return {
      currentPage:1,
      userID:''
    }
  },
  methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleUserID(data){
        this.userID = data
        // this.getUserVideoInfo();
      },
        getUserVideoInfo(){
          userVideoInfo(this.currentPage).then(res=>{
          //替换
          console.log(res)
        })
      }
    },
    mounted(){
      this.getUserVideoInfo()
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
        margin: 0 auto;
      }
  }
</style>

