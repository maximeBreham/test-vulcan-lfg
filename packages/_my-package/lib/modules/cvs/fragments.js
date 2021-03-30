import { registerFragment } from 'meteor/vulcan:core'

registerFragment(`
  fragment cvFragment on Cv {
    _id
    name
    year
    skills{
      nom
      niveau
    }
  }
`)
