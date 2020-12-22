import { Reply } from '../entities';
import { Command, Context } from '../types';
import { CommandError } from '../error';

class Find implements Command {
  readonly name: string = '';
  readonly aliases: string[] = [];
  readonly usage: string = '';
  readonly options: string[] = [];
  async execute({ body, user, server }: Context): Promise<Reply | null> {
    try {
      console.log('finding');
      const replies: Reply[] = await Reply.find({
        serverId: server.id,
      });
      // list of replies
      const reply = replies.find((r) => {
        return r.key === 'body'
      })
      return reply ? reply : null
    } catch (err) {
      throw new CommandError('E0', 'Generic error');
    }
  }
}
export default new Find()