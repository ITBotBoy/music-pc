<template>
  <div class="playnow-container" v-if="playNow && playNow.id">
    <div class="progress-container" v-if="playNow.al && playNow.al.picUrl">
      <el-progress
        :width="280"
        color="#409EFFCC"
        :stroke-width="10"
        type="circle"
        :percentage="(percent || 0) * 100"
        style="opacity: 0.5;position: absolute;top: 10px;left: 10px;"
        :show-text="false"
      />
        <el-image :src="playNow.al.picUrl" :class="`progress-cover playing-${!loading && playing}`">
            <img src="http://p2.music.126.net/ftPcA5oCeIQxhiNmEpmtKw==/109951163926974610.jpg?param=300y300"
                 slot="error">
        </el-image>
    </div>
    <div class="song-info">
      <div class="info-line">
        <div class="info-label"><i class="iconfont icon-song" /></div>
        <div class="info-val">
          {{playNow.name}}
          <span class="info-br" v-if="playNow.br">{{getBr(playNow.br)}}</span>
          <i style="vertical-align: -1px;" :class="`pl_10 iconfont icon-${playNow.platform || '163'}`" />
        </div>
      </div>
      <div class="info-line">
        <div class="info-label"><i class="iconfont icon-singer" /></div>
        <div class="info-val">
          <router-link v-for="a in playNow.ar" :key="a.id" :to="changeUrlQuery({id: a.id, from: playNow.platform, mid: a.mid }, '#/singer', false)">{{a.name}} </router-link>
        </div>
      </div>
      <div class="info-line" v-if="playNow.al && playNow.al.name">
        <div class="info-label"><i class="iconfont icon-album" /></div>
        <div class="info-val">
            <router-link :to="changeUrlQuery({ id: playNow.al.id, mid: playNow.al.mid, from: playNow.platform }, '#/album', false)">{{playNow.al.name}}</router-link>
        </div>
      </div>

      <div class="btn-group">
        <router-link class="btn-group-href" to="/"><i class="iconfont icon-lyric"></i></router-link>
        <router-link class="btn-group-href" v-if="playNow.platform !== 'migu'" to="/comment">
          <i class="iconfont icon-comment"></i>
          <span class="pl_10 ft_12" v-if="playNow.comments">{{numberHandle(playNow.comments.total)}}</span>
        </router-link>
        <router-link v-if="playNow.mvId" :to="changeUrlQuery({ id: playNow.mvId, from: playNow.platform }, '/mv', false)" class="btn-group-href">
          <i class="iconfont icon-mv"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { changeUrlQuery } from "../assets/utils/stringHelper";

  export default {
    name: "Playing",
    computed: {
      ...mapGetters({
        playNow: 'getPlaying',
        percent: 'getPlayingPercent',
        playing: 'isPlaying',
        loading: 'isLoading',
        allSongs: 'getAllSongs',
      })
    },
    methods: {
      numberHandle(n) {
        return n > 1000 ? `${Number(n / 1000).toFixed(1)}k` : n
      },
      getBr(val) {
        if (val > 320000) {
          return '无损';
        }
        return `${parseInt(val / 1000)}k`;
      },

      changeUrlQuery,
    }
  }
</script>

<style lang="scss" scoped>
  .home-page-right .playnow-container {
    left: -120px;

    .song-info {
      width: 100% !important;

      .info-line {
        width: 100% !important;
      }
    }
  }
  
  .playnow-container {
    position: relative;
    .progress-container {
      position: absolute;
      top: 40px;
      left: 120px;

      .progress-cover {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 260px;
        height: 260px;
        border-radius: 50%;
        animation: cdRotate 30s infinite linear;

        &.playing-true {
          animation-play-state: running;
        }
        &.playing-false {
          animation-play-state: paused;
        }

        @keyframes cdRotate {
          from {
            -webkit-transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }
    }

    .song-info {
      position: absolute;
      top: 350px;
      left: 140px;
      width: calc(100% - 150px);
      max-width: 500px;
      color: #fffa;
      font-size: 20px;
      cursor: default;

      .info-line {
        min-height: 46px;
        opacity: 0.6;
        transition: 0.3s;
        position: relative;
        line-height: 24px;

        .info-label {
          display: inline-block;
          vertical-align: top;
          font-weight: bold;
          text-shadow: 0 0 0;
          transition: 0.3s;
          width: 50px;
          text-align: right;
          opacity: 1;
          letter-spacing: 1px;
        }

        .info-val {
          max-width: calc(100% - 75px);
          display: inline-block;
          vertical-align: top;
          text-shadow: 0 0 0;
          margin-left: 50px;
          margin-bottom: 15px;
          width: 350px;
          transition: 0.3s;
          font-weight: bold;

          .info-br {
            font-size: 12px;
            border: 1px solid #fff8;
            font-weight: normal;
            padding: 0 3px;
            margin-left: 10px;
          }
        }

        &:hover {
          opacity: 1;

          .info-label {
            font-size: 24px;
            letter-spacing: 3px;
            opacity: 0.8;
          }

          .info-val {
            text-shadow: 0 0 1px #fff9;
            text-decoration: underline;

            .info-br {
              text-decoration: none !important;
            }
          }
        }
      }

      .btn-group {
        height: 32px;
        padding-left: 75px;

        .btn-group-href {
          color: #fff8;
          transition: 0.3s;
          line-height: 32px;
          height: 32px;
          display: inline-block;
          margin-right: 15px;
          min-width: 30px;

          .iconfont {
            font-size: 18px;
            transition: 0.3s;
            font-weight: bold;

            &.icon-mv {
              font-weight: normal;
            }
          }

          &:hover .iconfont {
            font-size: 22px;
            color: #fff;
          }
        }
      }
    }
  }
</style>
