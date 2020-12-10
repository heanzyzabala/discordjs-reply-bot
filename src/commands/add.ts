import { Reply } from '../entities';
import { Command, Context } from '../types';
import { CommandError } from '../error';

export class Add implements Command {
  readonly name: string = 'add';
  readonly aliases: string[] = ['a'];
  readonly usage: string = '"<key>" "<value>" --includes? --ignoreCase?';
  readonly options: string[] = ['--includes', '--ignoreCase'];

  async execute(context: Context): Promise<any> | never {
    console.log('adding');
    const { body } = context;
    const matches = body.match(
      '^"([^"]+)" "([^"]+)"\\s*(--includes)?\\s*(--ignoreCase)?$'
    );
    if (!matches) throw new CommandError('E01', this.usage);
    try {
      const result = await this.toReply(context, matches).save();
      return {
        result,
        msg: 'Added a reply!',
      };
    } catch (err) {
      throw new CommandError('E00', 'Generic error');
    }
  }

  private toReply(context: Context, matches: RegExpMatchArray): Reply {
    const key = matches[1];
    let value = matches[2];
    const options = [];
    if (matches[3]) {
      options.push(matches[3]);
    }
    if (matches[4]) {
      options.push(matches[4]);
    }
    return new Reply(key, value, options.toString(), context.server.id);
  }
}
export default Add;
