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
				<term :term="current"/>
			</template>
		</div>

		<div class="values">
			<template v-for="current of row.values">
				<entity :entity="current"/>
			</template>
		</div>
	</div>
</template>

<style>


/*.rows > :nth-child(1n) {*/
/*	border-top: 1px solid #ef5252;*/
/*}*/

.properties {
	border: blue solid 1px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;

	/*width: fit-content;*/
	/*max-width: fit-content;*/


}

.values {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;

	border: #3cff00 solid 5px;
	/*width: fit-content;*/

}

.row {
	border: #370367 solid 1px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;

}

</style>
