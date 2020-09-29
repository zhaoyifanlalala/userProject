<template>
    <div class="regist-container">
        <div class="regist-main">
            <img src="https://by-image.oss-cn-shanghai.aliyuncs.com/yfront/static/auth/pic_denglu_wode.png" alt="">
            <el-form class="registForm" ref="registForm" :rules="rules" :model="registForm">
                <h1>注册新用户</h1>
                <el-form-item prop="username">
                    <el-input v-model="registForm.username" placeholder="请输入名字"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="registForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="school">
                    <el-input v-model="registForm.school" placeholder="请输入学校"></el-input>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-input v-model="registForm.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item prop="age">
                    <el-input v-model.number="registForm.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item prop="gender">
                    <el-select class="genderSelect" v-model="registForm.gender" placeholder="请选择性别">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <span style="color:gray">已有账号？</span><span><router-link to="login">去登录</router-link></span>
                </el-form-item>
                <el-form-item>
                    <!-- <el-button type="primary" class="regist-btn">注册</el-button> -->
                    <el-button type="primary" class="regist-btn" @click="checkRegistData">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "regist",
    data() {
        return {
            registForm: {
                username: "",
                password: "",
                school:"",
                nickname:"",
                age:null,
                gender:null,
            },
            options: [
                {
                    value: '0',
                    label: '女'
                }, 
                {
                    value: '1',
                    label: '男'
                },
            ],
            value: '1',
            rules: {
                username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                school: [{ required: true, message: "请输入学校", trigger: "blur" }],
                nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
                age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
                // gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
            }
        };
    },
    methods: {
        // 校验数据
        checkRegistData() {
            this.$refs.registForm.validate(valid => {
                if (valid) {
                this.regist();
                } else {
                return false;
                }
            });
        },
        // 注册
        async regist() {
            const data = await this.yPost("/user/regist", this.registForm);
            if (data) {
                console.log('regist-data',data)
            }
        }
        
    }
};
</script>

<style lang="scss">
.regist-main{
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
    .registForm{
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        // align-items: center;
        width: 300px;
        height: 400px;
        margin-right: 70px;
        margin-top: -80px;
        h1{
            margin-left: 70px;
            margin-top: 0;
        }
        .el-form-item{
            margin-bottom: 15px;
        }
        .genderSelect{
            width: 300px;
        }
        .regist-btn{
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
