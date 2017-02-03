import { moduleFor } from 'ember-qunit';
import test from 'ember-beats/tests/ember-sinon-qunit/test';
import Song from 'ember-beats/models/song';

moduleFor('service:playback-service', 'Unit | Service | playback service', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it it calculates the bar, beats and sixteenths', function(assert) {
  let service = this.subject();

  assert.equal(service.get('display'), '1:1:1');

  service.set('tickCount', 1);
  assert.equal(service.get('display'), '1:1:2');

  service.set('tickCount', 4);
  assert.equal(service.get('display'), '1:2:1');

  service.set('tickCount', 15);
  assert.equal(service.get('display'), '1:4:4');

  service.set('tickCount', 16);
  assert.equal(service.get('display'), '2:1:1');
});

test('tickInteral', function(assert) {
  let service = this.subject();

  service.set('song', Song.create({ tempo: 60 }));

  assert.equal(service.get('tickInterval'), 250);

  service.set('song', Song.create({ tempo: 120 }));

  assert.equal(service.get('tickInterval'), 125);
});

test('play', function(assert) {
  let service = this.subject();

  let tickStub = this.stub(service, 'tick');

  service.set('isPlaying', false);
  service.set('tickCount', 0);

  service.play();

  assert.equal(service.get('isPlaying'), 0);
  assert.equal(service.get('tickCount'), true);
  assert.ok(tickStub.calledOnce, 'tick was called once');
});

test('stop', function(assert) {
  let service = this.subject();
  service.set('isPlaying', true);
  service.set('tickCount', 20);
  service.stop();

  assert.equal(service.get('isPlaying'), false);
  assert.equal(service.get('tickCount'), 20);
});

test('tick when stopped', function(assert) {
  let service = this.subject();
  let runLaterStub = this.stub(Ember.run, 'later');
  service.setProperties({
    isPlaying: false,
    tickCount: 4
  });

  service.tick();

  service.equal(service.get('tickCount'), 4);
  service.ok(runLaterStub.notCalled, 'no run.later is scheduled');
});
