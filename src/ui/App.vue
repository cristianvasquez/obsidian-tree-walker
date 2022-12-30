<template>
	<h2>Debug</h2>

	<template v-if="pointer">
		<tabular :key="ver" :pointer="pointer"/>
	</template>

</template>

<script setup lang="tsx">
import {onMounted, ref} from "vue";
import {inject} from '@vue/runtime-core'
import {buildIndex} from 'rdf-from-markdown/src/indexers/buildIndex.js'
import {createTermMapper} from 'rdf-from-markdown/src/termMapper/defaultUriResolver.js'
import {toRdf} from 'rdf-from-markdown'
import {getActiveFileContent} from 'obsidian-community-lib'
import Tabular from "./common/Tabular.vue";

const context = inject('context')

const basePath = this.app.vault.adapter.basePath
const activeFile = this.app.workspace.getActiveFile();
const name = activeFile.basename

const pointer = ref()
let ver = ref(1)

onMounted(async () => {

	console.log('Start build index')
	const index = await buildIndex(basePath)
	const termMapper = createTermMapper({index})
	console.log('Index built')

	// @ts-ignore
	// const currentFile = app.workspace?.activeLeaf?.view?.file
	// if (currentFile) {
	// 	// updateView(currentFile)
	// 	await triplifyCurrent(termMapper)
	// }
	await triplifyCurrent(termMapper)
	context.events.on('update', async (file) => {
		// updateView(file)
		// ver.value = ver.value + 1
		await triplifyCurrent(termMapper)
	})

	context.events.on('index', async (file) => {
		// const note = await updateView(file)
		// const size = await indexNote(context.triplestore, note, context.ns, context.uriResolvers)
		// console.log(`indexed ${size} triples`)
		// ver.value = ver.value + 1
		await triplifyCurrent(termMapper)
	})
})


async function triplifyCurrent(termMapper: any) {
	const text = await getActiveFileContent(false)
	pointer.value = toRdf(text, {termMapper, name})
	ver.value = ver.value + 1
}

</script>

<style scoped>
h2 {
	color: lightcoral;
}
</style>
