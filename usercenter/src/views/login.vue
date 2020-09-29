<template>
    <div class="login-container">
        <div class="login-main">
            <img src="https://by-image.oss-cn-shanghai.aliyuncs.com/yfront/static/auth/pic_denglu_wode.png" alt="">
            <el-form class="loginForm" ref="loginForm" :rules="rules" :model="loginForm" >
                <h1>欢 迎 登 录</h1>
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <span style="color:gray">还没有账号？</span><span><router-link to="regist">新用户注册</router-link></span>
                </el-form-item>
                <el-form-item>
                    <!-- <el-button type="primary" class="login-btn">登录</el-button> -->
                    <el-button type="primary" class="login-btn" @click="checkLoginData">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
    name: "login",
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            }
        };
    },
    methods: {
        ...mapActions([
            'saveUserInfo'
        ]),

        // 校验数据
        checkLoginData() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.login();
                } else {
                    return false;
                }
            });
        },
        // 登录
        async login() {
            const data = await this.yPost("/user/login", this.loginForm);
            if (data) {
                // const userid = data.user._id;
                // localStorage.setItem("userid", userid);
                const user = data.user;
                // localStorage.setItem("user", JSON.stringify(user));
                // 提交actions
                this.saveUserInfo(user);
                this.$router.push({
                name: "user"
                });
            }
        },

        
    },
    // created() {
    //     // console.log(localStorage.getItem('userInfo'))
    // },
};
</script>

<style lang="scss">
.login-main{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 1000px;
    height: 650px;
    border: solid 1px #f3f3f3;
    margin: 50px auto;
    box-shadow: 0 3px 10px #eee;
    img{
        width: 400px;
        height: 500px;
        margin-left: 70px;
    }
    .loginForm{
        display: flex;
        flex-direction: column;
        // justify-content: space-around;
        // align-items: center;
        width: 300px;
        height: 400px;
        margin-right: 70px;
        h1{
            margin-left: 60px;
            margin-bottom: 40px;
        }
        .login-btn{
            width: 300px;
            background-color: #6964d1;
            outline: none;
            border: none;
        }
        a{
            color: #6964d1;
            text-decoration: none;
        }
    }
}
</style>
