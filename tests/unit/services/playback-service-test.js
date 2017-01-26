import { moduleFor, test } from 'ember-qunit';

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

  serivce.set('song', Song.create({ tempo: 60 }));

  assert.equal(service.get('tickInterval'), 250);

  serivce.set('song', Song.create({ tempo: 120 }));

  assert.equal(service.get('tickInterval'), 125);
});
