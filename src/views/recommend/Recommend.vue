<script>
export default {
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>

<template>
    <div>

    </div>
</template>

<style lang="scss" scoped>
@import '../../common/style/vars.scss';
.recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content {
        height: 100%;
        overflow: hidden;
        .slider-wrapper {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 40%;
            overflow: hidden;
            .slider-content {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                .cube-slide-dots {
                    bottom: 12px;
                }
                .dot {
                    display: inline-block;
                    margin: 0 4px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: $color-text-l;
                    &.active {
                        width: 20px;
                        border-radius: 5px;
                        background: $color-text-ll;
                    }
                }
            }
        }
        .recommend-list {
            .list-title {
                height: 65px;
                line-height: 65px;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-theme;
            }
            .item {
                display: flex;
                box-sizing: border-box;
                align-items: center;
                padding: 0 20px 20px 20px;
                .icon {
                    flex: 0 0 60px;
                    width: 60px;
                    padding-right: 20px;
                }
                .text {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    flex: 1;
                    line-height: 20px;
                    overflow: hidden;
                    font-size: $font-size-medium;
                    .name {
                        margin-bottom: 10px;
                        color: $color-text;
                    }
                    .desc {
                        color: $color-text-d;
                    }
                }
            }
        }
    }
    .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}

</style>
