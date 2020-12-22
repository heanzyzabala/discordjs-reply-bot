import { Reply } from '../entities';
import { Command, Context } from '../types';
import { CommandError } from '../error';
class Add implements Command {
  readonly name: string = 'add';
  readonly aliases: string[] = ['a'];
  readonly usage: string = '"<key>" "<value>" --includes? --ignoreCase?';
  readonly options: string[] = ['--includes', '--ignoreCase'];

  async execute({ body, user, server }: Context): Promise<any> | never {
    console.log('adding');
    const matches = body.match(
      '^"([^"]+)" "([^"]+)"\\s*(--includes)?\\s*(--ignoreCase)?$'
    );
    if (!matches) throw new CommandError('E01', this.usage);
    try {
      const key = matches[1];
      const value = matches[2];
      const serverId = server.id;
      const reply = await Reply.findOne({ key, value, serverId });
      const options = '';
      if (!reply) {
        const result = await new Reply(key, value, options, serverId).save();
        return {
          result,
          msg: 'Added a reply',
        };
      }
      const result = await new Reply(
        key,
        value,
        options,
        serverId,
        reply.id
      ).save();
      return {
        result,
        msg: 'Updated a reply',
      };
    } catch (err) {
      console.log(JSON.stringify(err));
      throw new CommandError('E00', 'Generic error');
    }
  }
}
export default new Add();
