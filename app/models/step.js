import Ember from 'ember';

let Step = Ember.Object.extend({

}).reopenClass({
  deserialize(data) {
    let step = Step.create({
      velocity: data.velocity
    });
   return step;
  }
});

export default Step;
