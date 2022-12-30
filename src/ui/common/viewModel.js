import { createModel } from 'rdf-entity-webcomponent/src/model.js'
import rdf from 'rdf-from-markdown/src/rdf-ext.js'

function createListModel ({ dataset, terms }, options) {
	const subjects = rdf.termSet()
	for (const quad of [...dataset]) {
		subjects.add(quad.subject)
	}

	const anchorFor = rdf.termMap()
	let blankCount = 0
	for (const term of subjects) {
		if (term.termType === 'BlankNode') {
			blankCount = blankCount + 1
			anchorFor.set(term, `blank-${blankCount}`)
		} else {
			anchorFor.set(term, term.value)
		}
	}

	return createModel({ dataset, terms }, options)

}

export { createListModel }
