import { Reply } from './reply'
import { Server } from './server'

import { getRepository } from 'typeorm';

export const ReplyRepository = getRepository(Reply);
export const ServerRepository = getRepository(Server);