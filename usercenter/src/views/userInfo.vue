<template>
    <div>
        <div class="userform">
            <div class="user">
                <!-- <h1>个人中心</h1> -->
                <div class="change-btn">
                    <button @click="change('information')">
                        <a :class="[ name==='information' ? 'changeBtn':'']">个人信息</a>
                    </button>
                    <button @click="change('record')">
                        <a :class="[ name==='record' ? 'changeBtn':'']">兑换记录</a>
                    </button>
                </div>
                
                
                <div class="box">
                    <keep-alive>
                        <component :is="activeComp"></component>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import information from "../components/information";
import record from "../components/record";

export default {
    name: "userInfo",
    components:{
        information,record
    },
    data() {
        return {
            activeComp: 'information',
            // isShow: false
            name: "information"
        }
    },
    methods: {
        change(name){
            this.activeComp = name;
            this.name = name
        }
    },
}
</script>


<style lang="scss">
    .userform{
        display: flex;
        flex-direction: column;
        .user{
            display: flex;
            flex-direction: column;
            .change-btn{
                height: 60px;
                margin-top: 100px;
                margin-left: 60px;
                margin-bottom: 30px;
                button{
                    width: 100px;
                    height: 60px;
                    font-size: 20px;
                    margin-right: 30px;
                    background-color: #fff;
                    border: none;
                    outline: none;
                }
                .changeBtn{
                    border-bottom: 3px solid #6964d1;
                }
            }
        }
        .box{
            height: 500px;
            width: 1000px;
            border: 1px solid gainsboro;
            margin-left: 60px;
        }
        
    }
</style>