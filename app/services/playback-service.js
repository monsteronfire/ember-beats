import Ember from 'ember';

export default Ember.Service.extend({
  tickCount: 0,

  bars: Ember.computed('tickCount', function () {
    return Math.floor(this.get('tickCount') / 16) + 1;
  }),

  beats: Ember.computed('tickCount', function () {
    return (Math.floor((this.get('tickCount')) / 4) % 4) + 1;
  }),

  sixteenths: Ember.computed('tickCount', function () {
    return (this.get('tickCount') % 4) + 1;
  })
});
