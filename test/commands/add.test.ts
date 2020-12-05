import Add from '../../src/commands/add';
import { CommandError } from '../../src/errors';
import { Command, Context } from '../../src/types';

describe('#execute', () => {
  let command: Command;
  let context: Context;
  beforeEach(() => {
    command = new Add();
    context = {
      body: '"key" "value" --includes --ignoreCase',
      user: {
        id: 'df540adc-d838-4941-990e-69aef5ca751f',
      },
      server: {
        id: 'bd991d2e-f3c7-4c41-9166-cf12dbf9a5cf',
      },
    };
  });

  const invalids = [
    'hello world',
    '"hello" world',
    'hello "world"',
    '"hello" "world" --notIncludes',
    '"hello" "world" --notIgnoreCase',
    '"hello" "world" --notIncludes --notIgnoreCase',
    '"hello" "world" --ignoreCase --includes',
    '"he"llo" ""world"',
  ];

  it.each(invalids)('should throw CommandError when body is: %s', (body) => {
    context.body = body;
    expect(() => command.execute(context)).toThrow(CommandError);
  });

  const valids = [
    '"hello" "world"',
    '"hello world" "hola mundo"',
    '"hello" "world" --includes',
    '"hello" "world" --ignoreCase',
    '"hello" "world" --includes --ignoreCase',
  ];

  it.each(valids)('should be successful when body is: %s', (body) => {
    context.body = body;
    const res = command.execute(context);
    expect(res.response.message).toEqual('ok');
  });
});
