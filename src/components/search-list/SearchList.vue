<script>
export default {
    name: 'SearchList',
    props: {
        searches: {
            type: Array,
            default: []
        }
    },
    methods: {
        selectItem(item) {
            this.$emit("select", item);
        },
        deleteOne(item) {
            this.$emit("delete", item);
        }
    }
};
</script>

<template>
  <div class="search-list" v-show="searches.length">
        <transition-group name="list" tag="ul">
        <li :key="item" class="search-item" @click="selectItem(item)" v-for="item in searches">
            <span class="text">{{item}}</span>
            <span class="icon" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
            </span>
        </li>
        </transition-group>
    </div>
</template>

<style lang="scss" scoped>
@import "../../common/style/vars.scss";
.search-list {
    .search-item {
        display: flex;
        align-items: center;
        height: 40px;
        overflow: hidden;
        .text {
            flex: 1;
            color: $color-text-l;
        }
        .icon {
            .icon-delete {
                font-size: $font-size-small;
                color: $color-text-d;
            }
        }
    }
}
.search-list .search-item.list-enter-active,
.search-list .search-item.list-leave-active {
    transition: all 0.1s;
}
.search-list .search-item.list-enter,
.search-list .search-item.list-leave-to {
    height: 0;
}

</style>
