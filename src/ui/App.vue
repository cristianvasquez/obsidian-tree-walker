<script setup lang="tsx">
import {onMounted, ref} from "vue";
import {inject} from '@vue/runtime-core'
import {getActiveFileContent} from 'obsidian-community-lib'
import Tabular from "./common/Tabular.vue";
import {createTriplifier, ns, rdf} from './config.js'

const context = inject('context')

const pointer = ref()
let ver = ref(1)

onMounted(async () => {
	const triplifier = await createTriplifier(app)

	const activeFile = this.app.workspace.getActiveFile();
	if (activeFile) {
		await triplifyCurrent(triplifier, activeFile)
	}

	context.events.on('update', async (file) => {
		await triplifyCurrent(triplifier, file)
	})

	context.events.on('index', async (file) => {
		await triplifyCurrent(triplifier, file)
	})
})


async function triplifyCurrent(triplifier, file) {

	const text = await getActiveFileContent(false)
	pointer.value = triplifier.toRdf(text, {path: file.path})
	// console.log(pointer.value.dataset.toString())
	ver.value = ver.value + 1

}

</script>

<template>
	<h2>Debug</h2>

	<template v-if="pointer">
		<tabular :key="ver" :pointer="pointer"/>
	</template>

</template>

<style scoped>
h2 {
	color: lightcoral;
}
</style>
