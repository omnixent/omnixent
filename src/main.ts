import server from './lib/server';
import * as dotenv from 'dotenv';
dotenv.config();

const { ENV = 'server' } = process.env;

switch (ENV) {
  case 'lambda':
    console.log('Not implemented yet!');
    break;
  default:
    server();
    break;
}
