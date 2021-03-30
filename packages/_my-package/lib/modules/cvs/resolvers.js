import schema from '../../modules/cvs/schema'
import { getArrayChild } from 'meteor/vulcan:lib/lib/modules/simpleSchema_utils'

/**
 * @function - Récupère l'ensemble des champs searchable du schema passé en paramètre, y compris les nested
 * @param {SimpleSchema JSON} schema - SimpleSchema-compatible JSON schema
 * @returns {Array} - Un tableau qui contient tout les champs searchable au format Mongo
 */
const getSearchableFieldForMongo = schema => {
  let searchableField = []

  // On parcours le schema
  Object.keys(schema).forEach(key => {
    // On recherche si il y a des nestedFields
    const arrayChildField = getArrayChild(key, schema)

    if (arrayChildField) {
      // Récupération du schema nested
      const arrayFieldSchema = arrayChildField.type._schema
      const parentFieldNested = key

      // On parcours le schema nested et on récupère les champs qui ont la clé searchable a true
      Object.keys(arrayFieldSchema).forEach(keyNested => {
        if ('searchable' in arrayFieldSchema[keyNested]) {
          // On lui ajoute également sa clé parente, pour la recherche dans Mongo
          if (arrayFieldSchema[keyNested].searchable) searchableField.push(`${parentFieldNested}.${keyNested}`)
        }
      })
    }

    if ('searchable' in schema[key]) {
      if (schema[key].searchable) searchableField.push(key)
    }
  })

  return searchableField
}

const resolvers = {
  multi: {
    name: 'cvs',

    async resolver (root, args, context) {
      const { input: { terms = {} } = { terms: {} } } = args
      let cvs
      let cvContent
      let cvCount

      // Si il y a une recherche demandé
      if (args.input.search) {
        const searchTermsRegex = new RegExp(args.input.search, 'i')
        const fieldToSearch = getSearchableFieldForMongo(schema)
        const formatMongoSearchTerm = fieldToSearch.map(term => {
          const termObject = {}
          termObject[term] = searchTermsRegex
          return termObject
        })

        cvs = await context.Cvs.find({ $or: formatMongoSearchTerm })
        cvsContent = cvs.fetch()
        cvsCount = cvs.count()
      } else {
        let { selector, options } = await context.Cvs.getParameters(terms, {}, context.currentUser)

        cvs = await context.Cvs.find(selector, options)
        cvsContent = cvs.fetch()
        cvsCount = cvs.count()
      }

      return { results: cvsContent, totalCount: cvsCount }
    },
  },

  single: {
    name: 'cv',

    resolver (root, args, context) {
      const _id = args.input.selector.documentId || args.input.selector._id // we keep this for backwards comp until SmartForm passes _id as a prop
      const document = context.Cvs.findOne({ _id: _id })
      return { result: context.Users.restrictViewableFields(context.currentUser, context.Cvs, document) }
    },
  },
}

export default resolvers
