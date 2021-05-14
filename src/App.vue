<template>
    <div id="app" :class="`mode-${mode}`">
        <img src="./assets/img/water-768745_1920.jpg" alt="" class="app-bg">
        <img id="play-music-bg" alt="">
        <!--<div class="appLoading iconfont icon-jiazaizhong">
            <i class="appLoadingInnter iconfont icon-yinle"></i>
        </div>-->
        <canvas :width="pageWidth" :height="pageHeight" id="music-data-canvas"></canvas>
        <div class="main-container">
            <div class="page-left-container" v-if="showCover">
                <Playing v-if="homeType === 'info'"/>
                <div v-else>
                    <Lyric/>
                </div>
            </div>
            <router-view/>
            <PageLeft/>
            <Player/>
            <Operation/>
        </div>
        <!--<div class="loadingWrap">
            <div class="drop"></div>
            <div class="wave"></div>
        </div>-->
    </div>
</template>

<script>
import Storage from './assets/utils/Storage';
import Player from './components/Player';
import PageLeft from './components/PageLeft';
import Playing from './components/Playing';
import Operation from './components/Operation';
import Lyric from "./components/Lyric";
import {loginStatus, getCookie} from './assets/utils/request';
import {messageHelp} from "./assets/utils/util";
import {mapGetters} from 'vuex';

export default {
    name: 'App',
    components: {Player, PageLeft, Playing, Operation, Lyric},
    data() {
        return {
            defaultActive: '/',
            pageWidth: window.innerWidth,
            pageHeight: window.innerHeight,
        }
    },
    computed: {
        ...mapGetters({
            allSongs: 'getAllSongs',
            showCover: 'isShowCoverImg',
            mode: 'getMode',
            homeType: 'getHomeType',
        })
    },
    created() {
        window.VUE_APP = this;
        window.QUERY_QQ_TIMES = 1;
        Storage.set('haveQCookie', '0');
        
        // 看一下是否有 cookie，以及设置项是否开启
        let uin = document.cookie.match(/\suin=([^;]+)(;|$)/);
        uin = uin ? uin[1] : '';
        let urlUin = window.location.href.match(/q=(\d+)/);
        uin = urlUin ? urlUin[1] : uin;
        if (window.location.href.indexOf('q=') > -1) {
            document.cookie = `uin=${uin}`;
            window.location = `http://${window.location.host}`;
        }
        if (uin && (Storage.get('openSetQCookie') || '0') !== '0') {
            getCookie(uin);
        }
        loginStatus();
        
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            this.$store.dispatch('updateMode', 'mobile');
        }
        
        // 播放顺序，qq号的一些配置
        this.defaultActive = window.location.hash.split('/')[1];
        
        const agent = navigator.userAgent.toLowerCase();
        const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        Storage.setDefault({
            listen_size: 'size320',
            down_size: 'high',
            down_high: 'sizeflac',
            home_page: 'PLAYING',
            volume: 1,
            download_info: JSON.stringify({
                count: 0,
                list: [],
            }),
            orderType: 'liebiao',
            key_code_map: JSON.stringify({
                PLAY_NEXT: '39',
                PLAY_PREV: '37',
                VOLUME_UP: '38',
                VOLUME_DOWN: '40',
                PLAY: '32',
                QUIT_SIMPLE: '27',
                TO_SIMPLE: ''
            }),
            openSetQCookie: 0,
            showDrawMusic: '1',
            drawMusicType: 1,
            downMusicName: '0',
            SHOW_SIMPLE_COVER: 1,
            PLAY_MUSIC_FROM_PLAYLIST: '1', // 歌单详情页，默认点击歌曲为播放这个列表
            PLAY_MUSIC_FROM_LIST: '0', // 其他歌曲列表也，默认点击歌曲为加入播放列表
        });
        
        // 初始化一下下载记录
        this.$store.dispatch('updateDownload', {status: 'abortAll'});
        
        messageHelp('newInfo');
    },
    mounted() {
        window.onresize = () => {
            this.pageWidth = window.innerWidth;
            this.pageHeight = window.innerHeight;
        };
    },
    methods: {}
}
</script>
<!--<style lang="scss">

$top:60vh;
$animation1:ripple 2s ease-in 0s infinite forwards ;
$animation2:ripple-2 2s ease-in 0s infinite forwards ;

.loadingWrap {
    opacity:.3;
    position: absolute;
    top:$top;
    left:50vw;
    margin-left: -50vw;
    text-align: center;
    z-index:9;
    width:100vw;
    height:100vh;
}

.drop {
    position: relative;
    width: 20px;
    height: 20px;
    top: -50vh;
    margin: 0 auto;
    background: #FFF;
    -moz-border-radius: 20px;
    -webkit-border-radius: 20px;
    border-radius: 20px;
    -moz-animation-name: drip;
    -webkit-animation-name: drip;
    animation-name: drip;
    -moz-animation-timing-function: cubic-bezier(1,0,.91,.19);
    -webkit-animation-timing-function: cubic-bezier(1,0,.91,.19);
    animation-timing-function: cubic-bezier(1,0,.91,.19);
    -moz-animation-duration: 2s;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -moz-animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}

.drop:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left:0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 30px solid rgba(255,255,255,1);
    top: -22px;
}

.wave {
    position: relative;
    opacity: 0;
    top: 0;
    margin:0 auto;
    width: 2px;
    height: 1px;
    border: #FFF 7px solid;
    -moz-border-radius: 300px / 150px;
    -webkit-border-radius: 300px / 150px;
    border-radius: 300px / 150px;
    -moz-animation-name: ripple;
    -webkit-animation-name: ripple;
    animation-name: ripple;
    -moz-animation-delay: 2s;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -moz-animation-duration: 2s;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -moz-animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}

