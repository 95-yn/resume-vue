<template>
    <div>
        <button @click="aaa" @vclick="bbb">aaa</button>
        home
    </div>
</template>

<script>
    export default {
        methods: {
            aaa() {
                console.log('aaa');
            },
            bbb() {
                console.log('xxx');
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>