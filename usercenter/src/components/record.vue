<template>
    <div>
        <!-- <div>兑换记录</div> -->
        <div class="record-container">
            <div class="record-exchange">
                <div v-for="item in list" :key="JSON.stringify(item)" class="exchange">
                    <div class="record-img">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="record-name">{{ item.name }}</div>
                    <div class="record-time">{{ item.exchangeDate | formatTime }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Moment from "moment";
Moment.locale('zh-cn');
export default {
    name: "record",
    data() {
        return {
            list: {},
            
        }
    },
    created() {
        this.getRecords();
    },
    methods: {
        async getRecords() {
            let userid = JSON.parse(localStorage.getItem("userInfo"));
            const recordDate = await this.yGet("/shop/exchangedRecord", {
                params: {
                    id: userid._id,
                }
            });
            this.list = recordDate;
            console.log(recordDate);
        },
    },
    filters:{
        formatTime(value){
            let time = Moment(value).format('YYYY-MM-DD hh:mm:ss')
            return time 
        },
    }
    
}
</script>

<style lang="scss">
.record-container {
    // padding-top: 30px;
    padding-left: 20px;
    padding-right: 20px;
    overflow: hidden;
    overflow: scroll;
    height: 500px;
    .record-exchange {
        .exchange {
            padding-top: 30px;
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 60px;
            border-bottom: 1px solid #ccc;
            line-height: 60px;
            .record-img{
                width: 60px;
                height: 60px;
                img{
                    width: 60px;
                    height: 59px;
                    margin: 0 auto;
                }
            }
            .record-name {
                // display: inline-block;
                width: 600px;
                word-wrap: break-word;
                color: #555555;
                font-size: 16px;
            }
            .record-time {
                color: #9d9d9d;
            }
        }
    }
}
</style>