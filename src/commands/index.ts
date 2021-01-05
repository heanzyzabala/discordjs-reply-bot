import { Command } from 'src/types';
import Add from './add';
import Find from './find';
import List from './list';
import Prefix from './prefix';
import Help from './help';
import Role from './role';

export const commands: Command[] = [Add, List, Prefix, Help, Role];
export { Find };
