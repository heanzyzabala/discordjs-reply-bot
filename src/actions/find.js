const Spiels = require('../spiels');

function Find() {
  this.execute = async (guildId, key) => {
    const { value, error } = await Spiels.find(guildId, key);
    if (error) {
      return { reply: null, error: true };
    }
    return { reply: value, error: false };
  };
}
module.exports = new Find();
