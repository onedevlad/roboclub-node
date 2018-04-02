import keystone from 'keystone'

import { configStorage, fileValidate, removeFile } from '../utils/'


const { Types } = keystone.Field

const storage = configStorage('/images/missions/')

const Mission = new keystone.List('Mission', {
  map: {name: 'title'},
  singular: 'Mission',
  plural: 'Missions',
})

Mission.add({
  title: {type: String},
  showTitle: {type: Boolean},
  titlePosition: {
    type: Types.Select,
    numeric: true,
    required: true,
    default: 0,
    dependsOn: {showTitle: true},
    emptyOption: false,
    options: [
      {value: 0, label: 'Left'},
      {value: 1, label: 'Right'}
    ],
  },
  subtitle: {type: String},
  image: {type: Types.File, storage, thumb: true},
  imagePosition: {
    type: Types.Select,
    numeric: true,
    default: 0,
    emptyOption: false,
    options: [
      {value: 0, label: 'Left'},
      {value: 1, label: 'Right'}
    ],
  },
  leftColumn: {type: Types.Html, wysiwyg: true},
  rightColumn: {type: Types.Html, wysiwyg: true},
})

Mission.schema.pre('validate', async function(next) {
  this.image =
    await fileValidate(storage, this.image, {url: '/images/fallbacks/mission.jpg', mimetype: 'image/jpeg'})
      .catch(next)

  next()
})


Mission.schema.pre('remove', function(next) {
  removeFile(storage, this.image, next)
})


Mission.defaultColumns = 'title, subtitle'

Mission.register()