import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'http://restapi-woaf.c9users.io',
    namespace: ''
});