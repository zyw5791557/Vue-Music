<script>
import Scroll from "@/components/scroll/Scroll";
import Loading from "@/components/loading/Loading";
import NoResult from "@/components/no-result/NoResult";
import { search } from "@/api/search";
import { ERR_OK } from "@/api/config";
import { createSong, isValidMusic, processSongsUrl } from "@/common/js/song";
import { mapMutations, mapActions } from "vuex";
import Singer from "@/common/js/singer";

const TYPE_SINGER = "singer";
const perpage = 20;

export default {
    name: 'Suggest',
    components: {
        Scroll,
        Loading,
        NoResult
    },
    props: {
        showSinger: {
            type: Boolean,
            default: true
        },
        query: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            page: 1,
            pullup: true,
            beforeScroll: true,
            hasMore: true,
            result: []
        };
    },
    methods: {
        refresh() {
            this.$refs.suggest.refresh();
        },
        search() {
            this.page = 1;
            this.hasMore = true;
            this.$refs.suggest.scrollTo(0, 0);
            search(this.query, this.page, this.showSinger, perpage).then(res => {
                if (res.code === ERR_OK) {
                this._genResult(res.data).then(result => {
                    this.result = result;
                });
                this._checkMore(res.data);
                }
            });
        },
        searchMore() {
            if (!this.hasMore) {
                return;
            }
            this.page++;
            search(this.query, this.page, this.showSinger, perpage).then(res => {
                if (res.code === ERR_OK) {
                this._genResult(res.data).then(result => {
                    this.result = this.result.concat(result);
                });
                this._checkMore(res.data);
                }
            });
        },
        listScroll() {
            this.$emit("listScroll");
        },
        selectItem(item) {
            if (item.type === TYPE_SINGER) {
                const singer = new Singer({
                    id: item.singermid,
                    name: item.singername
                });
                this.$router.push({
                    path: `/search/${singer.id}`
                });
                this.setSinger(singer);
            } else {
                this.insertSong(item);
            }
            this.$emit("select", item);
        },
        getDisplayName(item) {
            if (item.type === TYPE_SINGER) {
                return item.singername;
            } else {
                return `${item.name}-${item.singer}`;
            }
        },
        getIconCls(item) {
            if (item.type === TYPE_SINGER) {
                return "icon-mine";
            } else {
                return "icon-music";
            }
        },
        _genResult(data) {
            let ret = [];
            if (data.zhida && data.zhida.singerid && this.page === 1) {
                ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
            }
            return processSongsUrl(this._normalizeSongs(data.song.list)).then(
                songs => {
                ret = ret.concat(songs);
                return ret;
                }
            );
        },
        _normalizeSongs(list) {
            let ret = [];
            list.forEach(musicData => {
                if (isValidMusic(musicData)) {
                ret.push(createSong(musicData));
                }
            });
            return ret;
        },
        _checkMore(data) {
            const song = data.song;
            if (
                !song.list.length ||
                song.curnum + (song.curpage - 1) * perpage >= song.totalnum
            ) {
                this.hasMore = false;
            }
        },
        ...mapMutations({
            setSinger: "SET_SINGER"
        }),
        ...mapActions(["insertSong"])
    },
    watch: {
        query(newQuery) {
            if (!newQuery) {
                return;
            }
            this.search(newQuery);
        }
    }
};
</script>

<template>
    <div class="suggest">
        <cube-scroll 
            ref="suggest"
            :data="result"
            @pulling-up="searchMore">
            <ul class="suggest-list">
                <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
                    <div class="icon">
                        <i :class="getIconCls(item)"></i>
                    </div>
                    <div class="name">
                        <p class="text" v-html="getDisplayName(item)"></p>
                    </div>
                </li>
            </ul>
        </cube-scroll>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../common/style/vars.scss";
.suggest {
  height: 100%;
  overflow: hidden;
  position: relative;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;
    }
  }
  .no-result-wrapper {
    position: absolute;
    top: 50%;
    z-index: 10;
    width: 100%;
    transform: translateY(-50%);
  }
}
</style>
