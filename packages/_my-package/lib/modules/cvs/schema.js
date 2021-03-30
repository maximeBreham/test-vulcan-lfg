/*

A SimpleSchema-compatible JSON schema

*/
import { skillsSchema } from './skillsSchema'

const skillsGroup = {
  name: 'skills',
  label: 'Compétencessssss',
  order: 10,
}

const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    onCreate: () => {
      return new Date()
    },
  },
  userId: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },

  // custom properties

  name: {
    label: 'Nom du CV',
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    searchable: true,
  },
  year: {
    label: 'Année',
    type: Number,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    searchable: false,
  },
  skills: {
    type: Array,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    arrayItem: {
      type: skillsSchema,
      optional: true,
    },
    group: skillsGroup,
  },

  'skills.$': {
    type: skillsSchema,
  },
}

export default schema
