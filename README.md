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

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

