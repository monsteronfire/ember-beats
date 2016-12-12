import Ember from 'ember';

export default Ember.Controller.extend({
  audioService: Ember.inject.service(),

  actions: {
    play(sound) {
      this.get('audioService').play(sound);
    }
  }
});
