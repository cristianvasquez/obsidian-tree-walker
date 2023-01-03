<script setup lang='ts'>
import {computed, defineProps, onMounted, ref, watch} from 'vue'
import Entity from "./Entity.vue";
import {rdf, ns} from '../config.js'

const props = defineProps({
	row: {
		required: true,
		type: Object,
	},
	pointer: {
		required: true,
		type: Object,
	},
})


const ignored = rdf.termSet([ns.dot.contains, ns.dot.related])

const showProperties = computed(() => {
	for (const prop of props.row.properties) {
		if (!ignored.has(prop.term)) {
			return true
		}
	}
})


</script>

<template>
	<div class="row">
		<template v-if="showProperties">
			<div class="properties">
				<template v-for="current of row.properties">
					<entity :entity="current" :pointer="pointer"/>
				</template>
			</div>
		</template>
		<div class="values">
			<template v-for="current of row.values">
				<entity :entity="current" :pointer="pointer"/>
			</template>
		</div>
	</div>
</template>

<style>


.properties {
	border: blue solid 1px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	margin: auto 10px auto 20px;
	gap: 10px;
}

.values {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	margin: auto;
	gap: 10px;
}

.row {
	border: #370367 solid 1px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}

</style>
