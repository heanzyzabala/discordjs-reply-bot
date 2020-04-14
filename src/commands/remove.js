const Spiels = require('../spiels');

function Remove() {
  this.execute = async (guildId, key) => {
    const { removed, error } = await Spiels.remove(guildId, key);
    if (error) {
      return { removed: false, error: true };
    }
    return { removed, error: false };
  };
}
module.exports = new Remove();
