<template>
    <div class="digit" :class="{ spec: spec }">{{ val }}</div>
</template>
<script>
export default {
    props: ["val", "spec"],
};
</script>

<style lang="scss" scoped>
.digit {
    box-sizing: border-box;
    border: 2px solid transparent;
    border-radius: 50%;
    font-size: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff0000;
    transition: border 0.2s ease-in-out;
    &.spec {
        background-color: #15f;
    }
}
</style>