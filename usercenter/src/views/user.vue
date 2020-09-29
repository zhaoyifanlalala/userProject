<template>
    <div class="user">
        <div class="left">
            <div class="profile">
                <img :src="user.avatar" alt="">
            </div>
            <div>
                <h4>{{ user.username }}</h4>
            </div>
            <div class="main">
                <div class="userinfo" :style="{background: routerName == 'userInfo'?'rgba(105, 100, 209, 0.6)':''}">
                    <router-link to="userinfo">个人中心</router-link>
                </div>
                <div class="points" :style="{background: routerName == 'points'?'rgba(105, 100, 209, 0.6)':''}">
                    <router-link to="points">积分商城</router-link>
                </div>
                <div class="exit">
                    <!-- <p>退出</p> -->
                    <el-popconfirm title="确定退出登录吗？" @onConfirm="confirmQuit">
                        <p slot="reference" type="primary" plain>退出</p>
                    </el-popconfirm>
                </div>
            </div>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: "user",
    data(){
        return{
            
        }
    },
    methods:{
        // 退出登录
        confirmQuit() {
            localStorage.removeItem("userInfo");
            this.$router.replace({
                name: "login"
            });
        }
    },
    computed:{
        ...mapState({
            "user": state => state.login.user
        }),

        routerName(){
            let name = this.$route.name;
            return name
        },
        
    },
}
</script>

<style lang="scss">
.user{
    display: flex;
    .left{
        width: 230px;
        height: 100vh;
        position: fixed;
        background-color: #333;
        display: flex;
        flex-direction: column;
        align-items: center;
        div{
            margin-top: 40px;
            h4{
                color: #c3c3c3;
            }
        }
        .profile{
            img{
                width: 78px;
                height: 78px;
                border-radius: 50%;
                margin-top: 100px;
            }
        
        }
    }
    .right{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 230px;
        
    }
}



.main{
    height: 110px;
    width: 230px;
}
.userinfo, .points, .exit{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    color: #e8e8e8;
    margin-bottom: 30px;
    cursor: pointer;
}

.main a{
    font-size: 16px;
    color: #e8e8e8;
    font-weight: 300;
    line-height: 54px;
    width: 70px;
    text-align: left;
    text-decoration: none;
}
.main p{
    font-size: 16px;
    color: #e8e8e8;
    font-weight: 300;
    line-height: 54px;
    width: 70px;
    text-align: center;
}
.userinfo:hover{
    background-color: rgba(105, 100, 209, 0.8);
}
.points:hover{
    background-color: rgba(105, 100, 209, 0.8);
}
.exit:hover{
    background-color: rgba(105, 100, 209, 0.8);
}
</style>