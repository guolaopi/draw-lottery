<template>
    <div class="share" :class="{ show: show }" @click="$emit('close')">
        <div class="share-box" :class="{ poped: show }" @click.stop="">
            <div class="msg" :class="{ show: selected }">
                点击选中的号码可以复制~
            </div>
            <template v-if="items && items.length > 0">
                <div id="allShare">
                    <div
                        class="row"
                        v-for="(item, index) in items"
                        :key="index"
                    >
                        <span
                            class="dig"
                            v-for="(dig, index) in item"
                            :key="index"
                        >
                            {{ dig + (index == item.length - 1 ? "" : ",") }}
                        </span>
                    </div>
                </div>
                <div class="copy-btn" @click="selectAll">全选</div>
            </template>
            <div class="info" v-else>未选择任何号码</div>
        </div>
    </div>
</template>

<script>
import { ref, toRefs, watch } from "vue";
export default {
    props: ["show", "items"],
    setup(props) {
        const selected = ref(false);
        const { show } = toRefs(props);
        watch(show, (newValue) => {
            if (newValue) {
            }
        });

        const selectAll = () => {
            if (!selected.value) {
                var text = document.getElementById("allShare");
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(text);
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                document.getSelection().removeAllRanges();
            }
            selected.value = !selected.value;
        };
        return {
            selected,
            selectAll,
        };
    },
};
</script>

<style lang="scss" scoped>
.share {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.7);
    &.show {
        display: block;
    }
    .share-box {
        box-sizing: border-box;
        padding: 10px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 80%;
        max-height: 70%;
        border-radius: 10px;
        background-color: var(--theme-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &.poped {
            animation: popup 0.35s ease-out;
            @keyframes popup {
                0% {
                    top: 200%;
                }
                100% {
                    top: 0;
                }
            }
        }
        .info {
            font-size: larger;
        }
        .msg {
            display: block;
            color: gold;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.1s ease-in-out;
            &.show {
                opacity: 1;
            }
        }
        #allShare {
            display: flex;
            flex-direction: column;
            flex: 1;
            overflow-y: auto;
            align-items: center;
            justify-content: center;
            .row {
                display: flex;
                font-size: 20px;
                -moz-user-select: text;
                -webkit-user-select: text;
                .dig {
                    text-align: center;
                    line-height: 30px;
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .copy-btn {
            width: 100%;
            text-align: center;
            height: 30px;
            line-height: 30px;
            border-radius: 10px;
            color: #ddd;
            background-color: var(--theme-color-dark);
        }
    }
}
</style>