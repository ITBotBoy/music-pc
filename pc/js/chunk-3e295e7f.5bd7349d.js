(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3e295e7f"],{2216:function(t,s,e){},3971:function(t,s,e){"use strict";e.r(s);e("8e6e"),e("ac6a"),e("456d");var n=e("ade3"),i=e("3f0b"),a=e("5880"),o=e("ceb6");function r(t,s){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);s&&(n=n.filter((function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable}))),e.push.apply(e,n)}return e}var c={name:"Download",data:function(){return{}},computed:function(t){for(var s=1;s<arguments.length;s++){var e=null!=arguments[s]?arguments[s]:{};s%2?r(Object(e),!0).forEach((function(s){Object(n.a)(t,s,e[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):r(Object(e)).forEach((function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(e,s))}))}return t}({},Object(a.mapGetters)({downloadInfo:"getDownloadInfo"})),created:function(){this.$store.dispatch("updateShowCover",!1)},methods:{changeStatus:function(t){this.$store.dispatch("updateDownload",{status:"clickSuccess",songId:t})},getBr:function(t){if(t>32e4)return"无损";switch(t){case 128e3:return"128k";case 32e4:return"320k";default:return"".concat(t/1e3,"k")}},getTime:function(t){return Object(i.a)(t).str("YY-M-D HH:mm:ss")},updateDownload:function(t){this.$store.dispatch("updateDownload",t)},download:o.e}},d=(e("9f46"),e("2877")),u=Object(d.a)(c,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"download-page"},[e("h2",[t._v("下载中心")]),e("div",{staticClass:"mt_20",staticStyle:{"line-height":"30px"}},[e("div",{staticClass:"inline-block"}),e("div",{staticClass:"pull-right"},[e("div",{staticClass:"down-button",on:{click:function(s){return t.updateDownload({status:"clear"})}}},[t._v("清空记录")])])]),e("div",{staticClass:"download-list"},t._l(t.downloadInfo.list,(function(s,n){return e("div",{key:s.id,staticClass:"download-list-item"},[e("div",{staticClass:"index-num"},[t._v(t._s(n+1))]),e("div",{staticClass:"song-info"},[e("span",{staticClass:"item-name"},[t._v(t._s(s.name))]),e("span",{staticClass:"item-br"},[t._v(t._s(t.getBr(s.br)))])]),e("div",{staticClass:"item-status"},["clickSuccess"===s.status?e("div",[t._v("下载成功：已点击下载")]):s.song&&s.song.url.indexOf("qq.com")>-1?e("div",[t._v("下载失败：点击播放链接自行下载")]):["init"===s.status?e("div",[t._v("准备一下")]):t._e(),"error"===s.status?e("div",[t._v("下载失败："+t._s(s.errMsg))]):t._e(),"progress"===s.status?e("div",{staticClass:"item-progress"},[e("div",{staticClass:"down-progress",style:"width: "+s.p+"%;"}),t._v("\n                        "+t._s(s.p)+"%\n                    ")]):t._e(),"success"===s.status?e("div",[t._v("下载完成")]):t._e()]],2),e("div",{staticClass:"item-time"},[t._v(t._s(t.getTime(s.startTime)))]),e("div",{staticClass:"item-operation"},[s.song&&s.song.url.indexOf("qq.com")>-1?e("div",{staticClass:"down-button",on:{click:function(e){return t.changeStatus(s.song.aId)}}},[e("a",{attrs:{href:s.song.url,target:"_blank"}},[t._v("播放链接")])]):[-1===["init","progress"].indexOf(s.status)?e("div",{staticClass:"down-button",on:{click:function(e){return t.download(s.song.aId,s.name,!0,s.song)}}},[t._v("重新下载\n                    ")]):t._e(),["init","progress"].indexOf(s.status)>-1?e("div",{staticClass:"down-button",on:{click:function(e){return t.updateDownload({status:"abort",id:s.id})}}},[t._v("取消下载\n                    ")]):t._e()]],2)])})),0)])}),[],!1,null,"143fa1d0",null);s.default=u.exports},"9f46":function(t,s,e){"use strict";e("2216")}}]);