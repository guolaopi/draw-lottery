<template>
    <div class="tab-content" :class="{ active: active }">
        <div class="header">
            <div class="draw-btn" @click="draw">
                点击生成{{ type == 0 ? "七星彩" : "大乐透" }}
            </div>
            <div class="share-btn" @click="share">分享</div>
        </div>
        <div class="num-list">
            <num-item
                v-for="(item, index) in items"
                :key="index"
                :class="{ selected: item.selected }"
                :num="item.num"
                @click="item.selected = !item.selected"
            />
        </div>
        <div class="tip">已生成 {{ items.length }} 注。{{ lucky }}~</div>
    </div>
</template>

<script>
import { ref, toRefs } from "vue";
import numItem from "../num-item/index.vue";
export default {
    components: {
        numItem,
    },
    props: ["type", "active", "lucky"],
    setup(props, context) {
        const items = ref([]);
        const { type } = toRefs(props);

        const share = () => {
            const selected = items.value
                .filter((p) => p.selected)
                .map((p) => p.num.map((pp) => pp.val));
            context.emit("share", selected);
        };
        const draw = () => {
            if (type.value == 0) {
                qxc(); // 七星彩
            } else {
                dlt(); // 大乐透
            }
            context.emit("getLucky");
        };
        const qxc = () => {
            let num = [];
            // 7位，前6位是0-9，最后1位是0-14
            for (let i = 0; i < 6; i++) {
                num.push({
                    val: Math.floor(Math.random() * 10).toString(),
                    spec: false,
                });
            }
            num.push({
                val: Math.floor(Math.random() * 15).toString(),
                spec: true,
            });
            items.value = [{ selected: false, num }, ...items.value];
        };
        const dlt = () => {
            let num = [];
            // 7位，前5位是01-35，后2位是01-12，由于都是两位数，不满10要补零
            for (let i = 0; i < 6; i++) {
                num.push({
                    val: (Math.floor(Math.random() * 35) + 1).toString(),
                    spec: false,
                });
            }
            for (let j = 0; j < 2; j++) {
                num.push({
                    val: (Math.floor(Math.random() * 12) + 1).toString(),
                    spec: true,
                });
            }
            items.value = [{ selected: false, num }, ...items.value];
        };

        return {
            items,
            share,
            draw,
        };
    },
};
</script>

<style lang="scss" scoped>
.tab-content {
    height: 100%;
    flex: 1;
    padding: 0px 10px;
    display: none;
    overflow: hidden;
    &.active {
        display: flex;
        flex-direction: column;
    }
    .header {
        margin: 5px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .draw-btn,
        .share-btn {
            background-color: #ffdd00;
            border-radius: 2px;
            color: #d0000f;
            font-weight: bold;
            height: 35px;
            font-size: larger;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .draw-btn {
            flex: 1;
        }
        .share-btn {
            background-color: #ff7800;
            font-weight: normal;
            color: #fff;
            margin-left: 10px;
            width: 30%;
        }
    }
    .num-list {
        flex: 1;
        overflow-y: auto;
    }
}
</style>