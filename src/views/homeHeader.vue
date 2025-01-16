<template>
  <div>
    <div class="header">
      <div class="userInfo" v-if="userID">
        <div class="userimg">
          <el-image
              style="width: 80px; height: 80px;border-radius: 50%;"
              :src="userInfo.avatar_url"
              fit="cover"></el-image>
        </div>
        <div class="username">{{ userInfo.nick_name }}</div>
      </div>
      <div class="login" v-if="!userID">
        <el-button type="primary" round @click="login">登陆</el-button>
      </div>
      <div class="logout" v-else>
        <el-button type="primary" round @click="load">上传视频</el-button>
        <el-button type="warning" round @click="logout">登出</el-button>
      </div>
      <el-dialog
        title="登陆"
        :visible.sync="loginDialogVisible"
        width="500px"
        center>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
          <el-form-item label="账号" prop="user">
            <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn">
              <el-button type="primary" size="medium" @click="submitForm">登陆</el-button>
              <el-button type="warning" size="medium" @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        :visible.sync="loadDialogVisible"
        width="400px"
        center>
        <el-form :model="loadForm"  status-icon :rules="loadRules" ref="loadForm"  label-width="50px" class="demo-ruleForm">
          <el-form-item label="标题" prop="title" required>
            <el-input type="text" v-model="loadForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="封面" prop="cover" required>
            <el-upload
            action=""
            class="upload-demo"
            accept=".png,.jpg"
            :show-file-list="true"
            :http-request="loadImage"
            :on-remove="handleImageRemove"
            :file-list="imageList">
            <el-button size="small" type="primary">上传封面</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="视频" prop="video" required>
            <el-upload
            action=""
            class="upload-demo"
            accept=".mp4"
            :show-file-list="true"
            :http-request="loadVideo"
            :on-remove="handleVideoRemove"
            :file-list="videoList">
            <el-button size="small" type="primary">上传视频</el-button>
            <div slot="tip" class="el-upload__tip">只能上传mp4文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="简介" prop="introduction">
            <el-input type="textarea" :rows="3" v-model="loadForm.introduction" autocomplete="off" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn">
              <el-button type="primary" size="medium" @click="submitVideoForm('loadForm')">提交</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Button,Dialog,Form,FormItem,Input,Image,Upload} from 'element-ui'
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Image);
Vue.use(Upload);
import { Login ,userInfo,loadVideo} from '@/api/api';
export default {
    name:'homeHeader',
    data(){
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账户'));
        } else {
          if (this.ruleForm.user !== '') {
            this.$refs.ruleForm.validateField('checkUser');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.pass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        loginDialogVisible:false,
        loadDialogVisible:false,
        ruleForm:{
          user:'',
          pass:''
        },
        loadForm:{
          title:'',
          introduction:'',
          video:'',
          cover:''
        },
        loadRules:{
          title: [
            {  required: true, message: '请输入标题', trigger: 'blur' }
          ],
          cover: [
            {  required: true, message: '请上传封面', trigger: 'blur' }
          ],
          video: [
            {  required: true, message: '请上传视频', trigger: 'blur' }
          ],
        },
        imageList:[],
        videoList:[],
        rules: {
          user: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        },
        userID:'',
        userInfo:[],
      }
    },
    methods:{
      login(){
        this.loginDialogVisible = true
      },
      //登出
      logout(){
        this.ruleForm.user = '';
        this.ruleForm.pass = '';
        this.userID = '',
        this.userID = []
        localStorage.removeItem('userID')
      },
      //提交表单
      async submitForm() {
        let h = {
            username:this.ruleForm.user,
            password:this.ruleForm.pass

          }
          await Login(h).then(res=>{
            if(res.data.code == 200){
              if(res.data.id == 1){
                this.userID = res.data.id
                  this.$message({
                  message: '登陆成功',
                  type: 'success'
                });
                this.getUserInfo()
                localStorage.setItem('userID',res.data.id)
                this.loginDialogVisible = false
              }else{
                this.$message({
                  message: "登陆失败，请检查账户和密码是否正确！！",
                  type: 'error'
                });
              }
            }else{
              this.$message({
                  message: "登陆失败，请检查账户和密码是否正确！！",
                  type: 'error'
                });
            }
          })
      },
      //重置登陆表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //获取用户信息
      getUserInfo(){
        userInfo(this.userID).then(res=>{
          if(res.data.code == 200){
            this.userInfo = res.data.info
          }
        })
      },
      //初始化页面
      init(){
          if(localStorage.getItem('userID')){
          this.userID = localStorage.getItem('userID')
          this.getUserInfo()
        }
      },
      //上传初始化
      load(){
        this.loadDialogVisible = true
      },
      loadImage(e){
        this.loadForm.cover = e.file
      },
      handleImageRemove(file,fileList){
        this.imageList = fileList
      },
      loadVideo(e){
        this.loadForm.video = e.file
      },
      handleVideoRemove(file,fileList){
        this.videoList = fileList
      },
      //上传提交表单
      submitVideoForm(formName){
        console.log(this.loadForm.cover)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let h = new FormData()
            h.append('user_id',this.userID);
            h.append('title', this.loadForm.title);
            h.append('introduction', this.loadForm.introduction);
            h.append('video', this.loadForm.video);  
            h.append('cover', this.loadForm.cover); 
            loadVideo(h).then(res=>{
              if(res.data.code == 200){
                this.$message({
                  message: '上传成功',
                  type: 'success'
                });
                this.loadForm ={
                  title:'',
                  introduction:'',
                  video:'',
                  cover:''
                },
                this.imageList=[];
                this.videoList=[]
                this.loadDialogVisible = false
              }
            })
          } else { 
            return false;
          }
        });
      }
    },
    mounted(){
      this.init();
    }
}
</script>

<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
    }
  .header{
    width: 100%;
    min-width: 1600px;
    height: 100px;
    background-color: rgb(235, 235, 235);
    margin-bottom: 10px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    .userInfo{
      margin-left: 50px;
      width: 200px;
      height: 100px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .userimg{
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        border-radius: 50%;
        background-color: rgb(187, 187, 187);
      }
      .username{
        font-size: 18px;
      }
    }
    .login{
      position: absolute;
      right: 100px;
      top: 40px;
    }
    .logout{
      position: absolute;
      right: 100px;
      top: 40px;
    }
    .el-dialog{
      .demo-ruleForm{
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        .el-form-item{
          margin-bottom: 20px;
        }
        .el-input{
          width: 250px;
        }
        .el-button{
          padding: 10px 20px;
        }
        .btn{
          width: 260px;
          display: flex;
          justify-content: space-around;
          .el-button{
            padding: 10px 20px;
          }
        }
      }
    }
  }
</style>

