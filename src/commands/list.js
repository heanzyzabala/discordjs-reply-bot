const Spiels = require('../spiels');

function List() {
  this.execute = async (guildId) => {
    const { spiel, error } = await Spiels.list(guildId);
    if (error) {
      return { mappings: null, error: true };
    }
    if (spiel) {
      return { mappings: spiel.mappings, error: false };
    }
    return { mappings: [], error: false };
  };
}
module.exports = new List();
