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

function getTrailing(url: string):string{
	return url.substring(url.lastIndexOf('#') + 1)
}

const context = inject('context')

const props = defineProps({
	wikipath: {
		type: String,
	},
	linktext: {
		type: Boolean,
	}
})

const inVault = computed(()=> {
	return isInVault(props.wikipath)
})

async function open(event: MouseEvent) {
	await openOrSwitch(props.wikipath, event)
}

async function hover(event: MouseEvent) {
	//@TS-Ignore
	const view: ItemView = {
		app: this.app,
		getViewType: () => VIEW_NAME
	}

	await hoverPreview(event, view, props.linktext ?? props.wikipath)
}

onMounted(() => {
	// console.log('Mounted', props.linkTo)
})


</script>

<template>
	<template v-if="wikipath">

				<span
					class="internal-link"
					@click="open"
					@mouseover="hover"
				>
          <a
			  :class="inVault?'':'is-unresolved'"
			  class="internal-link"
		  >{{ getFileTitle(props.wikipath) }}</a
		  >
        </span>


	</template>
	<template v-else>
		<span
			class="internal-link"
			@mouseover="hover"
		>
          <a
			  class="internal-link"
		  >{{ getTrailing(props.linktext) }}</a
		  >
        </span>

	</template>

</template>
