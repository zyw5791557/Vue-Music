<script>
import { mapActions } from "vuex";
import { playMode } from "@/common/js/config";
import Scroll from "@/components/scroll/Scroll";
import Confirm from "@/components/confirm/Confirm";
import AddSong from "@/components/add-song/AddSong";
import { playerMixin } from "@/common/js/mixin";

export default {
    name: 'PlayList',
    components: {
        Scroll,
        Confirm,
        AddSong
    },
    mixins: [playerMixin],
    data() {
        return {
            showFlag: false,
            refreshDelay: 120
        };
    },
    computed: {
        modeText() {
            return this.mode === playMode.sequence
                ? "顺序播放"
                : this.mode === playMode.random ? "随机播放" : "单曲循环";
        }
    },
    methods: {
        show() {
            this.showFlag = true;
            setTimeout(() => {
                this.$refs.listContent.refresh();
                this.scrollToCurrent(this.currentSong);
            }, 20);
        },
        hide() {
            this.showFlag = false;
        },
        showConfirm() {
            this.$refs.confirm.show();
        },
        confirmClear() {
            this.deleteSongList();
            this.hide();
        },
        getCurrentIcon(item) {
            if (this.currentSong.id === item.id) {
                return "icon-play";
            }
            return "";
        },
        selectItem(item, index) {
            if (this.mode === playMode.random) {
                index = this.playlist.findIndex(song => {
                    return song.id === item.id;
                });
            }
            this.setCurrentIndex(index);
            this.setPlayingState(true);
        },
        scrollToCurrent(current) {
            const index = this.sequenceList.findIndex(song => {
                return current.id === song.id;
            });
            this.$refs.listContent.scrollToElement(
                this.$refs.list.$el.children[index],
                300
            );
        },
        deleteOne(item) {
            if (item.deleting) {
                return;
            }
            item.deleting = true;
            this.deleteSong(item);
            if (!this.playlist.length) {
                this.hide();
            }
            setTimeout(() => {
                item.deleting = false;
            }, 300);
        },
        addSong() {
            this.$refs.addSong.show();
        },
        ...mapActions(["deleteSong", "deleteSongList"])
    },
    watch: {
        currentSong(newSong, oldSong) {
            if (!this.showFlag || newSong.id === oldSong.id) {
                return;
            }
            setTimeout(() => {
                this.scrollToCurrent(newSong);
            }, 20);
        }
    }
};
</script>

