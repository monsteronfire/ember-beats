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
    let song = Song.create({
      name: data.name,

    });
    return song;
  }
});

export default Song;
