<script>
import MusicList from "@/components/music-list/MusicList";
import { getSingerDetail } from "@/api/singer";
import { ERR_OK } from "@/api/config";
import { createSong, isValidMusic } from "@/common/js/song";
import { mapGetters } from "vuex";

export default {
    name: 'SingerDetail',
    computed: {
        title() {
            return this.singer.name;
        },
        bgImage() {
            return this.singer.avatar;
        },
        ...mapGetters(["singer"])
    },
    data() {
        return {
            songs: []
        };
    },
    created() {
        this._getDetail();
    },
    methods: {
        _getDetail() {
            if (!this.singer.id) {
                this.$router.push("/singer");
                return;
            }
            getSingerDetail(this.singer.id).then(res => {
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.data.list);
                }
            });
        },
        _normalizeSongs(list) {
            let ret = [];
            list.forEach(item => {
                let { musicData } = item;
                if (isValidMusic(musicData)) {
                    ret.push(createSong(musicData));
                }
            });
            return ret;
        }
    },
    components: {
        MusicList
    }
};
</script>

<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>

