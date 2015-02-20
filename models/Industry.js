var keystone = require('keystone')
  , Types = keystone.Field.Types
  , _ = require('underscore')
  , meta = require('../lib/meta');

/**
 * Industry Model
 * ==========
 */

var Industry = new keystone.List('Industry', {
  autokey: { path: 'slug', from: 'name', unique: true }
});

Industry.add({
  name: { type: String, required: true },
  description: {
    brief: { type: Types.Markdown },
    extended: { type: Types.Markdown }
  },
  status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  related: { type: Types.Relationship, ref: 'Industry', many: true }
}, 'Images', {
  icon: { type: Types.Relationship, ref: 'Image' }
});

meta.add({ list: Industry });


Industry.schema.set('toJSON', {
  transform: function(doc) {
    return _.omit(doc, '__v');
  }
});

Industry.defaultColumns = 'name, status, publishedAt';
Industry.register();

