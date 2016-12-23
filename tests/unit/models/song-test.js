import { moduleFor, test } from 'ember-qunit';
import Song from 'ember-beats/models/song';

moduleFor('model:song', 'Models | Song');

//const SEXUAL_HEALING_ENCODED_BASE_64_DATA = 'N4IgdghgtgpiBcIDKMAeBXCAbABACRmwEswBzHACgFkIAnANxJwHEIBPGAShABoQAXGFAAOAewQBOAKx8AxgAsIYMDCwBnBAG1Qa0ejAATBCADWRWSd4h6orOlgIAjHzWDhG%2BNuurRsovzYnAF8eUHofPwCEAAYQsIj%2FQPhY0O8sX0SYuLSMqOTs8PTIpJT4osz81MLcpMcChLzogDopevLGtprgqoaSzuLusq7KoYGRnLG6nvba%2ForSifm5junhheqx9d6s1cnlvt2lw5XRo9OTxYuNs8vZgF1s3X0jRDVIWjg%2BGzsHeGcQVwwdxac4HUE7cHja5XbZQ2FbGYQ25I6Fg5FwxHJFr7QbohFrHEYgnHNGolHwwn4zaUynYkkxOmQqkVKZMwmsvG01r0onUh6pJ6GYzyIiKfgAfVk6TUMCMX1s9jgfxcbg8XjJWO5bJ5zS1nJ1jP1TMNGuZjRNFINetNXJpVtt9p1Du1xutltddo9jq9LrxFsxZpK%2FrW2P5Oj0QsQIrF4tEwhgYCs30VThVQLVvptTuzmfdfrdAc9RuLWdzhZzJbzpfzRerdfhwepFfr5Z9lYDjZuNrDAIjLxAUogwiTCt%2B%2F0BwM8ZeJ06bkI5LZn7aXi7ny7Xq67FJ7gv7g%2FCI5%2BSvHqpBNebVYbBZXl9b59nW7vm5hT9vN47143b82nZf75Dn6Pv%2BX4frW37zL%2BpLbo8fbGPwohQOKIqHimyoAqeU7rkBP6AX%2BIHAdhhF4URUGvmRBHER0O6wYg8GIVARBytYo7Hmmk7quBlGkRR3H4XxJHkuR%2FFcYJPGicJvECbyUmBuJUkLpxkkidJymySpfTUc8cEIeK6QAO4oWObEZlhqlgUJMnmWJ6lyWZF4WXZD6OaZSmubZbk2Z5akKQ5sxOg8DxAAAA%3D';

//test('is can deserialise a song', (assert) => {
  //let song = Song.fromEncodedBase64(SEXUAL_HEALING_ENCODED_BASE_64_DATA);
  //assert.equal(song.get('name'), 'Sexual Healing (Marvin Gaye)');
  //assert.equal(song.get('tempo'), 95);
  //assert.equal(song.get('channels.length'), 9);

  //let channel = song.get('channels.firstObject');
  //assert.equal(channel.get('sound'), 'kick');
  //assert.equal(channel.get('volume'), 1);
  //assert.equal(channel.get('steps.length'), 32);

  //let step = channel.get('steps.firstObject');
  //assert.equal(step.get('velocity'), 1);
//});

//test('is can serialise a song', (assert) => {
  //let song = Song.fromEncodedBase64(SEXUAL_HEALING_ENCODED_BASE_64_DATA);
  //assert.equal(song.toEncodedBase64(), SEXUAL_HEALING_ENCODED_BASE_64_DATA);
//});

const FIFTEEN_STEP_ENCODED_BASE_64_DATA = 'N4IgdghgtgpiBcICMBWABAZQC4wA5oAoAlCAEwEsB7ACxjIEoQAaEHKXShAThRYGNqEMGBgAbAM4IA2qHGUArmFIIQAa3J9VzEADdKo%2BbARIW4nLknwZusZT7ksAT2MBfJqB237ThAAY3Hl4OzvD%2B7jaidsF%2BARFRPqGxnpHeIWGBKdGhAHQoSUEJvrn5mYUl8WkuALqxcorKiOKQAE5wLHoGRvAmIGZ4ltbJFTHhQ6kjGcOJowUhSOXj05OL8zOllWtT6XErC1n%2BNeF1SirU5IJYAPp8keIwyu36hnDdpuYDy%2Ft7ZZuLRXm%2FL6AwrFYEbT4JVYQ8E7fag6ExQ6yBQnRA3CC4bQdZ7GN79aQIpawn6E%2F7fGFjOEA0nkvzw4kU2Z06kMiasomUknsslgtmcxnrZm0jlMkWCnIs%2FmI6ouIA%3D%3D%3D';

test('it can deserialize a song', function(assert) {
  let song = Song.fromEncodedBase64(FIFTEEN_STEP_ENCODED_BASE_64_DATA);

  assert.equal(song.get('name'), '15 Step (Radiohead)');
  assert.equal(song.get('tempo'), 95);
  assert.equal(song.get('channels.length'), 4);

  let channel = song.get('channels.firstObject');
  assert.equal(channel.get('sound'), 'kick');
  assert.equal(channel.get('volume'), 1);
  assert.equal(channel.get('steps.length'), 10);

  let step = channel.get('steps.firstObject');
  assert.equal(step.get('velocity'), 1);
});

test('it can serialize a song', function(assert) {
  let song = Song.fromEncodedBase64(FIFTEEN_STEP_ENCODED_BASE_64_DATA);

  assert.equal(song.toEncodedBase64(), FIFTEEN_STEP_ENCODED_BASE_64_DATA);
});
