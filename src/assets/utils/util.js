import Storage from './Storage';

export const messageHelp = (id) => {
    const message = {
        0: {
            message: ''
        }
    };
    const newMessage = [
        {
            content: '',
            time: '',
        }
    ];
    if (id === 'newInfo') {
        const newInfoIndex = Number(Storage.get('notify-new-index') || 0);
        if (newInfoIndex < (newMessage.length - 1)) {
            Storage.set('notify-new-index', newMessage.length - 1);
            window.VUE_APP.$notify({
                title: '更新记录！',
                message: newMessage.slice(newInfoIndex + 1).map((v) => `${v.content} (${v.time})`).slice(-3).join('<br/>'),
                duration: (newMessage.length - newInfoIndex) * 20000,
                dangerouslyUseHTMLString: true,
            })
        }
        return;
    }

    if (!Storage.get(`notify-${id}`)) {
        window.VUE_APP.$notify(message[id]);
        Storage.set(`notify-${id}`, '1');
    }
};

export const handlePlayingList = {
    playMusic: ({id, arr, listId, isDetail = false}) => {
        const {allSongs, allList, playingList} = window.VUE_APP.$store.state;
        const {dispatch} = window.VUE_APP.$store;
        const song = allSongs[id];
        if (!song.url) {
            return;
        }
        let list = listId ? allList[listId] : arr;

        if (listId && listId.indexOf('playing') > -1) {
            list = playingList.trueList;
        }
        dispatch('updatePlayNow', song);
        dispatch('updatePlayingStatus', true);
        let updateData;
        if (isDetail) {
            // 歌单详情页
            if (Number(Storage.get('PLAY_MUSIC_FROM_PLAYLIST'))) {
                updateData = {list, listId};
            } else {
                updateData = {list: [id], more: true};
            }
        } else {
            // 其他的列表
            if (Number(Storage.get('PLAY_MUSIC_FROM_LIST'))) {
                updateData = {list};
            } else {
                updateData = {list: [id], more: true};
            }
        }
        setTimeout(() => {
            window.pDom.play();
        });

        dispatch('updatePlayingList', updateData);
    },

    playList: (arr) => {
        const {$store, $message} = VUE_APP;
        const {state, dispatch} = $store;
        const {allSongs} = $store.state;
        const list = arr.filter((s) => allSongs[s].url);
        if (!list.length) {
            return $message.warning('无可播放歌曲');
        }
        dispatch('updatePlayNow', allSongs[list[0]]);
        dispatch('updatePlayingList', {list});
        dispatch('updatePlayingStatus', true);
    },

    addPlaying: (id) => {
        const {$message, $store} = window.VUE_APP;
        window.event.stopPropagation();
        $store.dispatch('updatePlayingList', {list: [id], more: true});
        $message.success('已加入播放列表！');
    },

    removePlaying: (id) => {
        window.event.stopPropagation();
        const {$store, $message} = window.VUE_APP
        const {state, dispatch} = $store;
        const {playingList, playNow} = state;
        if (id === playNow.aId) {
            dispatch('playNext');
        }
        dispatch('updatePlayingList', {list: playingList.raw.filter((s) => s !== id)});
        $message.success('移出播放列表！');
    }
}