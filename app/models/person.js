import DS from 'ember-data';

export default  DS.Model.extend({
  name: DS.attr('string'),
  errors: DS.hasMany('error', {inverse: 'assignedTo',async: true})
});