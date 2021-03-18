<template>
    <div class="feed-back-page hide-scroll">
        <h1>说说想说的吧～</h1>
        <div class="feedback-input-container">
            <div class="info-input-container">
                <div class="inline-block">昵称：</div>
                <input class="info-input" v-model="nick" type="text">
                <div class="inline-block">邮箱：</div>
                <input class="info-input" v-model="email" type="text">
            </div>
            <hr/>
            <div class="reply-info" v-if="replyId">
                回复{{replyNick || '无名'}}：
                <span class="reply-content">{{shortString(replyContent)}}</span>
                <i class="iconfont icon-cancel" @click="showReply()"/>
            </div>
            <textarea v-model="content" class="feedback-textarea" placeholder="说些啥呢" cols="30" rows="10"/>
            <i class="iconfont icon-plane" @click="addFeedback"/>
        </div>
        <div class="feedback-list">
            <div class="feedback-content-item" v-for="item in list" :key="item.id">
                <div class="nick">{{item.nick || '无名'}} <span class="email" v-if="item.email">{{item.email}}</span>
                </div>
                <div class="content">
                    {{item.content}}
                </div>
                <blockquote v-if="item.replyId && item.replyContent" class="reply-info">
                    <span class="reply-nick">@{{item.replyNick || '无名'}}：</span>
                    <span>{{item.replyContent}}</span>
                </blockquote>
                <div class="time">
                    {{item.time}}
                    <i class="iconfont icon-reply" @click="showReply(item)"/>
                </div>
            </div>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page="pageNo"
            :page-size="10"
            @current-change="getFeedback"
            :total="total">
        </el-pagination>
        <div class="top-qa">
            <h2>一些可能你会问的</h2>
            <div class="qa-list">
                <div v-for="({q, a}) in topQa" class="top-qa-content" :key="`q_${q}`">
                    <div class="question nick" v-html="q"></div>
                    <div class="answer content" v-html="a"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import request from "../assets/utils/request";
import Storage from "../assets/utils/Storage";
import {shortString} from "../assets/utils/stringHelper";
import {mapGetters} from 'vuex';
import Timer from "../assets/utils/timer";

export default {
    name: "Feedback",
    data() {
        return {
            list: [],
            pageNo: 1,
            desc: 1,
            total: 0,
            nick: Storage.get('soso_nick') || '',
            email: Storage.get('soso_email') || '',
            content: '',
            replyId: '',
            replyContent: '',
            replyNick: '',
            sending: false,
            topQa: [
                {
                    q: '无法播放？',
                    a: '1、确认下浏览器是否允许网页播放声音 （如chrome 访问 chrome://settings/content/sound ）<br/> ' +
                        '2、确认下 去广告插件 是否有影响 <br/>' +
                        '3、还是无法播放的同学可以去设置里关闭先进模式刷新尝试（就无法显示频谱图）'
                },
                {
                    q: '快捷键？',
                    a: '快捷键现在是有的，目前为方向键、空格键、ctrl s、esc (极简模式)',
                },
                {
                    q: '播放的歌曲与歌名对应不上？',
                    a: '因为对于无法获取到音频的歌曲（vip / 版权原因），会根据歌名、歌手和歌曲时长去另一个平台匹配信息，这一步当然是存在匹配错误的可能性的，' +
                        '不过目前看来整体的精确度还是ok的，所以后续也不太会在这方面进一步优化了'
                },
                {
                    q: '好多会员歌曲不能听了！',
                    a: '因为我忘了更新服务器 Cookie 信息了，等我记起来就好了'
                }
            ]
        }
    },
    computed: {
        ...(mapGetters({
            user: 'getUser',
        }))
    },
    watch: {
        user(v) {
            if (v && v.nickname && !this.nick) {
                this.nick = v.nickname;
            }
        },
        nick(v) {
            Storage.set('soso_nick', v);
        },
        email(v) {
            Storage.set('soso_email', v);
        },
    },
    created() {
        this.$store.dispatch('updateShowCover', false);
        this.getFeedback();
    },
    methods: {
        getFeedback(v) {
            if (v) {
                this.pageNo = v;
            }
            const {pageNo} = this;
            request({
                api: 'COMMON_GET_FEEDBACK',
                data: {
                    pageNo,
                    desc: 0,
                    pageSize: 10,
                }
            }).then((res) => {
                this.list = res.data.list;
                this.total = res.data.total;
            })
        },
        
        addFeedback() {
            const {content, nick, email, replyId, replyNick, replyContent, sending} = this;
            if (!content) {
                return this.$message.warning('说点啥呀');
            }
            if (sending) {
                return this.$message.warning('还在发，别催');
            }
            this.sending = true;
            request({
                api: 'COMMON_ADD_FEEDBACK',
                data: {
                    content,
                    nick,
                    email,
                    replyContent,
                    replyId,
                    replyNick,
                    time: Timer().str('YY-MM-DD HH:mm:ss'),
                },
                method: 'post',
            }).then(() => {
                this.sending = false;
                this.pageNo = 1;
                this.content = '';
                this.showReply();
                this.$message.success('发射成功！');
                this.getFeedback();
            }).catch(err => {
                this.$message.error(err.data.errMsg || '评论失败了')
            })
        },
        
        showReply({content = '', id = '', nick = ''} = {}) {
            this.replyContent = content;
            this.replyId = id;
            this.replyNick = nick;
        },
        
        shortString,
    }
}
</script>

