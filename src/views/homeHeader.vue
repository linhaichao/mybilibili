<template>
  <div>
    <div class="header">
      <div class="userInfo" v-if="userID">
        <div class="userimg"><i class="el-icon-s-custom"></i></div>
        <div class="username">{{ username }}</div>
      </div>
      <div class="login" v-if="!userID">
        <el-button type="primary" round @click="login">登陆</el-button>
      </div>
      <div class="logout" v-else>
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
              <el-button type="primary" size="medium" @click="submitForm">提交</el-button>
              <el-button type="warning" size="medium" @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Button,Dialog,Form,FormItem,Input} from 'element-ui'
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
// import { Login } from '@/api/api';
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
        ruleForm:{
          user:'',
          pass:''
        },
        rules: {
          user: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        },
        userID:''
      }
    },
    methods:{
      login(){
        this.loginDialogVisible = true
      },
      logout(){
        this.$router.push('/');
        this.ruleForm.user = '';
        this.ruleForm.pass = '';
        this.userID = ''
        this.loginDialogVisible = true
      },
      async submitForm() {
        // let h = {
        //     username:this.ruleForm.user,
        //     password:this.ruleForm.pass

        //   }
        //   await Login(h).then(res=>{
        //     if(res.code == 200){
        //       if(res.id == 1){
        //         this.userID = res.id
        //           this.$message({
        //           message: '登陆成功',
        //           type: 'success'
        //         });
        //         this.$emit('getUserID',res.id)
        //         this.loginDialogVisible = false
        //       }else{
        //         alert("登陆失败，请检查账户和密码是否正确！！")
        //       }
        //     }else{
        //       this.$message({
        //           message: res.data,
        //           type: 'error'
        //         });
        //     }
        //   })
      
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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
    min-width: 1200px;
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
        width: 50px;
        height: 50px;
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
        align-items: center;
        justify-content: center;
        .el-form-item{
          margin-bottom: 20px;
        }
        .el-input{
          width: 250px;
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

