<script setup lang='ts'>
import {defineProps, onMounted, ref, watch} from 'vue'
import Term from "./Term.vue";
import Entity from "./Entity.vue";

const props = defineProps({
	row: {
		required: true,
		type: Object,
	},
})
</script>

<template>
	<div class="row">
		<div class="properties">
			<template v-for="current of row.properties">
				<div><term :term="current"/></div>
			</template>
		</div>

		<div class="values">
			<template v-for="current of row.values">
				<div><entity :entity="current"/></div>
			</template>
		</div>
	</div>
</template>

<style>


.rows > :nth-child(1n) {
	border-top: 1px solid #ef5252;
}

.properties {
	border: blue solid 2px;
	width: fit-content;
	max-width: fit-content;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

.values {
	border: #3cff00 solid 2px;
	width: fit-content;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

.row {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}


</style>
