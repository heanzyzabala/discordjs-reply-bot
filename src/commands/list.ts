import { Command, Context } from "src/types";
import { Reply } from '../entities';

class List implements Command {
    name: string = 'list';
    aliases: string[] = ['l'];
    usage: string = '--list';
    options: string[] = [];
    async execute({ server }: Context): Promise<any> {
        const replies: Reply[] = await Reply.find({ serverId: server.id })
        return {
            replies,
        }
    }
}
export default new List()