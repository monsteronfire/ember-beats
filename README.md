# Ember-beats
Following along with [Gavin Joyce's Drum Machines tutorial](https://github.com/GavinJoyce/ember-beats)

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd ember-beats`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Tutorial
### Video 1: Playing Sounds

Spin a new ember app
```zsh
ember new ember-beats
```

#### Installing and configuring howler.js
Howler.js doesn't have an ember add-on, but there is a bower package that can be install:
```zsh
bower install howler
```
As with all bower packages, we will need to import it in **ember-cli-build.js** so the next time we boot the app, **howler.js** will be available as a global:
```javascript
app.import('bower_components/howler.js/dist/howler.core.min.js');
```

To avoid ember hint warnings, we have to add it to **.jshintrc**:
```
"predef": [
  "Howler"
]
```

#### Creating a howler service
Create a service
```zsh
mkdir app/services
touch app/services/audio-service.js
```

In **app/services/audi-service.js**, paste the following:
```javascript
import Ember from 'ember';

export default Ember.Service.extend({
  init() {
    let howl = new Howl({
      src: ['sprites.mp3'],
      sprite: {
        cowbell: [0, 300],
        conga_hi: [400, 300],
        cymbal: [807, 3640],
        conga_mid: [4455, 202],
        conga_low: [4863, 343],
        hihat_open: [5268, 706],
        tom_hi: [6277, 206],
        maracas: [6684, 53],
        tom_mid: [7092, 263],
        hihat_closed: [7496, 90],
        tom_low: [7903, 370],
        clave: [8307, 44],
        clap: [8712, 208],
        snare: [9116, 137],
        rim: [9521, 36],
        kick: [9929, 390]
      }
    });

    this.set('howl', howl);
  },

  play(sound) {
    let howl = this.get('howl');
    howl.play(sound);
  }
});
```

#### Create an application controller and inject the service:
```zsh
touch app/controllers/application.js
touch app/templates/application.js
```
//app/controllers/application.js
```javascript
import Ember from 'ember';

export default Ember.Controller.extend({
  audioService: Ember.inject.service(),

  actions: {
    play(sound) {
      this.get('audioService').play(sound);
    }
  }
});
```

#### Get audio-service to expose the sounds it has
Making a new button for each and every sound would be tedious and repetitive. When something is tedious and repetitve, there is probably a better way to do it.

Make a computed property in the **audio-service.js** to expose the sounds available:
```javascript
//app/services/audio-service.js

...
sounds: Ember.computed('howl', function() {
  let howl = this.get('howl');
  return Object.keys(howl._sprite);
})
...
```

In the application template, iterate through the sounds:
```hbs
{{#each audioService.sounds do |sound|}}
  <button onmouseover={{action 'play' sound}}>Play {{sound}}</button>
{{/each}}
```

### Video 2: Test driving the object model
#### Writing tests for song-model.js
```zsh
mkdir tests/unit/models
touch tests/unit/models/song-test.js
```
Write an initial test for the song model:
```javascript
//tests/unit/models/song-test.js

import { moduleFor, test } from 'ember-qunit';
import Song from 'ember-beats/models/song';

moduleFor('model:song', 'Models | Song');

const SEXUAL_HEALING_ENCODED_BASE_64_DATA = 'N4IgdghgtgpiBcIDKMAeBXCAbABACRmwEswBzHACgFkIAnANxJwHEIBPGAShABoQAXGFAAOAewQBOAKx8AxgAsIYMDCwBnBAG1Qa0ejAATBCADWRWSd4h6orOlgIAjHzWDhG%2BNuurRsovzYnAF8eUHofPwCEAAYQsIj%2FQPhY0O8sX0SYuLSMqOTs8PTIpJT4osz81MLcpMcChLzogDopevLGtprgqoaSzuLusq7KoYGRnLG6nvba%2ForSifm5junhheqx9d6s1cnlvt2lw5XRo9OTxYuNs8vZgF1s3X0jRDVIWjg%2BGzsHeGcQVwwdxac4HUE7cHja5XbZQ2FbGYQ25I6Fg5FwxHJFr7QbohFrHEYgnHNGolHwwn4zaUynYkkxOmQqkVKZMwmsvG01r0onUh6pJ6GYzyIiKfgAfVk6TUMCMX1s9jgfxcbg8XjJWO5bJ5zS1nJ1jP1TMNGuZjRNFINetNXJpVtt9p1Du1xutltddo9jq9LrxFsxZpK%2FrW2P5Oj0QsQIrF4tEwhgYCs30VThVQLVvptTuzmfdfrdAc9RuLWdzhZzJbzpfzRerdfhwepFfr5Z9lYDjZuNrDAIjLxAUogwiTCt%2B%2F0BwM8ZeJ06bkI5LZn7aXi7ny7Xq67FJ7gv7g%2FCI5%2BSvHqpBNebVYbBZXl9b59nW7vm5hT9vN47143b82nZf75Dn6Pv%2BX4frW37zL%2BpLbo8fbGPwohQOKIqHimyoAqeU7rkBP6AX%2BIHAdhhF4URUGvmRBHER0O6wYg8GIVARBytYo7Hmmk7quBlGkRR3H4XxJHkuR%2FFcYJPGicJvECbyUmBuJUkLpxkkidJymySpfTUc8cEIeK6QAO4oWObEZlhqlgUJMnmWJ6lyWZF4WXZD6OaZSmubZbk2Z5akKQ5sxOg8DxAAAA%3D';

test('is can deserialise a song', (assert) => {
  let song = Song.fromEncodedBase64(SEXUAL_HEALING_ENCODED_BASE_64_DATA);

  assert.equal(song.get('name'), 'TODO');
});
```
 To run the tests, go to [localhost:4200/tests](http://localhost:4200/tests) in your browser. A lot of things will fail at this point because there is no `song model`.

So we have to create the `song model`:

```zsh
touch app/models/song.js
```

```javascript
//app/models/song.js

import Ember from 'ember';

export default Ember.Object.extend({

});
```
In the song-test, the method `fromEncodedBase64()` is being called on the `Song` method, itself, so in order to do that, we use reopenClass:
```javascript
//app/models/song.js
import Ember from 'ember';

let Song = Ember.Object.extend({

}).reopenClass({
  fromEncodedBase64() {
    return Song.create();
  }
});

export default Song;
```
Next we're going to take in some `encodedBase64` data:
```javascript
//app/models/song.js

import Ember from 'ember';

let Song = Ember.Object.extend({

}).reopenClass({
  fromEncodedBase64(encodedBase64Data) {
    return Song.create();
  }
});

export default Song;
```
Then we're going to convert that into base64Data
```javascript
//app/models/song.js
import Ember from 'ember';

let Song = Ember.Object.extend({

}).reopenClass({
  fromEncodedBase64(encodedBase64Data) {
    let base64Data = decodeURIComponent(encodedBase64Data);
    return Song.create();
  }
});

export default Song;
```
Next thing to do is to decompress it into json. To do this, we will need the `lz-string` library from bower

```zsh
bower install lz-string --save
```
Then import it in the `ember-cli-build.js` file:
```javascript
//ember-cli-build.js
...
app.import('bower_components/lz-string/lib/lz-string.min.js');
...
```
Remember to add it to `.jshintrc` as well
```
...
"predef": [
  "document",
  "window",
  "-Promise",
  "Howl",
  "LZString"
],
...
```
Update test:
```javascript
//tests/unit/models/song-test.js
import { moduleFor, test } from 'ember-qunit';
import Song from 'ember-beats/models/song';

moduleFor('model:song', 'Models | Song');

const SEXUAL_HEALING_ENCODED_BASE_64_DATA = 'N4IgdghgtgpiBcIDKMAeBXCAbABACRmwEswBzHACgFkIAnANxJwHEIBPGAShABoQAXGFAAOAewQBOAKx8AxgAsIYMDCwBnBAG1Qa0ejAATBCADWRWSd4h6orOlgIAjHzWDhG%2BNuurRsovzYnAF8eUHofPwCEAAYQsIj%2FQPhY0O8sX0SYuLSMqOTs8PTIpJT4osz81MLcpMcChLzogDopevLGtprgqoaSzuLusq7KoYGRnLG6nvba%2ForSifm5junhheqx9d6s1cnlvt2lw5XRo9OTxYuNs8vZgF1s3X0jRDVIWjg%2BGzsHeGcQVwwdxac4HUE7cHja5XbZQ2FbGYQ25I6Fg5FwxHJFr7QbohFrHEYgnHNGolHwwn4zaUynYkkxOmQqkVKZMwmsvG01r0onUh6pJ6GYzyIiKfgAfVk6TUMCMX1s9jgfxcbg8XjJWO5bJ5zS1nJ1jP1TMNGuZjRNFINetNXJpVtt9p1Du1xutltddo9jq9LrxFsxZpK%2FrW2P5Oj0QsQIrF4tEwhgYCs30VThVQLVvptTuzmfdfrdAc9RuLWdzhZzJbzpfzRerdfhwepFfr5Z9lYDjZuNrDAIjLxAUogwiTCt%2B%2F0BwM8ZeJ06bkI5LZn7aXi7ny7Xq67FJ7gv7g%2FCI5%2BSvHqpBNebVYbBZXl9b59nW7vm5hT9vN47143b82nZf75Dn6Pv%2BX4frW37zL%2BpLbo8fbGPwohQOKIqHimyoAqeU7rkBP6AX%2BIHAdhhF4URUGvmRBHER0O6wYg8GIVARBytYo7Hmmk7quBlGkRR3H4XxJHkuR%2FFcYJPGicJvECbyUmBuJUkLpxkkidJymySpfTUc8cEIeK6QAO4oWObEZlhqlgUJMnmWJ6lyWZF4WXZD6OaZSmubZbk2Z5akKQ5sxOg8DxAAAA%3D';

test('is can deserialise a song', (assert) => {
  let song = Song.fromEncodedBase64(SEXUAL_HEALING_ENCODED_BASE_64_DATA);

  assert.equal(song.get('name'), 'Sexual Healing (Marvin Gaye)');
  assert.equal(song.get('tempo'), 95);
});
```

Add the deserialize method:
```javascript
//app/models/song.js
import Ember from 'ember';

let Song = Ember.Object.extend({

}).reopenClass({
  fromEncodedBase64(encodedBase64Data) {
    let base64Data = decodeURIComponent(encodedBase64Data);
    let json = LZString.decompressFromBase64(base64Data);
    let data = JSON.parse(json);

    return this.deserialize(data);
  },
  deserialize (data) {
    //debugger;
    let song = Song.create({
      name: data.name,
      tempo: data.tempo
    });
    return song;
  }
});

export default Song;
```

#### Creating and testing the channel model
Create the `channel` model file:
```zsh
touch app/models/channel.js
```
Update the test:
```javascript
//tests/unit/models/song-test.js
import { moduleFor, test } from 'ember-qunit';
import Song from 'ember-beats/models/song';

moduleFor('model:song', 'Models | Song');

const SEXUAL_HEALING_ENCODED_BASE_64_DATA = 'N4IgdghgtgpiBcIDKMAeBXCAbABACRmwEswBzHACgFkIAnANxJwHEIBPGAShABoQAXGFAAOAewQBOAKx8AxgAsIYMDCwBnBAG1Qa0ejAATBCADWRWSd4h6orOlgIAjHzWDhG%2BNuurRsovzYnAF8eUHofPwCEAAYQsIj%2FQPhY0O8sX0SYuLSMqOTs8PTIpJT4osz81MLcpMcChLzogDopevLGtprgqoaSzuLusq7KoYGRnLG6nvba%2ForSifm5junhheqx9d6s1cnlvt2lw5XRo9OTxYuNs8vZgF1s3X0jRDVIWjg%2BGzsHeGcQVwwdxac4HUE7cHja5XbZQ2FbGYQ25I6Fg5FwxHJFr7QbohFrHEYgnHNGolHwwn4zaUynYkkxOmQqkVKZMwmsvG01r0onUh6pJ6GYzyIiKfgAfVk6TUMCMX1s9jgfxcbg8XjJWO5bJ5zS1nJ1jP1TMNGuZjRNFINetNXJpVtt9p1Du1xutltddo9jq9LrxFsxZpK%2FrW2P5Oj0QsQIrF4tEwhgYCs30VThVQLVvptTuzmfdfrdAc9RuLWdzhZzJbzpfzRerdfhwepFfr5Z9lYDjZuNrDAIjLxAUogwiTCt%2B%2F0BwM8ZeJ06bkI5LZn7aXi7ny7Xq67FJ7gv7g%2FCI5%2BSvHqpBNebVYbBZXl9b59nW7vm5hT9vN47143b82nZf75Dn6Pv%2BX4frW37zL%2BpLbo8fbGPwohQOKIqHimyoAqeU7rkBP6AX%2BIHAdhhF4URUGvmRBHER0O6wYg8GIVARBytYo7Hmmk7quBlGkRR3H4XxJHkuR%2FFcYJPGicJvECbyUmBuJUkLpxkkidJymySpfTUc8cEIeK6QAO4oWObEZlhqlgUJMnmWJ6lyWZF4WXZD6OaZSmubZbk2Z5akKQ5sxOg8DxAAAA%3D';

test('is can deserialise a song', (assert) => {
  let song = Song.fromEncodedBase64(SEXUAL_HEALING_ENCODED_BASE_64_DATA);

  assert.equal(song.get('name'), 'Sexual Healing (Marvin Gaye)');
  assert.equal(song.get('tempo'), 95);
  assert.equal(song.get('channels.length'), 9);

  let channel = song.get('channels.firstObject');
  assert.equal(channel.get('sound'), 'kick');
  assert.equal(channel.get('volume'), 1);
  assert.equal(channel.get('steps.length'), 32);
});
```

Then update the deserilize method to make the test pass. A song will have an array of channels.
```javascript
import Ember from 'ember';
import Channel from './channel';

let Song = Ember.Object.extend({
  // A Song has an array of channels. Initial value set to null for now
  channels: null,

  // Initialize channels to be an Ember Array
  // And make sure this init inherits from the super init function
  init() {
    this._super(...arguments);
    this.set('channels', Ember.A());
  }
}).reopenClass({
  fromEncodedBase64(encodedBase64Data) {
    let base64Data = decodeURIComponent(encodedBase64Data);
    let json = LZString.decompressFromBase64(base64Data);
    let data = JSON.parse(json);

    return this.deserialize(data);
  },
  deserialize (data) {
    //debugger;
    let song = Song.create({
      name: data.name,
      tempo: data.tempo,
    });

    data.channels.forEach((channelData) => {
      let channel = Channel.create({
        sound: channelData.sound,
        volume: channelData.volume,
      });
      song.get('channels').pushObject(channel);
    });
    return song;
  }
});

export default Song;
```

#### Creating step model
Run
```zsh
touch app/models/step.js
```
And add initial code:
```javascript
//app/models/step.js

import Ember from 'ember';

export default Ember.Object.extend({});
```

Update tests to test step data:
```javascript
//tests/unit/model/song-test.js

...
test('is can deserialise a song', (assert) => {
  let song = Song.fromEncodedBase64(SEXUAL_HEALING_ENCODED_BASE_64_DATA);
  assert.equal(song.get('name'), 'Sexual Healing (Marvin Gaye)');
  assert.equal(song.get('tempo'), 95);
  assert.equal(song.get('channels.length'), 9);

  let channel = song.get('channels.firstObject');
  assert.equal(channel.get('sound'), 'kick');
  assert.equal(channel.get('volume'), 1);
  assert.equal(channel.get('steps.length'), 32);

  let step = channel.get('steps.firstObject');
  assert.equal(step.get('velocity'), 1);
});
```

Update the steps in the deserialise method:
```javascript
//app/model/song.js
...
deserialize (data) {
  //debugger;
  let song = Song.create({
    name: data.name,
    tempo: data.tempo,
  });

  data.channels.forEach((channelData) => {
    let channel = Channel.create({
      sound: channelData.sound,
      volume: channelData.volume,
    });

    song.get('channels').pushObject(channel);

    channelData.steps.forEach((stepData) => {
      //debugger;
      let step = Step.create({
        velocity: stepData.velocity
      });

      channel.get('steps').pushObject(step);
    });
  });
  return song;
}
...
```

#### Refactor

left off: https://youtu.be/4vVWwYnICuY?t=10m26s

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

