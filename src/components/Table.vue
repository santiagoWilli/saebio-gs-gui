<template>
    <table class="table">
        <thead class="table-dark">
        <tr>
            <th
                scope="col"
                v-for="(header, index) in headers"
                :key="index"
            >{{ header }}</th>
        </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "Table",
    props: {
        headers: Array
    }
}
</script>

<style scoped>
</style>