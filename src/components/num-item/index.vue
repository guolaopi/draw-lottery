<template>
    <div class="num" :class="{ selected: selected }">
        <digit-item
            v-for="(dig, index) in num"
            :key="index"
            :val="dig.val"
            :spec="dig.spec"
        />
    </div>
</template>

<script>
import digitItem from "./digit-item.vue";

export default {
    components: {
        digitItem,
    },
    props: ["num", "selected"],
};
</script>

<style lang="scss" scoped>
.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 5px;
    &:first-child {
        .digit {
            border: 2px solid #fff;
        }
    }
    &.selected {
        .digit {
            border: 4px solid #ffdd00;
        }
    }
}
</style>