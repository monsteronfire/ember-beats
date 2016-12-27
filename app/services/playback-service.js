import Ember from 'ember';

export default Ember.Service.extend({
  tickCount: 0,

  sixteenths: Ember.computed('tickCount', function () {
    return (this.get('tickCount') % 4) + 1;
  })
});
