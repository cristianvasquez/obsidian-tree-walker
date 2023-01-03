import { fromTermMapper } from 'vault-triplifier/index.js'
import { createVaultFromObsidian } from 'vault-triplifier/src/indexers/vault.js'
import ns from 'vault-triplifier/src/namespaces.js'
import rdf from 'vault-triplifier/src/rdf-ext.js'
import {
	createTermMapper,
} from 'vault-triplifier/src/termMapper/defaultTermMapper.js'

const baseNamespace = rdf.namespace('http://example.org/')

const triplifierOptions = {
	splitOnTag: false,
	splitOnHeader: true,
	splitOnId: true,
	addLabels: true,
	includeWikipaths: true,
}

const customMapper = (str) => {
	const values = {
		'is a': ns.rdf.type, 'are': ns.rdf.type, 'ex:knows': ns.ex.knows,
	}
	return values[str]
}

async function createTriplifier (app) {

	const vault = await createVaultFromObsidian(app)
	const termMapper = createTermMapper({
		vault, customMapper, baseNamespace: baseNamespace,
	})

	return fromTermMapper(termMapper)
}

export { ns, rdf, baseNamespace, createTriplifier, triplifierOptions }
