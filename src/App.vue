<template>
    <div class="container">
        <tab-content
            v-for="(item, index) in tabItems"
            :key="index"
            :active="currentTab == index"
            :type="index"
            :lucky="lucky"
            @getLucky="getLucky"
            @share="share"
        />
        <tab-bar :current="currentTab" :items="tabItems" @change="changeTab" />
        <share-box
            :show="showShare"
            :items="shareData"
            @close="showShare = false"
        />
    </div>
</template>

<script>
import tabBar from "./components/tab/tab-bar.vue";
import tabContent from "./components/tab/tab-content.vue";
import shareBox from "./components/share-box.vue";
import { ref } from "vue";
export default {
    components: {
        tabBar,
        tabContent,
        shareBox,
    },
    setup() {
        // data部分
        const currentTab = ref(0);
        const tabItems = ["七星彩", "大乐透"];
        const lucky = ref("祝君中奖");
        const showShare = ref(false);
        const shareData = ref([]);

        // methods部分
        const share = (nums) => {
            showShare.value = true;
            shareData.value = nums;
        };
        const changeTab = (e) => {
            currentTab.value = e;
            getLucky();
        };
        const getLucky = () => {
            const strs = [
                "祝君发大财",
                "祝君天天开心",
                "凡事勿上火",
                "坦然处之",
                "不以物喜，不以己悲",
                "偶尔有个空的也情有可原嘛",
            ];
            const idx = Math.floor(Math.random() * strs.length);
            lucky.value = strs[idx];
        };

        // 返回到视图
        return {
            currentTab,
            tabItems,
            lucky,
            showShare,
            shareData,
            share,
            changeTab,
            getLucky,
        };
    },
};
</script>

<style lang="scss">
body,
html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100;
    --theme-color: #e60013;
    --theme-color-dark: #d0000f;
}
#app {
    -moz-user-select: none;
    -webkit-user-select: none;
    height: 100%;
    background-color: var(--theme-color);
    color: white;
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        .tip {
            color: gold;
            margin-bottom: 5px;
        }
    }
}
</style>
