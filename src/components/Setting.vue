<template>
  <div class="setting-container">
    <div class="setting-title">看得见的</div>
    <div class="input-row">
      <div class="input-label">
        主页显示：
      </div>
      <div class="input-content">
        <el-radio-group v-model="showHomeType">
          <el-radio-button label="info">歌曲信息</el-radio-button>
          <el-radio-button label="lyric">歌词</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="input-row">
      <div class="input-label">
        先进模式：
      </div>
      <div class="input-content">
        <el-switch v-model="useAudioContext" />
        <div class="input-explain">【仅针对网易云音源有效】关闭后停用AudioContext, 无法展示频谱图，但是能解决大部分无法播放的问题</div>
      </div>
    </div>
    <div class="input-row" v-if="useAudioContext">
      <div class="input-label">
        看见音乐：
      </div>
      <div class="input-content">
        <el-switch v-model="showDrawMusic" />
      </div>
    </div>
    <div class="input-row" v-if="useAudioContext && showDrawMusic">
      <div class="input-label">
        频谱设置：
      </div>
      <div class="input-content">
        <el-radio-group v-model="drawMusicType">
          <el-radio-button label="1">低频 => 高频</el-radio-button>
          <el-radio-button label="2">高频 => 低频 => 高频</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="input-row" v-if="useAudioContext && showDrawMusic">
      <div class="input-label">音频样式：</div>
      <div class="input-content">
        <el-radio-group v-model="drawMusicStyle">
          <el-radio-button label="rect">柱状图</el-radio-button>
          <el-radio-button label="line">曲线</el-radio-button>
<!--          <el-radio-button label="line2">曲线2</el-radio-button>-->
          <el-radio-button label="particle">泡泡</el-radio-button>
<!--          <el-radio-button label="particle2">粒子</el-radio-button>-->
          <el-radio-button label="circle">圈圈</el-radio-button>
          <el-radio-button label="circle2">海螺</el-radio-button>
          <el-radio-button label="voice">音柱</el-radio-button>
