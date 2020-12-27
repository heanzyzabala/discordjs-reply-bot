import { Command } from 'src/types';
import Add from './add';
import Find from './find';
import List from './list';
import Prefix from './prefix';
import Help from './help';

export const commands: Command[] = [Add, List, Prefix, Help];
export { Find };
