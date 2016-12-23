import Ember from 'ember';

let Step = Ember.Object.extend({
  serialize() {
    return {
      velocity: this.get('velocity')
    };
  }
}).reopenClass({
  deserialize(data) {
    return Step.create({
      velocity: data.velocity
    });
  }
});

export default Step;
