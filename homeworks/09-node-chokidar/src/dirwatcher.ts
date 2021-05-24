import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

export class DirWatcher {
  constructor(private readonly eventEmitter: EventEmitter) {}

  public async watch(
    directoryPath: string,
    delayMs: number = 100
  ): Promise<never> {
    const filesSeen: Set<string> = new Set();

    while (true) {
      const files: string[] = fs.readdirSync(directoryPath);
      const newFiles: string[] = files.filter((file) => !filesSeen.has(file));

      newFiles.forEach((file) => {
        filesSeen.add(file);
        this.eventEmitter.emit(
          'dirwatcher:changed',
          path.join(directoryPath, file)
        );
      });

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