<!--          <el-radio-button label="circle3">圆环</el-radio-button>-->
        </el-radio-group>
      </div>
    </div>

    <div class="setting-title">企鹅音乐Cookie</div>
    <div class="input-row">
      <div class="input-label">开启：</div>
      <div class="input-content">
        <el-switch v-model="openSetQCookie" />
        <div class="input-explain">开启并设置Cookie后可以获得更多操作，<span>document.cookie</span></div>
      </div>
    </div>
    <div class="input-row" v-if="openSetQCookie">
      <div class="input-label">手动输入：</div>
      <div class="input-content">
        <el-input
          style="width: 450px"
          type="text"
          placeholder="在 y.qq.com F12打开控制台输入 document.cookie，将打印的字符串粘贴进来"
          v-model="inputCookie"
        />
        <el-button :loading="loading" :disabled="!inputCookie" class="mt_10" @click="setCookie">设置</el-button>
        <span class="input-explain pl_20">Cookie 数据仅存储在本地</span>
      </div>
    </div>
    <div class="setting-title">播放设置</div>
    <div class="input-row">
      <div class="input-row">
        <div class="input-label">默认品质：</div>
        <div class="input-content">
          <el-radio-group v-model="listenSize">
            <el-radio-button label="128">128k</el-radio-button>
            <el-radio-button label="320">320k</el-radio-button>
            <el-radio-button label="flac">无损</el-radio-button>
          </el-radio-group>
          <div class="input-explain">限定企鹅/咪咕音乐！</div>
        </div>
      </div>
      <div class="input-row">
        <div class="input-label">点击歌曲：</div>
        歌单详情页点击歌曲时，
        <el-radio-group v-model="PLAY_MUSIC_FROM_PLAYLIST">
          <el-radio-button label="0">仅将这首歌曲加入播放列表</el-radio-button>
          <el-radio-button label="1">将播放列表替换为当前列表</el-radio-button>
        </el-radio-group>
      </div>
      <div class="input-row">
        <div class="input-label">点击歌曲：</div>
        歌曲列表（专辑、歌手、搜索等）点击歌曲时，
        <el-radio-group v-model="PLAY_MUSIC_FROM_LIST">
          <el-radio-button label="0">仅将这首歌曲加入播放列表</el-radio-button>
          <el-radio-button label="1">将播放列表替换为当前列表</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div class="setting-title">下载设置</div>
    <div class="input-row">
      <div class="input-label">下载歌词：</div>
      <div class="input-content">
        <el-switch v-model="downLyric" />
      </div>
    </div>
    <div class="input-row" v-if="downLyric">
      <div class="input-label">歌词翻译：</div>
      <div class="input-content">
        <el-switch v-model="downLyricTrans" />
      </div>
    </div>
    <div class="input-row">
      <div class="input-label">歌曲名：</div>
      <div class="input-content">
        <el-radio-group v-model="downMusicName">
          <el-radio-button label="0">歌手-歌名</el-radio-button>
          <el-radio-button label="1">歌名-歌手</el-radio-button>
          <el-radio-button label="2">歌名</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="input-row">
      <div class="input-label">默认品质：</div>
      <div class="input-content">
        <el-radio-group v-model="downSize">
          <el-radio-button label="128">128k</el-radio-button>
          <el-radio-button label="320">320k</el-radio-button>
          <el-radio-button label="flac">无损</el-radio-button>
        </el-radio-group>
        <div class="input-explain">限定企鹅/咪咕音乐！</div>
      </div>
    </div>
    <div class="input-row">
      <div class="input-label">重复下载：</div>
      <div class="input-content">
        <el-radio-group v-model="repeatDown">
          <el-radio-button label="0">自动过滤</el-radio-button>
          <el-radio-button label="1">继续下载</el-radio-button>
        </el-radio-group>
        <div class="input-explain">下载中心的重新下载不受影响！</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Storage from '../assets/utils/Storage';
  import { checkCookie } from "../assets/utils/request";
  export default {
    name: "Setting",
    data() {
      return {
          loading:false,
        showDrawMusic: Storage.get('showDrawMusic') !== '0',
        drawMusicType: Storage.get('drawMusicType') || '1',
        drawMusicNum: Storage.get('drawMusicNum') || '64',
        repeatDown: Storage.get('repeatDown') || '0',
        downSize: Storage.get('downSize') || 'flac',
        drawMusicStyle: Storage.get('drawMusicStyle') || 'rect',
        listenSize: Storage.get('listenSize') || '128',
        openSetQCookie: Storage.get('openSetQCookie') !== '0',
        useAudioContext: Storage.get('useAudioContext') !== '0',
        showHomeType: Storage.get('showHomeType') || 'info',
        inputCookie: '',
        downMusicName: Storage.get('downMusicName') || '0',
        downLyric: Storage.get('downLyric', false, '0') !== '0',
        downLyricTrans: Storage.get('downLyricTrans', false, '0') !== '0',
        PLAY_MUSIC_FROM_PLAYLIST: Storage.get('PLAY_MUSIC_FROM_PLAYLIST'),
        PLAY_MUSIC_FROM_LIST: Storage.get('PLAY_MUSIC_FROM_LIST'),
      }
    },
    watch: {
      ...(() => {
        const result = {};
        [
          { key: 'drawMusicType' },
          { key: 'drawMusicNum' },
          { key: 'repeatDown' },
          { key: 'downSize' },
          { key: 'listenSize' },
          { key: 'drawMusicStyle' },
          { key: 'downMusicName' },
          { key: 'PLAY_MUSIC_FROM_PLAYLIST' },
          { key: 'PLAY_MUSIC_FROM_LIST' },
          { key: 'showHomeType' },
          { key: 'downLyric', isNum: true },
          { key: 'downLyricTrans', isNum: true },
          { key: 'showDrawMusic', isNum: true },
          { key: 'openSetQCookie', isNum: true },
          { key: 'useAudioContext', isNum: true },
        ].forEach(({ key, isNum }) => result[key] = (v) => {
          if (key === 'showHomeType') {
            window.VUE_APP.$store.dispatch('setHomeType', v);
          }
          Storage.set(key, isNum ? Number(v) : v);
        });
        return result;
      })(),
    },
    methods: {
      async setCookie() {
          this.loading=true
        const expireTime = new Date(Date.now() + 86400000).toString();
        try {
          this.inputCookie.split('; ').forEach((c) => {
            document.cookie=`${c}; expires=${expireTime}; `;
          });
          const result = await checkCookie();
            this.loading=false
          if (result.success) {
            this.$message.success('设置 Cookie 成功');
          } else {
            throw({ message: 'cookie wrong'})
          }
        } catch (err) {
            this.loading=false
          this.$message.error('cookie 错误或过期')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .setting-container {
    color: #fff8;
    .setting-title {
      font-size: 20px;
      font-weight: bold;
      margin: 15px 0;
    }

    .input-row {
      margin-bottom: 10px;

      .input-label {
        display: inline-block;
        vertical-align: top;
        width: 100px;
      }
      .input-content {
        display: inline-block;
        vertical-align: top;
        max-width: 450px;

        a {
          font-size: 14px;
          text-decoration: underline  ;
        }
      }
      .input-explain {
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
</style>
