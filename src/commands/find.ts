import { Reply } from '../entities';
import { Command, Context } from '../types';
import { CommandError } from '../error';

export class Find implements Command {
  readonly name: string = '';
  readonly aliases: string[] = [];
  readonly usage: string = '';
  readonly options: string[] = [];
  async execute(context: Context): Promise<any> {
    try {
      console.log('finding');
      const { body } = context;
      const replies: Reply[] = await Reply.find({
        serverId: context.server.id,
      });
      // list of replies
      const reply = replies.filter((r) => {
        let { key } = r;
        let tempBody = body;
        const options = r.options.split(',');
        options.forEach((opt) => {
          if (opt === '--ignoreCase') {
            key = key.toUpperCase();
            tempBody = tempBody.toUpperCase();
          }
          if (opt === '--includes') {
            return key.includes(tempBody);
          }
          return r.key === tempBody;
        });
        return r.key === tempBody;
      });
      return reply;
    } catch (err) {
      throw new CommandError('E0', 'Generic error');
    }
  }
}
