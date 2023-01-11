<script lang="ts" setup>
import {hoverPreview, isInVault,} from 'obsidian-community-lib'
import {inject} from '@vue/runtime-core'
import {computed} from "vue";
import {ns} from "../config";
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
	entity: {
		required: true,
		type: Object,
	},
	pointer: {
		required: true,
		type: Object,
	}
})

const item = computed(() => {
	const result = {
		value: props.entity.term.value,
		label: props.entity.label.string
	}
	const wikipath = props.pointer.node(props.entity.term).out(ns.dot.wikipath).values
	if (wikipath.length) {
		result.wikipath = wikipath[0]
		result.isInVault = isInVault(wikipath[0])
	}
	const selector = props.pointer.node(props.entity.term).out(ns.dot.selector).values
	if (selector.length) {
		result.selector = selector[0]
	}
	if (result.isInVault) {
		result.internalLink = result.selector ? `${result.wikipath}#${result.selector}` : result.wikipath
	}

	return result
})

async function open(link: string, event: MouseEvent) {
	const leaf = app.workspace.getLeaf(false);
	await app.workspace.openLinkText(link, '', leaf)
}

async function hover(link: string, event: MouseEvent) {
	//@TS-Ignore
	const view: ItemView = {
		app,
		getViewType: () => VIEW_NAME
	}
	await hoverPreview(event, view, link)
}

</script>

<template>
	<!--	{{item}}-->
	<template v-if="item.internalLink">
		<a
			@click="(event)=>open(item.internalLink, event)"
			@mouseover="(event)=>hover(item.internalLink, event)"
			class="internal-link"
		>{{ item.label }}</a>
	</template>
	<template v-else>
		{{ item.label }}
	</template>
</template>
