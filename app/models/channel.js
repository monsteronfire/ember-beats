import Ember from 'ember';

let Channel = Ember.Object.extend({
  steps: null,

  init() {
    this._super(...arguments);
    this.set('steps', Ember.A());
  }
});

export default Channel;
