(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0a0c930a"],{"9d39":function(t,i,e){"use strict";e("f64c")},c2f4:function(t,i,e){"use strict";e.r(i);e("8e6e"),e("ac6a"),e("456d"),e("96cf");var n=e("1da1"),s=(e("a481"),e("ade3")),a=e("ddc7"),l=(e("0828"),e("ceb6")),o=e("5880");function c(t,i){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);i&&(n=n.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),e.push.apply(e,n)}return e}function r(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?c(Object(e),!0).forEach((function(i){Object(s.a)(t,i,e[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):c(Object(e)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}))}return t}var p,f={name:"PlayListDetailPage",components:{PlayListDetail:a.a},data:function(){return{id:this.$route.query.id,list:[],listInfo:null,loading:!0,platform:this.$route.query.from||"163"}},computed:r(r({},Object(o.mapGetters)({playingList:"getPlayingList",userList:"getUserList",qUserList:"getQUserList",allList:"getAllList",allSongs:"getAllSongs",playNow:"getPlaying",user:"getUser",playingPercent:"getPlayingPercent",favSongMap:"getFavSongMap"})),{},{listId:function(){return"".concat(this.platform,"_").concat(this.id)}}),watch:{allList:function(t){var i=this.listId;this.list=t[i]||this.list},$route:function(){this.platform=this.$route.query.from||"163",this.id=this.$route.query.id.replace("".concat(this.platform,"_"),""),this.init()},playingList:{handler:function(){"playing"===this.id&&this.init()},deep:!0}},mounted:function(){var t=this.id,i=this.platform;this.id=String(t).replace("".concat(i,"_"),""),this.init()},methods:{init:(p=Object(n.a)(regeneratorRuntime.mark((function t(){var i,e,n,s,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=this.id,e=this.platform,n=this.allList,s=this.listId,this.loading=!1,"playing"!==i){t.next=5;break}return this.listInfo=null,t.abrupt("return",this.list=this.playingList.trueList||[]);case 5:if(s!=="".concat(e,"_daily")){t.next=8;break}return this.listInfo=null,t.abrupt("return",this.list=this.allList[s]||[]);case 8:return this.list=n[s]||[],this.loading=!0,t.next=12,Object(l.i)(i,e);case 12:if(a=t.sent){t.next=15;break}return t.abrupt("return",this.$message.error("获取歌单信息出错！"));case 15:this.listInfo=a,this.loading=!1;case 17:case"end":return t.stop()}}),t,this)}))),function(){return p.apply(this,arguments)})}},u=e("2877"),d=Object(u.a)(f,(function(){var t=this,i=t.$createElement;return(t._self._c||i)("PlayListDetail",{attrs:{loading:t.loading,listInfo:t.listInfo,id:t.id,trueList:t.list,platform:t.$route.query.from}})}),[],!1,null,"49a71234",null);i.default=d.exports},ddc7:function(t,i,e){"use strict";e("8e6e"),e("456d"),e("20d6"),e("7f7f"),e("a481"),e("386d"),e("ac6a");var n=e("ade3"),s=e("ceb6"),a=e("5880"),l=e("f503"),o=e("0828");function c(t,i){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);i&&(n=n.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),e.push.apply(e,n)}return e}function r(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?c(Object(e),!0).forEach((function(i){Object(n.a)(t,i,e[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):c(Object(e)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}))}return t}var p={name:"PlayListDetail",data:function(){return{search:"",list:[],smallIndex:0,bigIndex:0,showScrollTo:!1}},props:{id:String,listId:String,platform:String,loading:Boolean,listInfo:Object,trueList:Array},computed:r(r({},Object(a.mapGetters)({allList:"getAllList",playingList:"getPlayingList",userList:"getUserList",qUserList:"getQUserList",allSongs:"getAllSongs",playNow:"getPlaying",user:"getUser",playingPercent:"getPlayingPercent",favSongMap:"getFavSongMap"})),{},{aId:function(){return"".concat(this.platform,"_").concat(this.id)},isMineList:function(){var t=this.platform,i=this.userList,e=this.aId;return!!(i[t]&&i[t].mine&&i[t].mine[e])}}),watch:{trueList:function(){this.searchList()},list:function(){this.$nextTick(this.getShowIndex)},search:function(){this.searchList()}},created:function(){this.trueList.length&&this.searchList()},methods:r(r({playListShow:function(t){var i=this.allSongs,e=this.list,n=this.listId,s=this.$store.dispatch,a=i[e[0]];a.url&&(t?(s("updatePlayNow",a),s("updatePlayingList",{list:e,listId:n}),s("updatePlayingStatus",!0)):(s("updatePlayingList",{list:e,more:!0}),this.$message.success("已添加到正在播放")))},downShow:function(){var t=this,i=this.allSongs,e=this.list.filter((function(t){return!!i[t].url}));if(!e.length)return this.$message.info("没有歌呢");this.$confirm("批量下载".concat(e.length,"首歌曲？"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$message.info("为了防止服务器误封高频ip，批量下载一秒增加一个任务"),e.forEach((function(t,i){setTimeout((function(){return Object(s.e)(t)}),1e3*i)}))}))},searchList:function(){var t=this.search,i=this.trueList,e=this.allSongs,n=t.replace(/\/|\s|\t|,|，|-|/g,"").toLowerCase(),s=i||[];if(!n)return this.showScrollTo=-1!==s.indexOf(this.playNow.aId),this.list=s;this.list=s.filter((function(t){return"".concat(e[t].name,"\n          ").concat((e[t].ar||[]).map((function(t){return t.name})),"\n          ").concat(e[t].al.name,"\n          ").concat(e[t].name,"\n          ").concat(e[t].al.name,"\n          ").concat((e[t].ar||[]).map((function(t){return t.name})),"\n          ").concat(e[t].name).replace(/\s/g,"").toLowerCase().indexOf(n)>-1}))},likeMusic:s.m,playlistTracks:function(t,i,e,n,s){window.event.stopPropagation(),this.$store.dispatch("setOperation",{data:{tracks:t,pid:i,op:e},type:n,platform:s})},download:s.e,collectPlaylist:s.b,getShowIndex:function(){var t=this.list,i=document.getElementsByClassName("list-detail-container")[0],e=Math.max(i.scrollTop-500,0);this.smallIndex=Math.floor(e/71);var n=i.clientHeight+i.scrollTop+300;this.bigIndex=Math.min(Math.floor(n/71),t.length)},scrollToPlayNow:function(){var t=this.list,i=this.playNow,e=t.findIndex((function(t){return t===i.aId})),n=document.getElementsByClassName("song-list")[0];e>-1&&document.getElementsByClassName("list-detail-container")[0].scrollTo(0,71*e+n.offsetTop)}},l.a),{},{changeUrlQuery:o.a,clearPlaying:function(){this.$store.dispatch("updatePlayingList",{list:[this.playNow.aId]})}})},f=(e("9d39"),e("2877")),u=Object(f.a)(p,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"list-detail-container",on:{scroll:t.getShowIndex}},[!t.listInfo&&t.loading&&0===t.list.length?e("div",{staticClass:"text-center fc_fff ft_20",staticStyle:{"padding-top":"100px",opacity:"0.8","letter-spacing":"2px"}},[t._v("拼命查找了！\n    ")]):t._e(),t.loading?t._e():e("div",{staticClass:"list-info-detail"},[t.listInfo?e("div",[e("img",{staticClass:"list-info-cover",attrs:{src:t.listInfo.cover}}),e("div",{staticClass:"list-info-txt"},[e("div",{staticClass:"list-info-name"},[t._v(t._s(t.listInfo.name))]),e("div",{staticClass:"list-info-creator"},[t.userList[t.platform]&&!t.userList[t.platform].mine[t.listId]?e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.userList[t.platform].sub[t.listId]?"已收藏":"收藏",placement:"top"}},[e("i",{class:"collect-btn mr_10 iconfont icon-"+(t.userList[t.platform].sub[t.listId]?"collected":"collect"),on:{click:function(i){return t.collectPlaylist(t.listInfo)}}})]):t._e(),t.listInfo.creator?e("span",[t._v("By "),e("span",{staticClass:"creator-name"},[t._v(t._s(t.listInfo.creator.nick))])]):t._e()],1),e("div",{staticClass:"list-desc"},[t._v(t._s(t.listInfo.desc))])])]):t._e(),e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"search-input",attrs:{type:"text",placeholder:"找呀找呀找歌曲"},domProps:{value:t.search},on:{input:function(i){i.target.composing||(t.search=i.target.value)}}}),e("div",{staticClass:"inline-block mt_15 pt_5"},[t._v("下列歌曲：")]),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"播放",placement:"top"}},[t.list.length>0?e("div",{staticClass:"inline-block mt_15 pt_5 pointer play",staticStyle:{"line-height":"20px"},on:{click:function(i){return t.playListShow(!0)}}},[e("i",{staticClass:"iconfont icon-play pl_10 pr_10"})]):t._e()]),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"添加到播放列表",placement:"top"}},[t.list.length>0?e("div",{staticClass:"inline-block mt_15 pt_5 pointer play",staticStyle:{"line-height":"20px"},on:{click:function(i){return t.playListShow()}}},[e("i",{staticClass:"iconfont icon-list-add pl_10 pr_10"})]):t._e()]),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"下载",placement:"top"}},[t.list.length>0?e("div",{staticClass:"inline-block mt_15 pt_5 pointer play",staticStyle:{"line-height":"20px"},on:{click:t.downShow}},[e("i",{staticClass:"iconfont icon-download pl_10 pr_10"})]):t._e()])],1)]),t.list.length?e("div",{staticClass:"song-list"},[e("div",{style:"height:"+71*t.smallIndex+"px;"}),t._l(t.list,(function(i,n){return t.allSongs[i]&&n>=t.smallIndex&&n<=t.bigIndex?e("div",{key:i+"-"+n,class:"song-item "+(t.playNow.aId===i?"played":"")+" "+(t.allSongs[i].url?"":"disabled")+" "+(n<t.smallIndex||n>t.bigIndex?"hidden":""),on:{click:function(e){return t.playMusic({id:i,arr:t.trueList,listId:t.listId,isDetail:!0})}}},[t.playNow.aId===i?e("div",{staticClass:"playing-bg",style:"width: "+100*t.playingPercent+"%"},[e("div",{staticClass:"wave-bg"}),e("div",{staticClass:"wave-bg2"})]):t._e(),e("span",{staticClass:"song-order"},[t._v(t._s(n+1))]),e("img",{staticClass:"song-cover",attrs:{src:(t.allSongs[i].al&&t.allSongs[i].al.picUrl)+"?param=50y50",alt:""}}),e("span",{staticClass:"song-name"},[t._v(t._s(t.allSongs[i].name))]),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"mv",placement:"top"}},[t.allSongs[i].mvId?e("a",{staticClass:"song-mv iconfont icon-mv",attrs:{href:t.changeUrlQuery({id:t.allSongs[i].mvId,from:t.allSongs[i].platform},"#/mv",!1)}}):t._e()]),e("span",{staticClass:"song-artist"},[t._v(t._s((t.allSongs[i].ar||[]).map((function(t){return t.name})).join("/")))]),e("div",{staticClass:"icon-container"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"喜欢",placement:"top"}},[t.userList[t.allSongs[i].platform]&&t.listId!==t.userList[t.allSongs[i].platform].favListId?e("i",{class:"operation-icon operation-icon-1 iconfont icon-"+(t.favSongMap[t.allSongs[i].platform][i]?"like":"unlike"),on:{click:function(e){return t.likeMusic(i)}}}):t._e()]),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"添加到歌单",placement:"top"}},["migu"!==t.allSongs[i].from?e("i",{staticClass:"operation-icon operation-icon-2 iconfont icon-add",on:{click:function(e){return t.playlistTracks(i,t.listId,"add","ADD_SONG_2_LIST",t.allSongs[i].platform)}}}):t._e()]),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"移出播放列表",placement:"top"}},[t.playingList.map[i]?e("i",{staticClass:"operation-icon operation-icon-3 iconfont icon-list-reomve",on:{click:function(e){return t.removePlaying(i)}}}):t._e()]),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"加入播放列表",placement:"top"}},[t.allSongs[i].url&&!t.playingList.map[i]?e("i",{staticClass:"operation-icon operation-icon-3 iconfont icon-list-add",on:{click:function(e){return t.addPlaying(i)}}}):t._e()]),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"下载",placement:"top"}},[t.allSongs[i].url?e("i",{staticClass:"operation-icon operation-icon-4 iconfont icon-download",on:{click:function(e){return t.download(i)}}}):t._e()]),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"从歌单中删除",placement:"top"}},[t.isMineList?e("i",{staticClass:"operation-icon operation-icon-5 iconfont icon-delete",on:{click:function(e){return t.playlistTracks(i,t.aId,"del","DEL_SONG")}}}):t._e()])],1)],1):t._e()})),e("div",{style:"min-height:0;height:"+71*(t.list.length-t.bigIndex)+"px;"}),t.list.indexOf(t.playNow.aId)>-1?e("div",{staticClass:"focus-btn",on:{click:t.scrollToPlayNow}},[e("i",{staticClass:"iconfont icon-focus"})]):t._e(),"playing"===t.id&&t.playNow&&t.list.length>1?e("div",{staticClass:"clear-btn",on:{click:t.clearPlaying}},[e("i",{staticClass:"iconfont icon-delete"})]):t._e()],2):t._e()])}),[],!1,null,"0cb0cdb2",null);i.a=u.exports},f64c:function(t,i,e){}}]);