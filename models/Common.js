import keystone from 'keystone'

import { linkValidate } from '../utils/'


const { Types } = keystone.Field

const Common = new keystone.List('Common', {
  map: {name: 'title'},
  singular: 'Common Layout',
  plural: 'Common Layouts',
  nocreate: true,
  nodelete: true,
})


Common.add({
  title: {type: String, default: 'Common Layout', noedit: true},
  header: {
    facebookLink: {type: Types.Url},
    instagramLink: {type: Types.Url},
  },
  footer: {
    primaryPhoneNumber: {type: String},
    secondaryPhoneNumber: {type: String},
    cityName: {type: String},
    address: {type: String},
    geoLat: {type: String, note: 'This is used by Gmaps'},
    geoLng: {type: String, note: 'This is used by Gmaps'},
  },
})


Common.schema.pre('save', function(next) {
  const { facebookLink, instagramLink } = this.header

  this.facebookLink = linkValidate(facebookLink)
  this.instagramLink = linkValidate(instagramLink)

  next()
})


Common.defaultColumns = 'title, footer.primaryPhoneNumber, footer.secondaryPhoneNumber, footer.address'

Common.register()