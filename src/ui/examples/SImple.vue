<script setup lang='ts'>
import {defineProps, onMounted, ref, watch} from 'vue'

const props = defineProps({
	entity: {
		required: true,
		type: Object,
	},
})
</script>

<template>
	<div class="entities">
		{{ entity }}
	</div>
</template>
