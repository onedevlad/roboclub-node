import keystone from 'keystone'


exports = module.exports = (req, res) => {
  const view = new keystone.View(req, res)
  const { locals } = res

  locals.title = 'Курси'
  locals.section = 'courses'

  view.query('courseFields', keystone.list('Coursefield').model.find())
  view.query('courses', keystone.list('Course').model.find())

  view.render('courses')
}
