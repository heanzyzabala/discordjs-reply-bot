const save = require('./save');

const commands = [save];

module.exports = {
  apply: (input) => {
    const commandArgs = input.split(' ');
    const keyword = commandArgs[0];
    if (!keyword) {
      return { action: null, error: false };
    }

    const command = commands.filter((c) => c.keywords.includes(keyword));
    if (command) {
      const { params } = command;
      const args = input.splice(keyword + 1, input.length);
      const context = {};
      for (let i = 0; i < params.length; i += 1) {
        const { delimeter, name } = params[i];
        const next = params[i + 1];
        let nextDelimeter;
        if (next) {
          nextDelimeter = args.indexOf(next.delimeter) - 1;
        }
        const startIndex = args.indexOf(delimeter);
        if (startIndex === -1) {
          return { action: null, error: true };
        }
        const param = args.slice(startIndex + delimeter.length, nextDelimeter);
        context[name] = param;
      }
    }

    return { action: null, error: false };
  },
};
