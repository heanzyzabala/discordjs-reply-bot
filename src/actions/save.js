const Spiels = require('../spiels');

function Save() {
  this.execute = async (guildId, mapping) => {
    const { error } = await Spiels.save(guildId, mapping);
    if (error) {
      return { error: true };
    }
    return { error: false };
  };
}
module.exports = new Save();
