<script setup lang='ts'>

import {defineProps, onMounted, ref, watch} from 'vue'
import {createListModel} from './viewModel.js'
import Entity from "./Entity.vue";
import {defaultOptions} from './options'

const props = defineProps({
	pointer: {
		required: true,
		type: Object,
	},
})

onMounted(() => {
	const {dataset, terms} = props.pointer
	model.value = createListModel({dataset, terms}, defaultOptions)
})

const model = ref()

</script>

<template>
	<template v-for="entity of model">
		<entity :entity="entity"/>
	</template>
</template>

<style>

.term{
	word-break: break-word;
}

.main-header {
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 15px;
}

.main-header h2 {
	margin-top: 15px;
	margin-bottom: 15px;
	font-size: 32px;
	text-align: center;
}

.main-header a {
	font-size: 18px;
	text-transform: uppercase;
	text-align: center;
}

.header {
	font-size: 18px;
	padding-left: 10px;
}


div .bringDown {
	color: #4f4f4f;
}

.vocab {
	color: #4f4f4f;
	font-size: 0.7rem;
}

.vocab::after {
	content: ':';
}

.language {
	color: #4f4f4f;
	font-size: 0.7rem;
	margin-left: 4px;
}

.datatype {
	color: #4f4f4f;
	font-size: 0.5rem;
	margin-left: 4px;
}

.BlankNode a {
	color: #4f4f4f;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.img-container {
	margin-left: auto;
	margin-right: auto;
}

.img-container img {
	max-width: 100%;
}

</style>
