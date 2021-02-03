<template>
    <div class="tabbar">
        <div
            class="tabbar-item"
            v-for="(item, index) in items"
            :key="index"
            :class="{ active: current == index }"
            @click="$emit('change', index)"
        >
            {{ item }}
        </div>
    </div>
</template> 

<script>
export default {
    props: ["items", "current"],
};
</script>

<style lang="scss" scoped>
.tabbar {
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #f50;
    .tabbar-item {
        width: 50%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: var(--theme-color-dark);
        &.active {
            font-weight: bolder;
            color: #ffdd00;
            background-color: var(--theme-color);
            font-size: larger;
        }
    }
}
</style>