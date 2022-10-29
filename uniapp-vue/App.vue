<template>
	<h1>hello</h1>
	<button @click="count++">count is {{count}}</button>
</template>

<script setup >
import { computed, ref, onMounted } from 'vue'
const count = ref(1)
</script>

<style>
	/*每个页面公共css */
</style>
