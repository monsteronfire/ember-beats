import Ember from 'ember';
import Channel from './channel';
import Step from './step';

let Song = Ember.Object.extend({
  channels: null,

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
});

export default Song;
