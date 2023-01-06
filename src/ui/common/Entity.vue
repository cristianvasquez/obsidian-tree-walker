<script setup lang='ts'>
import {defineProps} from 'vue'
import Row from "./Row.vue";
import Term from "./Term.vue";

const props = defineProps({
	entity: {
		required: true,
		type: Object,
	},
	pointer: {
		required: true,
		type: Object,
	},
})

</script>

<template>
	<template v-if="entity.rows">
		<div class="entity">
			<div class="entity-header">
				<Term :entity="entity" :pointer="pointer"/>
			</div>
			<template v-for="row of entity.rows">
				<row :row="row" :pointer="pointer"/>
			</template>
		</div>
	</template>
	<template v-else>
		<Term :entity="entity" :pointer="pointer"/>
	</template>

</template>

<style>

.internal {
	border: blueviolet solid 1px;
}

.entity-header {
	padding-left: 15px;
	padding-right: 15px;
	margin-left: auto;
	margin-right: auto;
	word-break: break-word;
}

.entity {
	display: flex;
	flex-direction: column;
	border: 1px dashed #d1d1d1;
	border-radius: 10px;
	margin-left: auto;
	margin-right: auto;
}

</style>
