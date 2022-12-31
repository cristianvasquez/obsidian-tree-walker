<script setup lang='ts'>
import {defineProps, onMounted, ref, watch} from 'vue'
import Row from "./Row.vue";
import {baseNamespace} from "../config.js";

const props = defineProps({
	entity: {
		required: true,
		type: Object,
	},
})


function isInternal(term){
	return term.value.startsWith(baseNamespace().value)
}


</script>

<template>
	<template v-if="entity.rows">
		<div class="entity">
			<a class="entity-header">{{ entity.label.string }}</a>
			<template v-for="row of entity.rows">
				<row :row="row"/>
			</template>
		</div>
	</template>
	<template v-else>

		<template v-if="isInternal(entity.term)">
			<div class="term internal">{{ entity.label.string }}</div>
		</template>
		<template v-else>
			<div class="term">{{ entity.label.string }}</div>
		</template>

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
