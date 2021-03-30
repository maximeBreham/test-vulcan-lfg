/*

The main Movies collection definition file.

*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core'
import schema from './schema.js'
import './fragments'
import resolvers from './resolvers.js'

const Cvs = createCollection({
  collectionName: 'Cvs',

  typeName: 'Cv',

  schema: schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },

  resolvers: resolvers,
  //resolvers: getDefaultResolvers({ typeName: 'Cv' }),

  //mutations: mutations,
  //mutations: getDefaultMutations({ typeName: 'Cv' }),
})

export default Cvs
