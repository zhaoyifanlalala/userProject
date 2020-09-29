<template>
    <div>
        <div class="points-container">
            <div class="point">
                <!-- <h1>积分商城</h1> -->
                <div class="point-header">
                    <div class="point-title">商城</div>
                </div>
                
                <div class="point-img">
                    <p>当前积分</p>
                    <h1>{{ user.integration }}</h1>
                </div>
                <div class="shoplist-title">商品列表</div>
                <div class="shoplist">
                    <div class="shoplist-item" v-for="item in list" :key="item._id">
                        <div class="box-item">
                            <img :src="item.image" alt="">
                            <p class="item-title">{{ item.name }}</p>
                            <div class="jifen">
                                <span>{{ item.price }} 积分</span>
                                <button class="point-btn" @click="exchange(item)">兑换</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions, mapState } from "vuex"
export default {
    name: "points",
    data() {
        return {
            // list:{},
            list:[],
        }
    },
    computed: {
        ...mapState({
            "user": state=> state.login.user
        })
    },
    created() {
        // console.log(this.$store.state.login.user)
        // console.log('user',this.user)
        this.getShopList()
    },
    methods: {
        ...mapActions([
            'saveUserInfo'
        ]),
        async getShopList(){
            let params = this.list
            const data = await this.yGet("/shop/shopList",params);
            if (data) {
                console.log("data", data);
                this.list = data
            }
        },

        exchange(item) {
            this.shopExchange(item);
        },
        // 兑换商品
        async shopExchange(item){
            let params = {
                id: item._id
            }
            const data = await this.yPut("/shop/exchange",params);
            if (data) {
                console.log("data", data);
                
                this.$message({
                    message: "兑换成功",
                    type: "success"
                });
                this.getPoint()
            }
        },

        // 获取积分
        async getPoint(){
            let userid = JSON.parse(localStorage.getItem("userInfo"));
            const data = await this.yGet("/user/userinfo", {
                params: {
                    id: userid._id
                }
            });
            if (data) {
                
                this.saveUserInfo(data)
            }
        }
    }
}
</script>


<style lang="scss">
    .points-container{
        display: flex;
        flex-direction: column;
        
        .point{
            .point-header{
                height: 60px;
                width: calc(100vw - 230px);
                // left: 230px;
                position: fixed;
                // box-sizing: border-box;
                box-shadow: 2px 2px 10px #c3c3c3;
                background-color: #fff;
            }
            
            display: flex;
            flex-direction: column;
            .point-title{
                line-height: 60px;
                padding-left: 30px;
            }
            .point-img{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 900px;
                padding: 50px 40px;
                border-radius: 6px;
                margin: 0 auto;
                margin-top: 100px;
                background-image: url("../assets/jifen-background.png");
                background-repeat: no-repeat;
                background-size: cover;
                p{
                    color: #fff;
                }
                h1{
                    color: #fff;
                }
            }
            .shoplist-title{
                margin-top: 40px;
                margin-left: 91px;
            }
            .shoplist{
                display: flex;
                flex-wrap: wrap;
                margin-top: 20px;
                margin-left: 91px;
                .shoplist-item{
                    // display: flex;
                    height: 300px;
                    width: 230px;
                    margin-top: 10px;
                    margin-bottom: 30px;
                    margin-right: 50px;
                    padding: 20px 30px;
                    // padding-left: 30px;
                    border-radius: 7px;
                    box-shadow:2px 2px 10px #c3c3c3;
                    .box-item{
                        img{
                            width: 230px;
                            height: 230px;
                        }
                        .item-title{
                            height: 40px;
                            font-size: 12px;
                        }
                        .jifen{
                            display: flex;
                            justify-content: space-between;
                            margin-top: 10px;
                            .point-btn{
                                background-color: #6964d1;
                                border: none;
                                outline: none;
                                width: 60px;
                                border-radius: 6px;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
        
    }
</style>