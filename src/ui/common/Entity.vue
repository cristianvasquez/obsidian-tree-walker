<script setup lang='ts'>
import {computed, defineProps, onMounted, ref, watch} from 'vue'
import Row from "./Row.vue";
import {rdf, ns, baseNamespace} from '../config.js'
import InternalLink from "./InternalLink.vue";

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

function isInternal(term) {
	return props.pointer.node(term).out(ns.dot.wikiPath).term || term.value.startsWith(baseNamespace().value)
}

const wikiPath = computed(() => {

	const linkTo = props.pointer.node(props.entity.term).out(ns.dot.wikiPath).value
	if (!linkTo) {
		return
	}
	const notePath = props.pointer.out(ns.dot.wikiPath).value
	return {
		linkTo,
		isSameNote:linkTo.startsWith(notePath)
	}

})


</script>

<template>
	<template v-if="entity.rows">
		<div class="entity">
			<div class="entity-header">
				<template v-if="wikiPath">
					<InternalLink :linkTo="wikiPath.linkTo" :isSameNote="wikiPath.isSameNote"/>
				</template>
				<template v-else>
					<div class="term">{{ entity.label.string }}</div>
				</template>
			</div>
			<template v-for="row of entity.rows">
				<row :row="row" :pointer="pointer"/>
			</template>
		</div>
	</template>
	<template v-else>
		<template v-if="wikiPath">
			<InternalLink :linkTo="wikiPath.linkTo" :isSameNote="wikiPath.isSameNote"/>
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
