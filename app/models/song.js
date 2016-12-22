import Ember from 'ember';
import Channel from './channel';

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

    let channels = song.get('channels');

    data.channels.forEach((channelData) => {
      let channel = Channel.deserialize(channelData);
      channels.pushObject(channel);
    });
    return song;
  }
});

export default Song;
