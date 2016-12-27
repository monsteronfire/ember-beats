import { moduleFor, test } from 'ember-qunit';

moduleFor('service:playback-service', 'Unit | Service | playback service', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it it calculates the bar, beats and sixteenths', function(assert) {
  let service = this.subject();

  assert.equal(service.get('bars'), 1);
  assert.equal(service.get('beats'), 1);
  assert.equal(service.get('sixteenths'), 1);

  service.set('tickCount', 1);
  assert.equal(service.get('bars'), 1);
  assert.equal(service.get('beats'), 1);
  assert.equal(service.get('sixteenths'), 2);

  service.set('tickCount', 4);
  assert.equal(service.get('bars'), 1);
  assert.equal(service.get('beats'), 2);
  assert.equal(service.get('sixteenths'), 1);

  service.set('tickCount', 15);
  assert.equal(service.get('bars'), 1);

  service.set('tickCount', 16);
  assert.equal(service.get('bars'), 2);
});
