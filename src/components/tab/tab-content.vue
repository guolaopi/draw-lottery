<template>
    <div class="tab-content" :class="{ active: active }">
        <div class="header">
            <div class="href-btn" @click="openUrl">开奖结果</div>
            <div class="draw-btn" @click="draw">
                生成{{ type == 0 ? "七星彩" : "大乐透" }}
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
        const url = `https://www.baidu.com/s?wd=${
            type.value == 0 ? "七星彩" : "大乐透"
        }开奖结果`;

        const openUrl = () => {
            window.open(url);
        };
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
            // 7位，前5位从01-35中选，不可重复，后2位是01-12，由于都是两位数，不满10要补零
            let lefts = []; // 前区数字池
            for (let li = 1; li < 36; li++) {
                lefts.push(li < 10 ? "0" + li.toString() : li.toString());
            }
            let rights = []; // 后区数字池
            for (let ri = 1; ri < 13; ri++) {
                rights.push(ri < 10 ? "0" + ri.toString() : ri.toString());
            }
            let num = []; // 本注结果
            for (let i = 0; i < 5; i++) {
                const li = Math.floor(Math.random() * lefts.length);
                num.push({
                    val: lefts[li],
                    spec: false,
                });
                lefts.splice(li, 1); // 从前区移除
            }
            for (let j = 0; j < 2; j++) {
                const ri = Math.floor(Math.random() * rights.length);
                num.push({
                    val: rights[ri],
                    spec: true,
                });
                rights.splice(ri, 1); // 从后区移除
            }
            items.value = [{ selected: false, num }, ...items.value];
        };

        return {
            url,
            items,
            openUrl,
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
        .share-btn,
        .href-btn {
            background-color: #ffdd00;
            border-radius: 2px;
            color: #d0000f;
            font-weight: bold;
            height: 35px;
            font-size: large;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .draw-btn {
            flex: 1;
        }
        .share-btn,
        .href-btn {
            background-color: #ff7800;
            font-weight: normal;
            color: #fff;
            margin-left: 10px;
            width: 25%;
        }
        .href-btn {
            margin-left: 0px;
            margin-right: 10px;
        }
    }
    .num-list {
        flex: 1;
        overflow-y: auto;
    }
}
</style>