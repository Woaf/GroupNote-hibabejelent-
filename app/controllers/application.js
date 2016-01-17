import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        toggle(id, name, description, location, assignedto) {
            this.set('toggleDisabled',true);
            document.getElementById("id_edit").value = id;
            document.getElementById("name_edit").value = name;
            document.getElementById("description_edit").value = description;
            document.getElementById("location_edit").value =location ;
            document.getElementById("assignedTo_edit").value = assignedto;
        },
        editError(){
            console.log('editerror()');
            var id = document.getElementById("id_edit").value;
            var select = document.getElementById("assignedTo_edit");
            var formData = {
                name: document.getElementById("name_edit").value,
                description: document.getElementById("description_edit").value,
                location: document.getElementById("location_edit").value,
                assignedto: {
                    id: select.value,
                    name: select.options[select.selectedIndex].text
                }
            };
            
            var _this = this;
            this.store.find('error',id).then(function(error){
                _this.store.find('person',select.value).then(function(person){
                    error.set('assignedTo',person);
                    error.set('name',formData.name);
                    error.set('description',formData.description);
                    error.set('location',formData.location);
                    error.save().then(function(){
                        _this.set('toggleDisabled',false);
                    });
                });
            });
            
        },
        deleteError(itemid){
            this.store.find('error', itemid).then(function (item) {
              item.destroyRecord();
            });
        },
        
        submitPerson(){
            var formData = { name: document.getElementById("addname").value,};
            var person = this.store.createRecord('person', formData);
            person.save();
        },
        
        submit(){
            this.set('toggleDisabled',false);
            var select = document.getElementById("assignedTo");
            var formData = {
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                location: document.getElementById("location").value
            };
            
            var error = this.store.createRecord('error', formData);
            
            var person = this.store.all('person').filterBy("id",select.value).objectAt(0);
            
            error.set('assignedTo',person);
        
            person.get('errors').pushObject(error);
        
            person.save();
            error.save();
        }
    },
});