<style scoped lang="scss">
.feed-back-page {
    padding-left: 100px;
    padding-top: 20px;
    max-height: calc(100vh - 120px);
    position: relative;
    
    h1, h2 {
        color: #fff6;
        margin-bottom: 30px;
    }
    
    .top-qa {
        position: absolute;
        width: 45%;
        top: 100px;
        right: 0;
    }
    
    .feedback-input-container {
        background: #0005 !important;
        width: 45%;
        border-radius: 10px;
        font-size: 14px;
        color: #fffc;
        overflow: hidden;
        padding: 10px;
        position: relative;
        
        .info-input-container {
            color: #fff8;
            margin-top: 5px;
            margin-bottom: 5px;
            padding-left: 10px;
            
            .info-input {
                background: transparent;
                border: none;
                outline: none !important;
                color: #fffc;
                margin-right: 10px;
                width: 200px;
                font-size: 14px;
            }
        }
        
        hr {
            border: none;
            border-top: 1px dashed #fff8;
        }
        
        .reply-info {
            padding: 5px 10px;
            padding-bottom: 0;
            color: #fff8;
            
            .reply-content {
                font-size: 12px;
                color: #fffc;
                background: #fff4;
                padding: 0 10px;
                border-radius: 4px;
                word-break: break-all;
            }
            
            .icon-cancel {
                cursor: pointer;
                margin-left: 10px;
                font-size: 14px;
            }
        }
        
        .feedback-textarea {
            background: transparent;
            box-sizing: border-box;
            color: #fffc;
            width: 100%;
            padding: 10px;
            height: 100px;
            border: none;
            outline: none !important;
            resize: none;
            font-size: 16px;
            
            &::-webkit-scrollbar {
                width: 0;
                height: 8px;
                background-color: rgba(0, 0, 0, 0);
            }
        }
        
        .icon-plane {
            position: absolute;
            bottom: 15px;
            right: 15px;
            font-size: 20px;
            cursor: pointer;
        }
    }
    
    .feedback-list, .qa-list {
        margin-top: 20px;
        min-height: 800px;
        
        .feedback-content-item, .top-qa-content {
            width: 45%;
            background: #0003;
            border-radius: 10px;
            color: #fffc;
            padding: 10px;
            font-size: 14px;
            margin-bottom: 10px;
            
            &.top-qa-content {
                width: 80%;
            }
            
            .nick {
                font-weight: bold;
                font-size: 16px;
                padding: 0 12px;
                
                .email {
                    font-weight: normal;
                    color: #fff6;
                    font-size: 12px;
                    padding-left: 20px;
                }
            }
            
            .content {
                padding: 10px 12px;
                word-break: break-all;
            }
            
            .time {
                font-size: 12px;
                color: #fff8;
                padding-left: 12px;
                padding-bottom: 5px;
                
                .icon-reply {
                    padding-left: 10px;
                    font-size: 12px;
                    color: #fffa;
                    cursor: pointer;
                    font-weight: bold;
                }
            }
            
            .reply-info {
                padding: 5px 10px;
                border-left: 5px solid #fff8;
                opacity: 0.7;
                margin-left: 12px;
                margin-bottom: 10px;
                
                span {
                    word-break: break-all;
                }
            }
        }
    }
}
</style>
