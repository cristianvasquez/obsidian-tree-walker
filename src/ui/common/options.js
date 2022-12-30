import ns from 'rdf-from-markdown/src/namespaces.js'
import rdf from 'rdf-from-markdown/src/rdf-ext.js'

const ignoreProperties = rdf.termSet([ns.schema.name, ns.rdfs.label])

const externalLabels = rdf.clownface({ dataset: rdf.dataset() })

externalLabels.node(ns.dot.contains).addOut(ns.schema.name,rdf.literal(''))
externalLabels.node(ns.schema.name).addOut(ns.schema.name,rdf.literal('schema:name'))

const defaultOptions = {
	technicalCues: true,
	highlightLanguage: true,
	embedLists: true,
	embedNamedNodes: true,
	embedBlankNodes: true,
	maxLevel: 3,
	groupValuesByProperty: true,
	groupPropertiesByValue: true,
	externalLabels,
	ignoreProperties,

}
export { defaultOptions }
