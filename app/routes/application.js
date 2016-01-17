import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        var errors = this.store.findAll('error');
        var people = this.store.findAll('person');
        return Ember.Object.create({
            errors: errors,
            people: people
        });
    },
    
});
