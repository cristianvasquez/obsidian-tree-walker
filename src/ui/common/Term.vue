<script setup lang='ts'>
import {defineProps, onMounted, ref, watch} from 'vue'

const props = defineProps({
	term: {
		required: true,
		type: Object,
	},
})
</script>

<template>
	<div>[{{term.label.string}}]</div>
</template>
