import { Command } from 'src/types';
import Add from './add';

const commands = new Map<string, Command>();
const add = new Add();
commands.set(add.name, add);
export default commands;
