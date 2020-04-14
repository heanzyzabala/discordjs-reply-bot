const Spiels = require('../spiels');
const Logger = require('../logger');

function Find() {
  this.execute = async (guildId, key) => {
    const { value, error } = await Spiels.find(guildId, key);
    if (error) {
      const res = { reply: null, error: true };
      return res;
    }
    const res = { reply: value, error: false };
    return res;
  };
}
module.exports = new Find();
