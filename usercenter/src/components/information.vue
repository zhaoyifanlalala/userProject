<template>
    <div>
        <!-- <h1>个人信息</h1> -->
        <div class="information">
            <div class="info-img">
                <img :src="user.avatar" alt="">
            </div>
            <div class="info-content">
                
                <span>姓名：</span><span class="span name">{{ user.username }}</span>
                <span>昵称：</span><span class="span nickname">{{ user.nickname }}</span> 
                
                <span>年龄：</span><span class="span age">{{ user.age }}</span>
                <span>性别：</span><span class="span gender">{{ user.gender==0?'女':'男' }}</span>
                
                <span>学校：</span><span class="span school">{{ user.school }}</span>
                <span>密码：</span><span class="span password">{{ passwordStar }}</span><p><button @click="dialogFormVisible = true">修改密码</button></p>
            </div>
        </div>

        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :append-to-body="true" width="400px">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                    <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
export default {
    name: "information",
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            dialogFormVisible:false,
            ruleForm:{
                oldPass: '',
                newPass: '',
                checkPass: '',
            },
            rules: {
                oldPass: [
                    { required: true, message: "请输入旧密码", trigger: "blur" }
                ],
                newPass: [
                    { required: true, message: "请输入新密码", trigger: "blur" },
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        ...mapActions([
            'saveUserInfo'
        ]),

        // 提交
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.updatePassword();
                    this.dialogFormVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        
        // 修改密码
        async updatePassword(){
            let params = {
                oldPassword: this.ruleForm.oldPass,
                newPassword: this.ruleForm.newPass,
            };
            const data = await this.yPut("/user/changePassword",params);
            if (data) {
                console.log("data", data);
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                // 提交之后input里置为空
                this.ruleForm = {}
            }
        },





    },
    computed: {
        ...mapState({
            "user": state => state.login.user
        }),
        passwordStar() {
            return ("" + this.user.password).replace(/./g, "*");
        }
    },
}
</script>

<style lang="scss">
.information{
    display: flex;
    .info-img{
        margin-top: 50px;
        margin-left: 100px;
        img{
            width: 78px;
            height: 78px;
            border-radius: 50%;
        }
    }
    .info-content{
        display: flex;
        margin-top: 60px;
        margin-left: 100px;
        flex-wrap: wrap;
        // width: 300px;
        span{
            
            // line-height: 30px;
            margin-top: 20px;
            
        }
        .span{
            width: 100px;
            margin-right: 200px;
        }
        .password{
            margin-right: 10px;
        }
        p{
            margin-top: 20px;
            button{
                background-color: #fff;
                border: none;
                color: rgb(20, 81, 248);
                outline: none;
                cursor: pointer;
            }
        }
    }
}
</style>