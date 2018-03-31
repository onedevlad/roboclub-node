import keystone from 'keystone'

import { configStorage, fileValidate, resizeImage, removeFile, updateChildrenWithRelatedParent } from '../utils/'


const storage = configStorage('/images/posts/')
const maxBriefDescriptionLength = 50
const { Types } = keystone.Field


const Post = new keystone.List('Post', {
  map: {name: 'title'},
  autokey: { path: 'slug', from: 'title', unique: true },
  singular: 'Post',
  plural: 'Posts',
})


Post.add({
  title: {type: String, required: true},
  author: {type: String},
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  coverImage: {type: Types.File, storage},
  heroImage: {type: Types.File, storage, note: 'Small square image used on previews. Will be resized to 240x240.'},
  briefDescription: {type: String, note: `${maxBriefDescriptionLength} characters max.`},
  maxBriefDescriptionLength: {type: Number, hidden: true, default: maxBriefDescriptionLength, required: true},
  sections: { type: Types.Relationship, ref: 'Postsection', many: true },
})


const validateBriefDescLength = (text, max) =>
  new Promise((resolve, reject) =>
    text && (text.length < max) ?
      resolve() :
      reject(new Error(`Brief description is ${text.length - maxBriefDescriptionLength} characters too long.`))
  )

Post.schema.pre('validate', function(next) {
  Promise.all([
    updateChildrenWithRelatedParent(Post.model, keystone.list('Postsection').model, this, () => {}),
    validateBriefDescLength(this.briefDescription, maxBriefDescriptionLength)
    // fileValidate(Post.model, storage, this, 'heroImage', {url: '/images/fallbacks/heroNews.jpg', mimetype: 'image/jpeg'}, () => {},
    //   (doc, fieldName, next) => resizeImage(doc[fieldName], 240, 240, next)
    // ),
  ]).then(next).catch(next)


  // validateBriefDescLength(this.briefDescription, maxBriefDescriptionLength, err => {
  //   if(err) return next(err)
  //   updateChildrenWithRelatedParent(Post.model, keystone.list('Postsection').model, doc, err => {
  //     if(err) return next(err)
  //     fileValidate(Post.model, storage, this, 'heroImage', {url: '/images/fallbacks/heroNews.jpg', mimetype: 'image/jpeg'}, next,
  //       (doc, fieldName, next) => resizeImage(doc[fieldName], 240, 240, next)
  //     )
  //   })
  // })
})

Post.schema.pre('remove', function(next) {
  removeFile(storage, this.heroImage, next)
})


Post.defaultColumns = 'title, sections, author|10%, state|10%, publishedDate|15%'

Post.register()