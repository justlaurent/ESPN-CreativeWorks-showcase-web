var keystone = require('keystone')
  , Types = keystone.Field.Types
  , meta = require('../lib/meta')
  , social = require('../lib/social')
  , removeFromRelated = require('../lib/hooks/removeFromRelated')
  , statics = require('../lib/statics')
  , methods = require('../lib/methods');

/**
 * Person Model
 * ==========
 */

var Person = new keystone.List('Person', {
  autokey: { path: 'slug', from: 'name', unique: true },
  // track: true,
  searchFields: 'name, homepage, meta.keywords'
});

Person.add({
  name: { type: Types.Name, required: true },
  homepage: { type: Types.Url },
  description: {
    brief: { type: Types.Markdown },
    extended: { type: Types.Markdown }
  },
  status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  related: { type: Types.Relationship, ref: 'Person', many: true }
}, 'Images', {
  headshot: { type: Types.Relationship, ref: 'Image', filters: { usage: 'headshot' } },
  hero: { type: Types.Relationship, ref: 'Image', filters: { usage: 'hero' } },
  thumbnail: { type: Types.Relationship, ref: 'Image', filters: { usage: 'thumbnail' } },
  logo: { type: Types.Relationship, ref: 'Image', filters: { usage: 'logo' } }
});

meta.add({ list: Person });
social.add({ list: Person });

// Virtuals
// ------------------------------


// Statics
// ------------------------------

statics.findOrCreate.add({ 
  list: Person, 
  validKeys: [ 'name', 'homepage', 'description' ] 
});

// Pre Save
// ------------------------------

Person.schema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

Person.schema.pre('save', function(next) {
  var person = this;
  // If wasNew, it's a new draft
  if (person.wasNew){
    person.status = 'draft';
  } 
  next();
});

// Post Remove
// ------------------------------

removeFromRelated.add({ 
  list: Person, 
  related: [ 'Video', 'Image', 'Document' ],
  path: 'people'
});

// Methods
// ------------------------------

methods.toJSON.set({ 
  list: Person
});


// Registration
// ------------------------------

Person.defaultColumns = 'name, status, meta.publishedAt';
Person.register();