<template>
    <transition name="list-fade">
        <div class="playlist" @click="hide" v-show="showFlag">
        <div class="list-wrapper" @click.stop>
            <div class="list-header">
            <h1 class="title">
                <i class="icon" :class="iconMode" @click="changeMode"></i>
                <span class="text">{{modeText}}</span>
                <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
            </h1>
            </div>
            <scroll ref="listContent" :data="sequenceList" class="list-content" :refreshDelay="refreshDelay">
            <transition-group ref="list" name="list" tag="ul">
                <li :key="item.id" class="item" v-for="(item,index) in sequenceList"
                    @click="selectItem(item,index)">
                <i class="current" :class="getCurrentIcon(item)"></i>
                <span class="text" v-html="item.name"></span>
                <span @click.stop="toggleFavorite(item)" class="like">
                    <i :class="getFavoriteIcon(item)"></i>
                </span>
                <span @click.stop="deleteOne(item)" class="delete">
                    <i class="icon-delete"></i>
                </span>
                </li>
            </transition-group>
            </scroll>
            <div class="list-operate">
            <div @click="addSong" class="add">
                <i class="icon-add"></i>
                <span class="text">添加歌曲到队列</span>
            </div>
            </div>
            <div @click="hide" class="list-close">
            <span>关闭</span>
            </div>
        </div>
        <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
        <add-song ref="addSong"></add-song>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@import "../../common/style/vars.scss";
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;
}
.playlist.list-fade-enter-active,
.playlist.list-fade-leave-active {
  transition: opacity 0.3s;
}
.playlist.list-fade-enter-active .list-wrapper,
.playlist.list-fade-leave-active .list-wrapper {
  transition: all 0.3s;
}
.playlist.list-fade-enter,
.playlist.list-fade-leave-to {
  opacity: 0;
}
.playlist.list-fade-enter .list-wrapper,
.playlist.list-fade-leave-to .list-wrapper {
  transform: translate3d(0, 100%, 0);
}
.playlist.list-fade-enter,
.playlist .list-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: $color-highlight-background;
}
.playlist.list-fade-enter .list-header,
.playlist .list-wrapper .list-header {
  position: relative;
  padding: 20px 30px 10px 20px;
}
.playlist.list-fade-enter .list-header .title,
.playlist .list-wrapper .list-header .title {
  display: flex;
  align-items: center;
}
.playlist.list-fade-enter .list-header .title .icon,
.playlist .list-wrapper .list-header .title .icon {
  margin-right: 10px;
  font-size: 30px;
  color: $color-theme-d;
}
.playlist.list-fade-enter .list-header .title .text,
.playlist .list-wrapper .list-header .title .text {
  flex: 1;
  font-size: $font-size-medium;
  color: $color-text-l;
}
.playlist.list-fade-enter .list-header .title .clear .icon-clear,
.playlist .list-wrapper .list-header .title .clear .icon-clear {
  font-size: $font-size-medium;
  color: $color-text-d;
}
.playlist.list-fade-enter .list-content,
.playlist .list-wrapper .list-content {
  max-height: 240px;
  overflow: hidden;
}
.playlist.list-fade-enter .list-content .item,
.playlist .list-wrapper .list-content .item {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 30px 0 20px;
  overflow: hidden;
}
.playlist.list-fade-enter .list-content .item.list-enter-active,
.playlist .list-wrapper .list-content .item.list-enter-active,
.playlist.list-fade-enter .list-content .item.list-leave-active,
.playlist .list-wrapper .list-content .item.list-leave-active {
  transition: all 0.1s;
}
.playlist.list-fade-enter .list-content .item.list-enter,
.playlist .list-wrapper .list-content .item.list-enter,
.playlist.list-fade-enter .list-content .item.list-leave-to,
.playlist .list-wrapper .list-content .item.list-leave-to {
  height: 0;
}
.playlist.list-fade-enter .list-content .item .current,
.playlist .list-wrapper .list-content .item .current {
  flex: 0 0 20px;
  width: 20px;
  font-size: $font-size-small;
  color: $color-theme-d;
}
.playlist.list-fade-enter .list-content .item .text,
.playlist .list-wrapper .list-content .item .text {
  flex: 1;
  font-size: $font-size-medium;
  color: $color-text-d;
}
.playlist.list-fade-enter .list-content .item .like,
.playlist .list-wrapper .list-content .item .like {
  margin-right: 15px;
  font-size: $font-size-small;
  color: $color-theme;
}
.playlist.list-fade-enter .list-content .item .like .icon-favorite,
.playlist .list-wrapper .list-content .item .like .icon-favorite {
  color: $color-sub-theme;
}
.playlist.list-fade-enter .list-content .item .delete,
.playlist .list-wrapper .list-content .item .delete {
  font-size: $font-size-small;
  color: $color-theme;
}
.playlist.list-fade-enter .list-operate,
.playlist .list-wrapper .list-operate {
  width: 140px;
  margin: 20px auto 30px auto;
}
.playlist.list-fade-enter .list-operate .add,
.playlist .list-wrapper .list-operate .add {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid $color-text-l;
  border-radius: 100px;
  color: $color-text-l;
}
.playlist.list-fade-enter .list-operate .add .icon-add,
.playlist .list-wrapper .list-operate .add .icon-add {
  margin-right: 5px;
  font-size: $font-size-small-s;
}
.playlist.list-fade-enter .list-operate .add .text,
.playlist .list-wrapper .list-operate .add .text {
  font-size: $font-size-small;
}
.playlist.list-fade-enter .list-close,
.playlist .list-wrapper .list-close {
  text-align: center;
  line-height: 50px;
  background: $color-background;
  font-size: $font-size-medium-x;
  color: $color-text-l;
}
</style>
