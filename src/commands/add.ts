import { Command, Context, ExecuteCommandResponse } from '../types';
import { CommandError } from '../errors';

export class Add implements Command {
  readonly name: string = 'add';
  readonly aliases: string[] = ['a'];
  readonly usage: string = '"<key>" "<value>" --includes? --ignoreCase?';
  readonly options: string[] = ['--includes', '--ignoreCase'];

  execute(context: Context): ExecuteCommandResponse | never {
    const { body } = context;
    const matches = body.match(
      '^"([^"]+)" "([^"]+)"\\s*(--includes)?\\s*(--ignoreCase)?$'
    );
    if (!matches) throw new CommandError('E01', 'Body does not match pattern');

    return {
      response: {
        message: 'ok',
      },
    };
  }
}
export default Add;
