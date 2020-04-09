const spiels = require('../spiels');

const Save = function () {
  this.spiels = spiels;

  this.apply = function (guildId, mapping) {
    Spiels.save(guildId, mapping, (res) => {
      if (res) {
        // msg.reply(`Added: ${res.key} -> ${res.value}`);
        console.log(`STATUS: OK`);
      } else {
        // msg.reply(`Unable to add mapping: ${mapping.key} -> ${mapping.value}`);
        console.log(`STATUS: FAILED`);
      }
    });
  }
}
module.exports = new Save();