<script lang="ts" setup>
import {hoverPreview, isInVault, openOrSwitch,} from 'obsidian-community-lib'
import {inject} from '@vue/runtime-core'
import {computed, onMounted, PropType} from "vue";
import {ItemView} from "obsidian";
import {VIEW_NAME} from '../../consts.js'

function getFileTitle(path: string): string {
	if (path.includes("/")) path = path.substring(path.lastIndexOf("/") + 1);
	if (path.endsWith(".md")) path = path.substring(0, path.length - 3);
	return path;
}

const context = inject('context')

const props = defineProps({
	linkTo: {
		type: String as PropType<string>,
		required: true
	},
	isSameNote: {
		type: Boolean,
		required: false
	}
})

async function open(event: MouseEvent) {
	await openOrSwitch(props.linkTo, event)
}

async function hover(event: MouseEvent) {
	//@TS-Ignore
	const view: ItemView = {
		app: this.app,
		getViewType: () => VIEW_NAME
	}

	await hoverPreview(event, view, props.linkTo)
}

onMounted(() => {
	// console.log('Mounted', props.linkTo)
})

const inVault = computed(() => {
	return isInVault(props.linkTo)
})

</script>

<template>
	<template v-if="isSameNote">
				<span
					class="internal-link"
					@mouseover="hover"
				>
					<a>{{ getFileTitle(props.linkTo) }}</a>
				</span>
	</template>
	<template v-else>
		<span
			class="internal-link"
			@click="open"
			@mouseover="hover"
		>
          <a
			  :class="inVault?'':'is-unresolved'"
			  class="internal-link"
		  >{{ getFileTitle(props.linkTo) }}</a
		  >
        </span>

	</template>

</template>
