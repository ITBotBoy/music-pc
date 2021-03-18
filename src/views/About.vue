<template>
    <div class="about-page">
        <div class="content-block ">
            <h2>一起听音乐呀 <!--<a href="https://github.com/jsososo/NeteaseMusic" class="ml_20" target="_blank"><i
                class="iconfont icon-git" style="font-size: 24px;"/></a>--></h2>
            <div class="mt_20">
                <p>
                    如果有什么想说的！请戳👉
                    <router-link class="pl_5" to="/feedback">反馈<i class="iconfont pl_10 icon-feedback"></i>
                    </router-link>
                </p>
                <p>
                    所有的数据内容均来自网易云音乐，本网站不做数据存储处理等信息，所有的配置信息均存在本地
                </p>
                <p>
                    对于 VIP/无版权 的歌曲，目前采用的方法是根据歌名 + 歌手 + 歌曲时长 去另外一个平台搜索匹配，这当然是存在一定的准确度问题，
                    不过鉴于整体正确度表现ok，个别歌曲暂不考虑优化。
                </p>
            </div>
        </div>
        <div class="content-block">
            <h2>感谢以下提供的开源项目</h2>
            <p class="mt_20">GitHub: <a href="https://github.com/jsososo/NeteaseMusic" target="_blank">网易云第三方 Web
                播放器</a></p>
            <p>后端：「网易云」<a href="https://github.com/Binaryify/NeteaseCloudMusicApi" target="_blank">NeteaseCloudMusicApi</a>
            </p>
            <p>
                后端：「QQ音乐」<a href="https://github.com/jsososo/QQMusicApi" target="_blank">QQMusicApi</a>
            </p>
            <p>
                <del>后端：「咪咕音乐」<a href="https://github.com/jsososo/MiguMusicApi" target="_blank">MiguMusicApi</a>
                </del>
            </p>
            <p>后端：「聚合接口」
                <a href="https://github.com/jsososo/MixMusicApi" target="_blank">MixMusicApi</a>
            </p>
            <p>
            </p>
        </div>
        <div class="content-block">
            <h2>关于网易云无版权音乐</h2>
            <p>
                如果需要仅 vip 可听的歌曲，那是需要 企鹅vip 的登录账号 Cookie 的，当然，我会在服务器上不定期的更新我自己的 Cookie 【所以大家还是要支持正版，这里只是为了方便和学习呀】
            </p>
        </div>
        
        <div class="content-block">
            <h2>版本迭代</h2>
            
            <ul class="mt_20">
                <li v-for="(r) in [...history].reverse()" :key="r.txt" class="mb_15 ml_20">
                    <div>{{r.txt}}</div>
                    <div class="ml_20"> {{r.time}}</div>
                </li>
            </ul>
        </div>
        
        <!--<div class="content-block qr-block">
            <h2>服务器香油钱</h2>
            <div class="mt_20">
                <img class="pay-img" src="../assets/img/pay-1.png" alt=""/>
                <img class="pay-img" src="../assets/img/pay-2.jpeg" alt=""/>
            </div>
        </div>-->
    </div>
</template>

<script>
export default {
    name: "About",
    data() {
        return {
            history: [
                {
                    txt: '🎧 听音乐',
                    time: '2021-3-18',
                }
            ],
        }
    },
    created() {
        this.$store.dispatch('updateShowCover', false);
    },
}
</script>

<style lang="scss" scoped>
.about-page {
    color: #fffc;
    padding-top: 20px;
    padding-left: 120px;
    width: 60%;
    padding-right: 40%;
    max-height: calc(100vh - 120px);
    min-height: 600px;
    overflow: auto;
    position: relative;
    
    .qr-block {
        width: 35%;
        position: absolute;
        top: 60px;
        right: 10px;
    }
    
    .content-block {
        margin-bottom: 40px;
    }
    
    .el-timeline-item__wrapper {
        color: #fffc !important;
        background: blue;
    }
    
    .el-timeline-item__timestamp {
        color: #fffc;
    }
    
    p {
        line-height: 24px;
        margin-top: 10px;
    }
    
    a {
        text-decoration: #fff underline;
        color: #fffc;
    }
    
    .pay-img {
        width: 200px;
        margin-right: 30px;
    }
}
</style>
