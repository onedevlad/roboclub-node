!function(e){var t={};function i(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=51)}([function(e,t){e.exports=require("keystone")},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.removeObsoleteFile=t.compressImage=t.validateBriefDescLength=t.updateChildrenWithRelatedParent=t.updateChildWithRelatedParent=t.linkValidate=t.fileValidate=t.removeFileAsync=t.removeFile=t.resizeImage=t.isMimetypeValid=t.setFallback=t.fileExists=t.isFileReachable=t.fixPublishedDate=t.configStorage=void 0;var r=l(i(46)),n=l(i(45)),a=l(i(0)),s=l(i(44)),o=l(i(43));function l(e){return e&&e.__esModule?e:{default:e}}s.default.locale("uk");var u=o.default.subClass({imageMagick:!0}),c=(t.configStorage=function(e){return new a.default.Storage({adapter:a.default.Storage.Adapters.FS,fs:{path:"public"+e,publicPath:e},schema:{path:!0,url:!0,originalname:!0}})},t.fixPublishedDate=function(e,t){return(0,n.default)({},e.toObject(),{publishedDate:(0,s.default)(e.publishedDate).format(t)})},t.isFileReachable=function(e){return!(!e||!e.url)}),d=t.fileExists=function(e){return e.path&&e.filename},f=(t.setFallback=function(e,t,i,n){return e.update({_id:t._id},{$set:(0,r.default)({},i,n)}).exec()},t.isMimetypeValid=function(e,t){return e&&~e.mimetype.indexOf(t)}),p=(t.resizeImage=function(e,t,i){return new Promise(function(r,n){return d(e)?u(e.path+e.filename).strip().resizeExact(t,i).quality(50).colorspace("RGB").write(e.path+e.filename,function(e){return e?n(e):r()}):r()})},t.removeFile=function(e,t,i){return e.removeFile(t,i)}),m=t.removeFileAsync=function(e,t){return new Promise(function(i,r){return p(e,t,function(e){return e?r(e):i()})})};t.fileValidate=function(e,t,i){return new Promise(function(r,n){return c(t)?f(t,i.mimetype.split("/")[0])?r(t):d(t)?p(e,t,function(e){return n(e||new Error("File "+t.originalname+" was supposed to be an image."))}):r(i):r(i)})},t.linkValidate=function(e){return e?"http"===e.slice(0,4).toLowerCase()?e:"https://"+e:e},t.updateChildWithRelatedParent=function(e,t,i){return e.findOne({sections:i},{title:!0}).exec(function(e,r){return e?new Error(e):(r||(r={_id:null,title:null}),t.update({_id:i},{relatedParent:{_id:r._id,title:r.title}}).exec())})},t.updateChildrenWithRelatedParent=function(e,t,i){return t.update({"relatedParent._id":i._id},{relatedParent:{_id:null,title:null}},{multi:!0}).exec().then(function(e,r){return t.update({_id:{$in:i.sections}},{relatedParent:{_id:i._id,title:i.title}},{multi:!0}).exec()})},t.validateBriefDescLength=function(e,t){return new Promise(function(i,r){return e.length<=t?i():r(new Error("Brief description is "+(e.length-t)+" characters too long."))})},t.compressImage=function(e){return new Promise(function(t,i){return d(e)?u(e.path+e.filename).size(function(r,n){return r?i(r):u(e.path+e.filename).strip().resize(n.width>1366?1366:null).quality(50).colorspace("RGB").write(e.path+e.filename,function(r){return r?i(r):t(e)})}):t(e)})},t.removeObsoleteFile=function(e,t,i){return new Promise(function(r,n){return d(t)&&d(i)&&i.filename!==t.filename?m(e,t).then(r):r()})}},function(e,t){e.exports=require("babel-runtime/helpers/asyncToGenerator")},function(e,t){e.exports=require("babel-runtime/regenerator")},function(e,t){e.exports=require("lodash")},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};i(1);e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.title="Команда",r.section="about",i.on("init",function(e){a.default.list("Participant").model.find().exec(function(t,i){r.team=i,e(t)})}),i.render("team")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.title="Презентації",r.section="about",i.on("init",function(e){a.default.list("Presentation").model.find().exec(function(t,i){r.presentations=i,e()})}),i.render("presentations")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r},s=i(1);e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.title="Новини",r.section="posts",i.on("init",function(e){a.default.list("Post").model.find().where("state","published").select({heading:1,briefDescription:1,heroImage:1,publishedDate:1,slug:1}).sort("-publishedDate").exec(function(t,i){r.posts=i?i.map(function(e){return(0,s.fixPublishedDate)(e,"DD/MM/YYYY")}):[],e(t)})}),i.render("posts")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r},s=i(1);e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.section="posts",r.filters={post:e.params.post},i.on("init",function(e){a.default.list("Post").model.findOne({state:"published",slug:r.filters.post}).populate({path:"sections",options:{sort:{sequenceNumber:1}}}).exec(function(i,n){r.title=n.title,r.post=n?(0,s.fixPublishedDate)(n,"DD/MM/YYYY"):t.redirect("/404"),e(i)})}),i.on("init",function(t){a.default.list("Post").model.find({slug:{$ne:e.params.post}}).where("state","published").select({heading:1,briefDescription:1,heroImage:1,publishedDate:1,slug:1}).sort("-publishedDate").limit(4).exec(function(e,i){r.posts=i?i.map(function(e){return(0,s.fixPublishedDate)(e,"DD/MM/YYYY")}):[],t(e)})}),i.render("post")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.title="Партнери",r.section="about",i.on("init",function(e){a.default.list("Partner").model.find().exec(function(t,i){r.partners=i,e(t)})}),i.render("partners")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.title="Місія",r.section="about",i.query("donation",a.default.list("Donation").model.findOne()),i.on("init",function(e){a.default.list("Mission").model.find().exec(function(t,i){r.missions=i,e(t)})}),i.render("mission")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r},s=i(1);e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.section="home",i.query("quotes",a.default.list("Quote").model.find()),i.query("layout",a.default.list("Layout").model.findOne()),i.query("partners",a.default.list("Partner").model.find()),i.on("init",function(e){a.default.list("Post").model.find().where("state","published").select({heading:1,briefDescription:1,heroImage:1,publishedDate:1,slug:1}).sort("-publishedDate").limit(4).exec(function(t,i){r.posts=i?i.map(function(e){return(0,s.fixPublishedDate)(e,"DD MMMM YYYY")}):[],e(t)})}),i.render("index")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.title="Відгуки",r.section="about",i.render("feedback")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.title="FAQ",r.sections="about",i.query("faqs",a.default.list("Faq").model.find().populate({path:"sections",options:{sort:{sequenceNumber:1}}}).sort({sequenceNumber:1})),i.render("faq")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};e.exports=function(e,t){var i=new a.default.View(e,t);t.locals.section="500",t.status(500),i.render("errors/500")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};e.exports=function(e,t){var i=new a.default.View(e,t);t.locals.section="404",t.status(404),i.render("errors/404")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.title="Курси",r.section="courses",i.query("courseFields",a.default.list("Coursefield").model.find()),i.query("courses",a.default.list("Course").model.find()),i.on("init",function(e){a.default.list("Course").model.find({active:!0}).distinct("age").exec(function(t,i){r.courseAges=i.sort(function(e,t){return e>t}),e(t)})}),i.render("courses")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};i(1);e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.section="courses",r.filters={course:e.params.course},i.on("init",function(e){a.default.list("Course").model.findOne({active:!0,slug:r.filters.course}).populate({path:"relatedAlbum",populate:{path:"sections"}}).populate({path:"sections",options:{sort:{sequenceNumber:1}}}).exec(function(t,i){r.course=i,e(t)})}),i.on("init",function(t){a.default.list("Course").model.find({slug:{$ne:e.params.post},active:!0}).select({title:1,briefDescription:1,heroImage:1,slug:1,age:1}).limit(4).exec(function(e,i){r.title=i.title,r.courses=i,t(e)})}),i.render("course")}},function(e,t,i){"use strict";var r=i(0),n=r.list("Enquiry");e.exports=function(e,t){var i=new r.View(e,t);t.locals.section="contact";var a=e.body,s=a.name,o=a.phone,l=a.email,u=a.subject,c=a.message;n.model.create({name:s,phone:o,email:l,subject:u,message:c}).then(function(){return i.render("contact")}).catch(function(e){return console.log(e)})}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r},s=i(1);e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.title="Галерея",r.section="albums",i.on("init",function(e){a.default.list("Album").model.find({},{title:1,heroImage:1,publishedDate:1,slug:1}).sort("-publishedDate").exec(function(t,i){r.albums=i?i.map(function(e,t){return(0,s.fixPublishedDate)(e,"DD/MM/YYYY")}):[],e(t)})}),i.render("albums")}},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r},s=i(1);e.exports=function(e,t){var i=new a.default.View(e,t),r=t.locals;r.section="albums",r.filters={album:e.params.album},i.on("init",function(e){a.default.list("Album").model.findOne({slug:r.filters.album}).populate("sections").exec(function(i,n){n?(r.title=n.title,r.album=(0,s.fixPublishedDate)(n,"DD/MM/YYYY")):t.redirect("/404"),e(i)})}),i.on("init",function(t){a.default.list("Album").model.find({slug:{$ne:e.params.album}}).select({title:1,heroImage:1,publishedDate:1,slug:1}).sort("-publishedDate").limit(4).exec(function(e,i){r.albums=i?i.map(function(e){return(0,s.fixPublishedDate)(e,"DD/MM/YYYY")}):[],t(e)})}),i.render("album")}},function(e,t,i){var r={"./album.js":20,"./albums.js":19,"./contact.js":18,"./course.js":17,"./courses.js":16,"./errors/404.js":15,"./errors/500.js":14,"./faq.js":13,"./feedback.js":12,"./home.js":11,"./mission.js":10,"./partners.js":9,"./post.js":8,"./posts.js":7,"./presentations.js":6,"./team.js":5};function n(e){var t=a(e);return i(t)}function a(e){var t=r[e];if(!(t+1)){var i=new Error('Cannot find module "'+e+'".');throw i.code="MODULE_NOT_FOUND",i}return t}n.keys=function(){return Object.keys(r)},n.resolve=a,e.exports=n,n.id=21},function(e,t){e.exports=require("webpack-requiredir")},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.flashMessages=t.initLocals=void 0;var r=a(i(0)),n=a(i(4));function a(e){return e&&e.__esModule?e:{default:e}}t.initLocals=function(e,t,i){t.locals.navLinks=[{label:"Головна",key:"home",href:"/"},{label:"Про нас",key:"about",href:"/team",pages:[{label:"Команда",key:"team",href:"/team"},{label:"Місія",key:"mission",href:"/mission"},{label:"Презентації",key:"presentations",href:"/presentations"},{label:"Партнери",key:"partners",href:"/partners"},{label:"Відгуки",key:"feedback",href:"/feedback"},{label:"FAQ",key:"faq",href:"/faq"}]},{label:"Курси",key:"courses",href:"courses"},{label:"Новини",key:"posts",href:"/posts"},{label:"Галерея",key:"albums",href:"/albums"},{label:"Контакти",key:"contacts",href:""}],t.locals.user=e.user,r.default.list("Common").model.findOne({},{_id:!1}).exec().then(function(e){t.locals.commonLayout=e,i()}).catch(i)},t.flashMessages=function(e,t,i){var r={info:e.flash("info"),success:e.flash("success"),warning:e.flash("warning"),error:e.flash("error")};t.locals.messages=!!n.default.some(r,function(e){return e.length})&&r,i()};t.requireUser=function(e,t,i){if(e.user)return i();e.flash("error","Please sign in to access this page."),t.redirect("/keystone/signin")}},function(e,t,i){"use strict";(function(t){var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};var s=i(23),o=i(22),l="production"===a.default.get("env")?o(i(21)):a.default.importer(t)("./views");a.default.pre("routes",s.initLocals),a.default.pre("render",s.flashMessages);var u={views:l};e.exports=function(e){e.get("/",u.views.home),e.get("/posts",u.views.posts),e.get("/post/:post",u.views.post),e.get("/team",u.views.team),e.get("/mission",u.views.mission),e.get("/presentations",u.views.presentations),e.get("/partners",u.views.partners),e.get("/feedback",u.views.feedback),e.get("/faq",u.views.faq),e.get("/courses",u.views.courses),e.get("/course/:course",u.views.course),e.get("/albums",u.views.albums),e.get("/album/:album",u.views.album),e.post("/contact",u.views.contact),e.get("/500",u.views.errors[500]),e.all("*",u.views.errors[404])}}).call(this,"/")},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};var s=a.default.Field.Types,o=new a.default.List("User");o.add({name:{type:s.Name,required:!0,index:!0},email:{type:s.Email,initial:!0,required:!0,unique:!0,index:!0},password:{type:s.Password,initial:!0,required:!0}},"Permissions",{isAdmin:{type:Boolean,label:"Can access Keystone",index:!0}}),o.schema.virtual("canAccessKeystone").get(function(){return this.isAdmin}),o.relationship({ref:"Post",path:"posts",refPath:"author"}),o.defaultColumns="name, email, isAdmin",o.register()},function(e,t,i){"use strict";var r=o(i(3)),n=o(i(2)),a=o(i(0)),s=i(1);function o(e){return e&&e.__esModule?e:{default:e}}var l,u=a.default.Field.Types,c=(0,s.configStorage)("/images/quotesAuthors/"),d=new a.default.List("Quote",{map:{name:"author"},singular:"Quote",plural:"Quotes"});d.add({author:{type:String,required:!0},text:{type:u.Html,wysiwyg:!0,height:300},authorAvatar:{type:u.File,storage:c,note:"Will be resized to 64x64",thumb:!0},oldAuthorAvatar:{type:u.File,storage:c,hidden:!0}}),d.schema.pre("validate",(l=(0,n.default)(r.default.mark(function e(t){var i,n;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=this.authorAvatar,n=this.oldAuthorAvatar,e.next=3,(0,s.fileValidate)(c,i,{url:"/images/fallbacks/quotesAuthors.png",mimetype:"image/png"}).then((0,s.resizeImage)(i,64,64)).catch(t);case 3:return this.authorAvatar=e.sent,e.next=6,(0,s.removeObsoleteFile)(c,n,i);case 6:this.oldAuthorAvatar=i,t();case 8:case"end":return e.stop()}},e,this)})),function(e){return l.apply(this,arguments)})),d.schema.pre("remove",function(e){(0,s.removeFile)(c,this.coverImage,e)}),d.defaultColumns="author|20%, text",d.register()},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r},s=i(1);var o=a.default.Field.Types,l=new a.default.List("Presentation",{map:{name:"title"},singular:"Presentation",plural:"Presentations"});l.add({title:{type:String},text:{type:o.Html,wysiwyg:!0},viewLink:{type:o.Url},downloadLink:{type:o.Url}}),l.schema.pre("save",function(e){this.viewLink=(0,s.linkValidate)(this.viewLink),this.downloadLink=(0,s.linkValidate)(this.downloadLink),e()}),l.defaultColumns="title, text",l.register()},function(e,t,i){"use strict";var r=o(i(3)),n=o(i(2)),a=o(i(0)),s=i(1);function o(e){return e&&e.__esModule?e:{default:e}}var l,u=(0,s.configStorage)("/images/posts/"),c=a.default.Field.Types,d=new a.default.List("Postsection",{map:{name:"subtitle"},singular:"Postsection",plural:"Postsections"});d.add({subtitle:{type:String},showSubtitle:{type:Boolean,default:!0},sequenceNumber:{type:c.Number,default:0},text:{type:c.Html,wysiwyg:!0,height:300},image:{type:c.File,storage:u,thumb:!0},oldImage:{type:c.File,storage:u,hidden:!0},relatedParent:{_id:{type:String,hidden:!0},title:{type:String,hidden:!0,label:"Related Course"}}}),d.schema.pre("save",(l=(0,n.default)(r.default.mark(function e(t){var i,n,o;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=this.image,n=this.oldImage,o=this._id,e.next=3,(0,s.updateChildWithRelatedParent)(a.default.list("Post").model,d.model,o).catch(t);case 3:if(!i.filename){e.next=9;break}return e.next=6,(0,s.fileValidate)(u,i,{mimetype:"image/jpeg"}).catch(t);case 6:e.t0=e.sent,e.next=10;break;case 9:e.t0={};case 10:return this.image=e.t0,e.next=13,(0,s.removeObsoleteFile)(u,n,i);case 13:this.oldImage=i,t();case 15:case"end":return e.stop()}},e,this)})),function(e){return l.apply(this,arguments)})),d.schema.pre("remove",function(e){(0,s.removeFile)(u,this.image,e)}),d.relationship({ref:"Post",refPath:"sections"}),d.defaultColumns="subtitle, relatedParent.title, sequenceNumber|20%",d.register()},function(e,t,i){"use strict";var r=o(i(3)),n=o(i(2)),a=o(i(0)),s=i(1);function o(e){return e&&e.__esModule?e:{default:e}}var l,u=(0,s.configStorage)("/images/posts/"),c=a.default.Field.Types,d=new a.default.List("Post",{map:{name:"title"},autokey:{path:"slug",from:"title",unique:!0},singular:"Post",plural:"Posts"});d.add({title:{type:String,required:!0},author:{type:String},state:{type:c.Select,options:"draft, published, archived",default:"draft",index:!0},publishedDate:{type:c.Date,index:!0,dependsOn:{state:"published"}},coverImage:{type:c.File,storage:u,thumb:!0},oldCoverImage:{type:c.File,storage:u,hidden:!0},heroImage:{type:c.File,storage:u,note:"Small square image used on previews. Will be resized to 240x240.",thumb:!0},oldHeroImage:{type:c.File,storage:u,hidden:!0},briefDescription:{type:String,note:"50 characters max."},maxBriefDescriptionLength:{type:Number,hidden:!0,default:50,required:!0},sections:{type:c.Relationship,ref:"Postsection",many:!0}}),d.schema.pre("validate",(l=(0,n.default)(r.default.mark(function e(t){var i,n,o,l,c,f=this;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=this.heroImage,n=this.coverImage,o=this.oldCoverImage,l=this.oldHeroImage,c=this.briefDescription,e.next=3,(0,s.updateChildrenWithRelatedParent)(d.model,a.default.list("Postsection").model,this).catch(t);case 3:return e.next=5,(0,s.fileValidate)(u,n,{url:"/images/fallbacks/homeCover.jpg",mimetype:"image/jpeg"}).catch(t);case 5:return this.coverImage=e.sent,e.next=8,(0,s.fileValidate)(u,i,{url:"/images/fallbacks/heroNews.jpg",mimetype:"image/jpeg"}).then((0,s.resizeImage)(i,240,240)).catch(t);case 8:return this.heroImage=e.sent,Promise.all([(0,s.removeObsoleteFile)(u,o,n),(0,s.removeObsoleteFile)(u,l,i)]).then(function(){f.oldCoverImage=n,f.oldHeroImage=i}).catch(t),e.next=12,(0,s.validateBriefDescLength)(c||"",50).catch(t);case 12:t();case 13:case"end":return e.stop()}},e,this)})),function(e){return l.apply(this,arguments)})),d.schema.pre("remove",function(e){(0,s.removeFile)(u,this.heroImage).then(e)}),d.defaultColumns="title, sections, author|10%, state|10%, publishedDate|15%",d.register()},function(e,t,i){"use strict";var r=o(i(3)),n=o(i(2)),a=o(i(0)),s=i(1);function o(e){return e&&e.__esModule?e:{default:e}}var l,u=(0,s.configStorage)("/images/partners/"),c=a.default.Field.Types,d=new a.default.List("Partner",{map:{name:"title"},singular:"Partner",plural:"Partners"});d.add({title:{type:String,required:!0},text:{type:c.Html,wysiwyg:!0},image:{type:c.File,storage:u,note:"Will be resized to 150x75",thumb:!0},oldImage:{type:c.File,storage:u,hidden:!0},link:{type:c.Url}}),d.schema.pre("save",(l=(0,n.default)(r.default.mark(function e(t){var i,n,a;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=this.link,n=this.image,a=this.oldImage,this.link=(0,s.linkValidate)(i),e.next=4,(0,s.fileValidate)(u,n,{url:"/images/fallbacks/partner.jpg",mimetype:"image/jpeg"}).then((0,s.resizeImage)(n,150,75));case 4:return this.image=e.sent,e.next=7,(0,s.removeObsoleteFile)(u,a,n);case 7:this.oldImage=n,t();case 9:case"end":return e.stop()}},e,this)})),function(e){return l.apply(this,arguments)})),d.schema.pre("remove",function(e){(0,s.removeFile)(u,this.image,e)}),d.defaultColumns="title, text",d.register()},function(e,t,i){"use strict";var r=o(i(3)),n=o(i(2)),a=o(i(0)),s=i(1);function o(e){return e&&e.__esModule?e:{default:e}}var l,u=a.default.Field.Types,c=(0,s.configStorage)("/images/team/"),d=new a.default.List("Participant",{map:{name:"person"},singular:"Participant",plural:"Participants"});d.add({person:{type:String,required:!0,index:!0},bio:{type:u.Html,wysiwyg:!0,height:300,required:!0,initial:!0,index:!0},facebookLink:{type:u.Url},instagramLink:{type:u.Url},avatar:{index:!0,type:u.File,storage:c,thumb:!0},oldAvatar:{type:u.File,storage:c,hidden:!0}}),d.schema.pre("validate",(l=(0,n.default)(r.default.mark(function e(t){var i,n,a,o;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=this.facebookLink,n=this.instagramLink,a=this.avatar,o=this.oldAvatar,this.facebookLink=(0,s.linkValidate)(i),this.instagramLink=(0,s.linkValidate)(n),e.next=5,(0,s.fileValidate)(c,a,{url:"/images/fallbacks/participant.png",mimetype:"image/png"}).catch(t);case 5:return this.avatar=e.sent,e.next=8,(0,s.removeObsoleteFile)(c,o,a);case 8:this.oldAvatar=a,t();case 10:case"end":return e.stop()}},e,this)})),function(e){return l.apply(this,arguments)})),d.schema.pre("remove",function(e){c.removeFile(this.avatar,e)}),d.defaultColumns="person, bio",d.register()},function(e,t,i){"use strict";var r=o(i(3)),n=o(i(2)),a=o(i(0)),s=i(1);function o(e){return e&&e.__esModule?e:{default:e}}var l,u=a.default.Field.Types,c=(0,s.configStorage)("/images/missions/"),d=new a.default.List("Mission",{map:{name:"title"},singular:"Mission",plural:"Missions"});d.add({title:{type:String},showTitle:{type:Boolean},titlePosition:{type:u.Select,numeric:!0,required:!0,default:0,dependsOn:{showTitle:!0},emptyOption:!1,options:[{value:0,label:"Left"},{value:1,label:"Right"}]},subtitle:{type:String},image:{type:u.File,storage:c,thumb:!0},oldImage:{type:u.File,storage:c,hidden:!0},imagePosition:{type:u.Select,numeric:!0,default:0,emptyOption:!1,options:[{value:0,label:"Left"},{value:1,label:"Right"}]},leftColumn:{type:u.Html,wysiwyg:!0},rightColumn:{type:u.Html,wysiwyg:!0}}),d.schema.pre("validate",(l=(0,n.default)(r.default.mark(function e(t){var i,n;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=this.image,n=this.oldImage,e.next=3,(0,s.fileValidate)(c,i,{url:"/images/fallbacks/mission.jpg",mimetype:"image/jpeg"}).catch(t);case 3:return this.image=e.sent,e.next=6,(0,s.removeObsoleteFile)(c,n,i);case 6:this.oldImage=i,t();case 8:case"end":return e.stop()}},e,this)})),function(e){return l.apply(this,arguments)})),d.schema.pre("remove",function(e){(0,s.removeFile)(c,this.image,e)}),d.defaultColumns="title, subtitle",d.register()},function(e,t,i){"use strict";var r=o(i(3)),n=o(i(2)),a=o(i(0)),s=i(1);function o(e){return e&&e.__esModule?e:{default:e}}var l,u=a.default.Field.Types,c=(0,s.configStorage)("/images/home/"),d=new a.default.List("Layout",{map:{name:"mainTitle"},singular:"Layout",plural:"Layouts",nocreate:!0,nodelete:!0});d.add({mainTitle:{type:String,required:!0},mainSubtitle:{type:String},coverImage:{type:u.File,storage:c,thumb:!0},oldCoverImage:{type:u.File,storage:c,hidden:!0},articleTitle:{type:String},articleLeftColumn:{type:u.Html,wysiwyg:!0},articleRightColumn:{type:u.Html,wysiwyg:!0},introSubtitle:{type:String},introText:{type:u.Html,wysiwyg:!0},registerLink:{type:u.Url}}),d.schema.pre("save",(l=(0,n.default)(r.default.mark(function e(t){var i,n,a;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=this.registerLink,n=this.coverImage,a=this.oldCoverImage,this.registerLink=(0,s.linkValidate)(i),e.next=4,(0,s.fileValidate)(c,n,{url:"/images/fallbacks/homeCover.jpg",mimetype:"image/jpeg"}).catch(t);case 4:return this.coverImage=e.sent,e.next=7,(0,s.removeObsoleteFile)(c,a,n).catch(t);case 7:this.oldCoverImage=n,t();case 9:case"end":return e.stop()}},e,this)})),function(e){return l.apply(this,arguments)})),d.schema.pre("remove",function(e){removeFile(c,this.coverImage).then(e).catch(e)}),d.defaultColumns="mainTitle, mainSubtitle",d.register()},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r},s=i(1);var o=a.default.Field.Types,l=new a.default.List("Faqsection",{map:{name:"subtitle"},singular:"Faqsection",plural:"Faqsections"});l.add({subtitle:{type:String,required:!0},sequenceNumber:{type:o.Number,default:0},text:{type:o.Html,wysiwyg:!0},relatedParent:{_id:{type:String,hidden:!0},title:{type:String,hidden:!0,label:"Related FAQ"}}}),l.schema.pre("validate",function(e){(0,s.updateChildWithRelatedParent)(a.default.list("Faq").model,l.model,this._id).then(e).catch(e)}),l.relationship({ref:"Faq",refPath:"sections"}),l.defaultColumns="subtitle, relatedParent.title sequenceNumber|25%",l.register()},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r},s=i(1);var o=a.default.Field.Types,l=new a.default.List("Faq",{map:{name:"title"},singular:"Faq",plural:"Faqs"});l.add({title:{type:String,required:!0},sequenceNumber:{type:o.Number,default:0},sections:{type:o.Relationship,ref:"Faqsection",many:!0}}),l.schema.pre("save",function(e){(0,s.updateChildrenWithRelatedParent)(l.model,a.default.list("Faqsection").model,this).then(e).catch(e)}),l.defaultColumns="title, sections, sequenceNumber|25%",l.register()},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};var s=a.default.Field.Types,o=new a.default.List("Enquiry",{nocreate:!0,noedit:!0});o.add({name:{type:String,required:!0},email:{type:s.Email},phone:{type:String},subject:{type:String},message:{type:s.Html,required:!0},createdAt:{type:Date,default:Date.now}}),o.defaultSort="-createdAt",o.defaultColumns="name, email, enquiryType, createdAt",o.register()},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};var s=a.default.Field.Types,o=new a.default.List("Donation",{map:{name:"title"},singular:"Donation",plural:"Donation",nocreate:!0,nodelete:!0});o.add({title:{type:String,required:!0},text:{type:s.Html,wysiwyg:!0},putAfterMission:{type:Number,default:1,required:!0}}),o.defaultColumns="title, text",o.register()},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r},s=i(1);var o=a.default.Field.Types,l=new a.default.List("Coursesection",{map:{name:"title"},singular:"Course section",plural:"Course sections",label:"Course sections"});l.add({title:{type:String,required:!0},sequenceNumber:{type:o.Number,default:0},fancyTitlebar:{type:Boolean,default:!0,note:"Whether or not display large blue strip with the title on it or a simple subtitle."},text:{type:o.Html,wysiwyg:!0},relatedParent:{_id:{type:String,hidden:!0},title:{type:String,hidden:!0,label:"Related Course"}}}),l.schema.pre("validate",function(e){(0,s.updateChildWithRelatedParent)(a.default.list("Course").model,l.model,this._id).then(e).catch(e)}),l.relationship({ref:"Course",refPath:"sections"}),l.defaultColumns="title, relatedParent.title, sequenceNumber|25%",l.register()},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r};a.default.Field.Types;var s=new a.default.List("Coursefield",{map:{name:"title"},singular:"Course field",plural:"Course fields",label:"Course fields"});s.add({title:{type:String,required:!0}}),s.relationship({ref:"Course",refPath:"field"}),s.defaultColumns="title",s.register()},function(e,t,i){"use strict";var r=o(i(3)),n=o(i(2)),a=o(i(0)),s=i(1);function o(e){return e&&e.__esModule?e:{default:e}}var l,u=(0,s.configStorage)("/images/courses/"),c=a.default.Field.Types,d=new a.default.List("Course",{map:{name:"title"},autokey:{path:"slug",from:"title",unique:!0},singular:"Course",plural:"Courses"});d.add({title:{type:String,required:!0},active:{type:Boolean,required:!0,index:!0,initial:!0,default:!0,note:"Defines whether this course should be listed among the other, or should it be temporarily disabled."},field:{type:c.Relationship,index:!0,initial:!0,ref:"Coursefield",many:!1},age:{type:Number,required:!0,initial:!0,index:!0,default:0},price:{type:Number,note:"0 means for free",required:!0,initial:!0,index:!0,default:0},heroImage:{type:c.File,storage:u,note:"Small square image used on previews. Will be resized to 240x240.",thumb:!0},oldHeroImage:{type:c.File,storage:u,hidden:!0},briefDescription:{type:String,note:"50 characters max.",required:!0,initial:!0,index:!0},plan:{type:c.Html,wysiwyg:!0,label:"Course plan"},leftColumnSubtitle:{type:String},leftColumnText:{type:c.Html,wysiwyg:!0},rightColumnSubtitle:{type:String},rightColumnText:{type:c.Html,wysiwyg:!0},maxBriefDescriptionLength:{type:Number,hidden:!0,default:50,required:!0},applyToCourseLink:{type:c.Url},relatedAlbum:{type:c.Relationship,ref:"Album",many:!1},sections:{type:c.Relationship,ref:"Coursesection",many:!0}}),d.schema.pre("validate",(l=(0,n.default)(r.default.mark(function e(t){var i,n,o,l;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=this.applyToCourseLink,n=this.heroImage,o=this.oldHeroImage,l=this.briefDescription,e.next=3,(0,s.updateChildrenWithRelatedParent)(d.model,a.default.list("Coursesection").model,this).catch(t);case 3:return e.next=5,(0,s.validateBriefDescLength)(l||"",50).catch(t);case 5:return this.applyToCourseLink=(0,s.linkValidate)(i),e.next=8,(0,s.fileValidate)(u,n,{url:"/images/fallbacks/heroNews.jpg",mimetype:"image/jpeg"}).then((0,s.resizeImage)(n,240,240)).then(s.compressImage).catch(t);case 8:return this.heroImage=e.sent,e.next=11,(0,s.removeObsoleteFile)(u,o,n);case 11:this.oldHeroImage=n,t();case 13:case"end":return e.stop()}},e,this)})),function(e){return l.apply(this,arguments)})),d.schema.pre("remove",function(e){(0,s.removeFileAsync)(u,this.heroImage).then(e)}),d.defaultColumns="title, field, age, active",d.register()},function(e,t,i){"use strict";var r,n=i(0),a=(r=n)&&r.__esModule?r:{default:r},s=i(1);var o=a.default.Field.Types,l=new a.default.List("Common",{map:{name:"title"},singular:"Common Layout",plural:"Common Layouts",nocreate:!0,nodelete:!0});l.add({title:{type:String,default:"Common Layout",noedit:!0},header:{facebookLink:{type:o.Url},instagramLink:{type:o.Url}},footer:{primaryPhoneNumber:{type:String},secondaryPhoneNumber:{type:String},cityName:{type:String},address:{type:String},geoLat:{type:String,note:"This is used by Gmaps"},geoLng:{type:String,note:"This is used by Gmaps"}}}),l.schema.pre("save",function(e){var t=this.header,i=t.facebookLink,r=t.instagramLink;this.facebookLink=(0,s.linkValidate)(i),this.instagramLink=(0,s.linkValidate)(r),e()}),l.defaultColumns="title, footer.primaryPhoneNumber, footer.secondaryPhoneNumber, footer.address",l.register()},function(e,t,i){"use strict";var r=o(i(3)),n=o(i(2)),a=o(i(0)),s=i(1);function o(e){return e&&e.__esModule?e:{default:e}}var l,u,c=(0,s.configStorage)("/images/albums/"),d=a.default.Field.Types,f=new a.default.List("Albumitem",{map:{name:"title"},singular:"Album item",plural:"Album items",label:"Album items"});f.add({title:{type:String,required:!0,note:"50 characters max."},maxBriefDescriptionLength:{type:Number,hidden:!0,default:50,required:!0},type:{type:d.Select,options:["photo","video"],required:!0,initial:!0,index:!0,default:"photo"},photo:{type:d.File,storage:c,thumb:!0,dependsOn:{type:"photo"}},oldPhoto:{type:d.File,storage:c,hidden:!0},video:{type:d.Url,label:"YouTube link to a video",dependsOn:{type:"video"}},relatedParent:{_id:{type:String,hidden:!0},title:{type:String,hidden:!0,label:"Related Album"}}}),f.schema.pre("save",(l=(0,n.default)(r.default.mark(function e(t){var i,n,o,l,u,d;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=this._id,n=this.title,o=this.type,l=this.photo,u=this.oldPhoto,d=this.video,e.next=3,(0,s.updateChildWithRelatedParent)(a.default.list("Album").model,f.model,i).catch(t);case 3:if("photo"!==o){e.next=13;break}return this.video=null,e.next=7,(0,s.fileValidate)(c,l,{url:"/images/fallbacks/mission.jpg",mimetype:"image/jpeg"}).then(s.compressImage).catch(t);case 7:return this.photo=e.sent,e.next=10,(0,s.removeObsoleteFile)(c,u,l).catch(t);case 10:this.oldPhoto=l,e.next=18;break;case 13:if(this.video=(0,s.linkValidate)(d),e.t0=(0,s.fileExists)(l),!e.t0){e.next=18;break}return e.next=18,(0,s.removeFileAsync)(c,l).catch(t);case 18:return e.next=20,(0,s.validateBriefDescLength)(n||"",50).catch(t);case 20:t();case 21:case"end":return e.stop()}},e,this)})),function(e){return l.apply(this,arguments)})),f.schema.pre("remove",(u=(0,n.default)(r.default.mark(function e(t){var i,n;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(i=this.type,n=this.photo,e.t0="photo"===i,!e.t0){e.next=5;break}return e.next=5,(0,s.removeFileAsync)(c,n).catch(t);case 5:t();case 6:case"end":return e.stop()}},e,this)})),function(e){return u.apply(this,arguments)})),f.relationship({ref:"Album",refPath:"sections"}),f.defaultColumns="type, title, relatedParent.title",f.register()},function(e,t){e.exports=require("gm")},function(e,t){e.exports=require("moment")},function(e,t){e.exports=require("babel-runtime/helpers/extends")},function(e,t){e.exports=require("babel-runtime/helpers/defineProperty")},function(e,t,i){"use strict";var r=o(i(3)),n=o(i(2)),a=o(i(0)),s=i(1);function o(e){return e&&e.__esModule?e:{default:e}}var l,u=(0,s.configStorage)("/images/albums/"),c=a.default.Field.Types,d=new a.default.List("Album",{map:{name:"title"},autokey:{path:"slug",from:"title",unique:!0},singular:"Album",plural:"Albums"});d.add({title:{type:String,required:!0},publishedDate:{type:c.Date,index:!0},heroImage:{type:c.File,storage:u,note:"Small square image used fpr previews. Will be resized to 240x240.",thumb:!0},oldHeroImage:{type:c.File,storage:u,hidden:!0},text:{type:c.Html,wysiwyg:!0},sections:{type:c.Relationship,ref:"Albumitem",many:!0}}),d.schema.pre("validate",(l=(0,n.default)(r.default.mark(function e(t){var i,n;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=this.heroImage,n=this.oldHeroImage,e.next=3,(0,s.updateChildrenWithRelatedParent)(d.model,a.default.list("Albumitem").model,this).catch(t);case 3:return e.next=5,(0,s.fileValidate)(u,i,{url:"/images/fallbacks/heroNews.jpg",mimetype:"image/jpeg"}).then((0,s.resizeImage)(i,240,240)).then(s.compressImage).catch(t);case 5:return this.heroImage=e.sent,e.next=8,(0,s.removeObsoleteFile)(u,n,i).catch(t);case 8:this.oldHeroImage=i,t();case 10:case"end":return e.stop()}},e,this)})),function(e){return l.apply(this,arguments)})),d.schema.pre("remove",function(e){(0,s.removeFile)(u,this.heroImage).then(e)}),d.relationship({ref:"Course",refPath:"relatedAlbum"}),d.defaultColumns="title, sections, publishedDate|15%",d.register()},function(e,t,i){var r={"./Album.js":47,"./Albumitem.js":42,"./Common.js":41,"./Course.js":40,"./Coursefield.js":39,"./Coursesection.js":38,"./Donation.js":37,"./Enquiry.js":36,"./Faq.js":35,"./Faqsection.js":34,"./Layout.js":33,"./Mission.js":32,"./Participant.js":31,"./Partners.js":30,"./Post.js":29,"./Postsection.js":28,"./Presentation.js":27,"./Quote.js":26,"./User.js":25};function n(e){var t=a(e);return i(t)}function a(e){var t=r[e];if(!(t+1)){var i=new Error('Cannot find module "'+e+'".');throw i.code="MODULE_NOT_FOUND",i}return t}n.keys=function(){return Object.keys(r)},n.resolve=a,e.exports=n,n.id=48},function(e,t){e.exports=require("dotenv")},function(e,t,i){"use strict";var r,n,a=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function l(e){if(r===setTimeout)return setTimeout(e,0);if((r===s||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:s}catch(e){r=s}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var u,c=[],d=!1,f=-1;function p(){d&&u&&(d=!1,u.length?c=u.concat(c):f=-1,c.length&&m())}function m(){if(!d){var e=l(p);d=!0;for(var t=c.length;t;){for(u=c,c=[];++f<t;)u&&u[f].run();f=-1,t=c.length}u=null,d=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function g(){}a.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)t[i-1]=arguments[i];c.push(new h(e,t)),1!==c.length||d||l(m)},h.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=g,a.addListener=g,a.once=g,a.off=g,a.removeListener=g,a.removeAllListeners=g,a.emit=g,a.prependListener=g,a.prependOnceListener=g,a.listeners=function(e){return[]},a.binding=function(e){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(e){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}},function(e,t,i){"use strict";(function(e){i(49).config();var t=i(0);if(t.init({name:"RoboClubIF",brand:"RoboClubIF",sass:"public",static:"public",favicon:"public/favicon.ico",views:"templates/views","view engine":"pug",mongo:e.env.MONGODB_URI||"mongodb://127.0.0.1:27017/roboclubif",port:e.env.PORT||3e3,"session store":"mongo","wysiwyg images":!0,"wysiwyg additional buttons":"searchreplace visualchars, charmap ltr rtl pagebreak paste, forecolor backcolor, preview print","wysiwyg additional plugins":"example, table, advlist, anchor, autolink, autosave, charmap, contextmenu, directionality, hr, pagebreak, paste, preview, searchreplace, textcolor, visualblocks, visualchars, wordcount","wysiwyg additional options":{paste_as_text:!0,textcolor_map:["000000","Black","FFFFFF","White","ECECEC","Gray","F89F4F","Orange","D86761","Red","00A5B6","Blue"]},"auto update":!1,session:!0,auth:!0,"user model":"User"}),console.log("Running app in "+t.get("env")+" environment"),"production"===t.get("env")){var r=i(48);r.keys().forEach(r)}else t.import("models");t.set("locals",{_:i(4),env:t.get("env"),utils:t.utils,editable:t.content.editable}),t.set("routes",i(24)),t.set("nav",{home:["layouts","quotes"],about:["participants","missions","donations","presentations","partners"],faq:["faqs","faqsections"],posts:["posts","postsections"],courses:["courses","coursefields","coursesections"],albums:["albums","albumitems"],enquiries:"enquiries",common:"commons",users:"users"}),t.start()}).call(this,i(50))}]);