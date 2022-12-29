<template>
    <h2>Hello,Developer!</h2>
    <Hello></Hello>
    <Hi :hi="hi"></Hi>
    <HiHi></HiHi>
	<A></A>
</template>

<script setup lang="tsx">
import Hello from "./Hello";
import Hi from "./Hi.vue";
import { ref } from "vue";
import {buildIndex} from 'rdf-from-markdown/src/indexers/buildIndex.js'
import {createTermMapper} from 'rdf-from-markdown/src/termMapper/defaultUriResolver.js'
import {toRdf} from 'rdf-from-markdown'
import { getActiveFileContent } from 'obsidian-community-lib'


const basePath = this.app.vault.adapter.basePath
const activeFile = this.app.workspace.getActiveFile();
const name = activeFile.basename
console.log('Start build index')
const index = await buildIndex(basePath)
const termMapper = createTermMapper({index})


const text = await getActiveFileContent(this.app, false)


const pointer = toRdf(text,{termMapper, name})

console.log('Index built', index)

console.log(pointer.dataset.toString())

let A = () => (<h1>{basePath}{name}</h1>)

let hi = ref("");
let HiHi = () => (<h1><Hello></Hello></h1>)



</script>


<style scoped>
h2 {
    color: lightcoral;
}
</style>
