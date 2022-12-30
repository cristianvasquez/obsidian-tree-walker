<script setup lang='ts'>
import {defineProps, onMounted, ref, watch} from 'vue'
import Row from "./Row.vue";

const props = defineProps({
	entity: {
		required: true,
		type: Object,
	},
})
</script>

<template>
	<template v-if="entity.rows">
		<div class="entity">
			<span>{{ entity.label.string }}</span>
			<div class="rows">
				<template v-for="row of entity.rows">
					<div>
						<row :row="row"/>
					</div>
				</template>
			</div>
		</div>
	</template>
	<template v-else>
		[{{ entity.label.string }}]
		<!--		<term :term="entity"></term>-->
	</template>

</template>

<style>
.entity {
	display: flex;
	flex-direction: column;
	border: 1px solid #d1d1d1;
}
</style>