.wave:after {
    content: "";
    position: absolute;
    opacity: 0;
    top: -5px;
    left:  - 5px;
    width: 2px;
    height: 1px;
    border: #FFF 5px solid;
    -moz-border-radius: 300px / 150px;
    -webkit-border-radius: 300px / 150px;
    border-radius: 300px / 150px;
    -moz-animation-name: ripple-2;
    -webkit-animation-name: ripple-2;
    animation-name: ripple-2;
    -moz-animation-duration: 2s;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -moz-animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}

@keyframes ripple {
    from {
        opacity: 1;
    }
    to {
        width: 600px;
        height: 300px;
        border-width: 1px;
        top: -100px;
        opacity: 0;
    }
}

@keyframes ripple-2 {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        width: 200px;
        height: 100px;
        border-width: 1px;
        top: 100px;
        left: 200px;
    }
}

@keyframes drip {
    to {
        top: 190px;
    }
}
</style>-->
<style lang="scss">
.appLoading {
    opacity: .3;
    position: fixed;
    z-index:9;
    top:45vh;
    left:50vw;
    color:#4e6084;
    margin-left:-25px;
    font-size:50px!important;
    animation: rotateAnimation 1s linear infinite;
    &Innter {
        position: absolute;
        top:50%;
        left:50%;
        margin-left:-15px;
        margin-top:-18.5px;
        color:#4e6084;
        font-size:30px!important;
    }
}
@keyframes rotateAnimation{
    0% {
        -webkit-transform: rotate(0deg);
    }
    25% {
        -webkit-transform: rotate(90deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
    }
    75% {
        -webkit-transform: rotate(270deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
@import "assets/style/common";

body {
    overflow: hidden;
}

a {
    color: #fffc;
}

.hide-scroll {
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 0;
        height: 8px;
        background-color: rgba(0, 0, 0, 0);
    }
}

#app {
    height: 100vh;
    min-width: 1200px;
    
    #music-data-canvas {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
    }
    
    #play-music-bg {
        position: absolute;
        z-index: -5;
        left: -5vw;
        min-width: 110vw;
        min-height: 110vh;
        bottom: -30%;
        -webkit-filter: blur(50px) brightness(60%);
        -moz-filter: blur(50px) brightness(60%);
        -o-filter: blur(50px) brightness(60%);
        -ms-filter: blur(50px) brightness(60%);
        filter: blur(50px) brightness(60%);
    }
    .app-bg {
        position: relative;
        z-index: -10;
        top: 0;
        left: 0;
        width: auto;
        margin:0 auto;
        min-width: 100vw;
        min-height: 100vh;
    }
    
    .main-container {
        position: absolute;
        overflow-y: auto;
        overflow-x: hidden;
        //min-width: 1200px;
        height: calc(100vh - 80px);
        top: 0;
        left: 0;
        display: inline-block;
        vertical-align: top;
        padding: 20px 20px 0 20px;
        width: 100%;
        box-sizing: border-box;
        
        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            background-color: rgba(0, 0, 0, 0);
        }
        
        /*定义滚动条轨道
         内阴影+圆角*/
        &::-webkit-scrollbar-track {
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        /*定义滑块
         内阴影+圆角*/
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.5);
        }
        
        .page-left-container {
            position: relative;
            width: 60%;
            height: calc(100vh - 120px);
            min-height: 600px;
            overflow: hidden;
        }
        
        .page-right-container {
            position: absolute;
            width: 40%;
            top: 0;
            height: calc(100% - 50px);
            min-height: 600px;
        }
    }
    .mode-mobile {
    
    }
    .playing-bg {
        position: absolute;
        height: 76px;
        top: -3px;
        
        .wave-bg {
            width: 60vw;
            height: 60vw;
            border-radius: 35%;
            position: absolute;
            right: 0;
            top: -30vw;
            animation: waveBg 5s infinite linear;
            background: -webkit-linear-gradient(left, #409EFF33, #409EFF99);
        }
        
        .wave-bg2 {
            width: 80vw;
            height: 80vw;
            border-radius: 45%;
            position: absolute;
            right: 0;
            top: -40vw;
            animation: waveBg 8s infinite linear;
            background: -webkit-linear-gradient(top, #fff1, #fff2);
        }
        
        @keyframes waveBg {
            from {
                transform: rotate(0);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
}

/* 部分页面的右侧导航 */
.right-select-tab-list {
    position: absolute;
    left: -120px;
    color: #fff;
    
    @for $i from 0 to 5 {
        .tab-item-#{$i} {
            position: absolute;
            white-space: nowrap;
            overflow: hidden;
            right: -120px;
            top: #{$i * 45 + 15}px;
            width: 40px;
            padding: 5px;
            float: right;
            transition: 0.3s linear;
            box-sizing: border-box;
            box-shadow: -5px 5px 5px #0003;
            
            .iconfont {
                margin-right: 10px;
                transition: 0.3s linear;
            }
        }
    }
    
    $color: (
        red: #F56C6C,
        blue: #409EFF,
        green: #67C23A,
        yellow: #E6A23C,
        gray: #666666,
    );
    
    .c-gray:hover {
        color: #fff8 !important;
        
        .iconfont {
            color: #fff8 !important;
        }
    }
    
    @each $c, $v in $color {
        .c-#{$c} {
            background: #0001;
            border-left: 5px solid #{$v}33;
            
            &:hover {
                background: #0001;
                width: 120px;
                cursor: pointer;
                color: #{$v}cc;
                
                &.selected {
                    .iconfont {
                        color: #{$v}cc;
                    }
                }
                
                .iconfont {
                    color: #{$v}cc;
                }
            }
            
            &.selected {
                background: #{$v}33;
            }
        }
    }
}
</style>
