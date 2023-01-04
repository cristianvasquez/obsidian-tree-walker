<script lang="ts" setup>
import {hoverPreview, isInVault, openOrSwitch,} from 'obsidian-community-lib'
import {inject} from '@vue/runtime-core'
import {computed} from "vue";
import {baseNamespace, ns} from "../config";
import {ItemView} from "obsidian";
import {VIEW_NAME} from "../../consts";

function getTitle(path: string): string {
	if (path.includes("/")) path = path.substring(path.lastIndexOf("/") + 1);
	if (path.endsWith(".md")) path = path.substring(0, path.length - 3);
	return path;
}

function getTrailing(url: string): string {
	return url.substring(url.lastIndexOf('#') + 1)
}

const context = inject('context')

const props = defineProps({
	term: {
		required: true,
		type: Object,
	},
	pointer: {
		required: true,
		type: Object,
	},
	label: {
		type: Object,
	}
})


const type = computed(() => {
	const wikipath = props.pointer.node(props.term).out(ns.dot.wikipath).values
	if (wikipath.length) {

		return {
			wikiPath: wikipath[0],
			isInVault: isInVault(wikipath[0])
		}
	}
	const linktext = props.pointer.node(props.term).out(ns.dot.linktext).values
	if (linktext.length) {
		return {
			linkText: linktext[0]
		}
	}
	if (props.term.termType === 'NamedNode') {
		return {
			link: props.term.value,
			isInVault: props.term.value.startsWith(baseNamespace())
		}
	}
	return {
		value: props.term.value,
	}
})

async function open(link: string, event: MouseEvent) {
	await openOrSwitch(link, event)
}

async function hover(link: string, event: MouseEvent) {
	//@TS-Ignore
	const view: ItemView = {
		app: this.app,
		getViewType: () => VIEW_NAME
	}
	await hoverPreview(event, view, link)
}

</script>

<template>
	<template v-if="type.wikiPath">
		<span>
				<template v-if="type.isInVault">
				  <a
					  @click="(event)=>open(type.wikiPath, event)"
					  @mouseover="(event)=>hover(type.wikiPath, event)"
					  class="internal-link"
				  >{{ getTitle(type.wikiPath) }}</a>
				</template>
				<template v-else>
					<span>
						{{ getTitle(type.wikiPath) }}
					</span>
				</template>
				</span>
	</template>
	<template v-else-if="type.linkText">
				<span
					class="internal-link"
					@mouseover="(event)=>hover(type.linkText, event)">
		          <a class="internal-link">
					  {{ getTrailing(type.linkText) }} {{ label.string }}
				  </a>
		        </span>
	</template>
	<template v-else-if="type.link">
		<a>{{ label.string }}</a>
	</template>
	<template v-else>
		{{ label.string }}
	</template>

</template>
