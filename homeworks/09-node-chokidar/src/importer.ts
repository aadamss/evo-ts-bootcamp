import fs from 'fs';
import { EventEmitter } from 'events';
import { csvToJson } from 'csvtojson-converter';

export class Importer {
  constructor(private readonly eventEmitter: EventEmitter) {}

  public async listen(): Promise<never> {
    this.eventEmitter.on('dirwatcher:changed', (file: string) => {
      console.log(`New file detected [${file}]:`);
      console.log(this.importSync(file));
    });

    return new Promise(() => {});
  }

  public async import(path: string): Promise<{ [key: string]: string }> {
    const data = await fs.promises.readFile(path, 'utf8');
    return csvToJson(data);
  }

  public importSync(path: string): { [key: string]: string } {
    const data = fs.readFileSync(path, 'utf8');
    return csvToJson(data);
  }
}
