import { createVaultFromObsidian } from 'vault-triplifier/src/indexers/vault.js'
import {
	createTermMapper,
} from 'vault-triplifier/src/termMapper/defaultTermMapper.js'
import ns from 'vault-triplifier/src/namespaces.js'
import { toRdf } from 'vault-triplifier/src/toRdf.js'
import rdf from 'vault-triplifier/src/rdf-ext.js'

const baseNamespace = rdf.namespace('http://example/org')

const defaultOptions = {
	splitOnTag: false,
	splitOnHeader: true,
	splitOnId: true,
	addLabels: true,
	includeWikiPaths: true,
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
		vault, customMapper, baseNamespace:baseNamespace,
	})

	function _toRDF (text, context){
		return toRdf(text, { termMapper, ...context },
			defaultOptions)
	}

	return {
		vault,
		termMapper,
		toRdf: _toRDF,
	}
}

export { ns, rdf, baseNamespace, createTriplifier }
