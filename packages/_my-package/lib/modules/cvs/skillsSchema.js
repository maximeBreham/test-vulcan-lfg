import { createSchema } from 'meteor/vulcan:core'

export const skillsSchema = createSchema({
  nom: {
    type: String,
    optional: false,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    max: 100,
    searchable: true,
  },
  niveau: {
    type: Number,
    optional: false,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'number',
    max: 8,
  },
})
