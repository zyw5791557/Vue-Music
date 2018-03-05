<script>
export default {
    name: 'Loading',
    props: {
        title: {
            type: String,
            default: '正在载入...'
        }
    }
};
</script>

<template>
    <div class="loading">
        <img width="24" height="24" src="/static/images/loading.gif">
        <p class="desc">{{title}}</p>
  </div>
</template>

<style lang="scss" scoped>
@import '../../common/style/vars.scss';
    .loading {
        width: 100%;
        text-align: center;
        .desc {
            line-height: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
        }
    }
</style>
