import fs from 'fs';
import yargs from 'yargs';
import { pipeline } from 'stream';
import { caesar } from './caesar';

const args = yargs.options({
  shift: {
    type: 'number',
    demandOption: true,
    alias: 's',
    description: 'Set the shift for decode/encode data',
  },
  action: {
    choices: ['encode' as const, 'decode' as const],
    demandOption: true,
    alias: 'a',
    description: 'Specify what action you want to perform',
  },
  input: {
    type: 'string',
    demandOption: false,
    alias: 'i',
    description: 'Specify the file where to get the data from',
  },
  output: {
    type: 'string',
    demandOption: false,
    alias: 'o',
    description: 'Specify the file to save the data to',
  },
}).argv;

const input = args.input ? fs.createReadStream(args.input) : process.stdin;
const output = args.output ? fs.createWriteStream(args.output) : process.stdout;

pipeline(input, caesar(args.action, args.shift), output, (err) => {
  if (err) {
    console.log(':(', err);
  } else {
    console.log('All done...');
  }
});
